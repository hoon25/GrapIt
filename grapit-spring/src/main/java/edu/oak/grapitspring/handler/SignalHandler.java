package edu.oak.grapitspring.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import edu.oak.grapitspring.chat.ChatRoom;
import edu.oak.grapitspring.chat.ChatService;
import edu.oak.grapitspring.chat.WebRTCMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@Component
@RequiredArgsConstructor
@Slf4j
public class SignalHandler extends TextWebSocketHandler {

    private final ChatService chatService;

    private final ObjectMapper objectMapper = new ObjectMapper();

    private static final String MSG_TYPE_OFFER = "offer";
    private static final String MSG_TYPE_ANSWER = "answer";
    private static final String MSG_TYPE_ICE = "ice";
    private static final String MSG_TYPE_JOIN = "join";
    private static final String MSG_TYPE_LEAVE = "leave";

    private List<ChatRoom> rooms;

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        log.info("[ws] Session has been closed with status [{} {}]", status, session);
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        System.out.println("SignalHandler.afterConnectionEstablished");
        System.out.println("session = " + session);
        rooms = chatService.findAllRoom();
        sendMessage(session, new WebRTCMessage("Server", MSG_TYPE_JOIN, Boolean.toString(!rooms.isEmpty()), null, null));
    }


    private void sendMessage(WebSocketSession session, WebRTCMessage webRTCMessage) {
        System.out.println("SignalHandler.sendMessage");
        System.out.println("webRTCMessage = " + webRTCMessage);
        try {
            String json = objectMapper.writeValueAsString(webRTCMessage);
            session.sendMessage(new TextMessage(json));
        } catch (IOException e) {
            log.debug("An error occured: {}", e.getMessage());
        }
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage textMessage) {

//        System.out.println("SignalHandler.handleTextMessage");
//        System.out.println("textMessage = " + textMessage);
        try {
            WebRTCMessage webRTCMessage = objectMapper.readValue(textMessage.getPayload(), WebRTCMessage.class);
            log.debug("[ws] Message of {} type from {} received", webRTCMessage.getType(), webRTCMessage.getFrom());
            System.out.println("[ws] Message of " + webRTCMessage.getType() + "type from " + webRTCMessage.getFrom() + " received");

            String userUUID = webRTCMessage.getFrom();

            String roomId = webRTCMessage.getData();

            ChatRoom room;

            switch (webRTCMessage.getType()) {

                case MSG_TYPE_OFFER:
                case MSG_TYPE_ANSWER:
                case MSG_TYPE_ICE:
                    Object candidate = webRTCMessage.getCandidate();
                    Object sdp = webRTCMessage.getSdp();

                    log.debug("[ws] Signal: {}",

                            candidate != null
                                    ? candidate.toString().substring(0, 64)
                                    : sdp.toString().substring(0, 64));

                    ChatRoom roomDto = chatService.findRoomById(roomId);

                    System.out.println("ICE CHECK");
                    System.out.println(chatService.findRoomById(roomId));

                    if (roomDto != null) {
                        Map<String, WebSocketSession> clients = roomDto.getVideoList();
                        for (Map.Entry<String, WebSocketSession> client : clients.entrySet()) {
//                            System.out.println("client.getKey() = " + client.getKey());
//                            System.out.println("userUUID = " + userUUID);
                            if (!client.getKey().equals(userUUID)) {
                                sendMessage(client.getValue(),
                                        new WebRTCMessage(
                                                userUUID,
                                                webRTCMessage.getType(),
                                                roomId,
                                                candidate,
                                                sdp
                                        ));
                            }
                        }
                    }
                    break;
                case MSG_TYPE_JOIN:
                    log.debug("[ws] {} has joined Room: #{}", userUUID, webRTCMessage.getData());
                    rooms = chatService.findAllRoom();
                    room = chatService.findRoomById(roomId);

                    chatService.addClient(room, userUUID, session);

                    System.out.println("JOIN CHECK");
                    System.out.println(chatService.findRoomById(roomId));
//                    rooms.add(room);
                    break;
                case MSG_TYPE_LEAVE:
                    log.info("[ws] {} is going to leave Room: #{}", userUUID, webRTCMessage.getData());
                    room = chatService.findRoomById(webRTCMessage.getData());
                    Optional<String> client = chatService.getClients(room).keySet().stream()
                            .filter(clientListKeys -> clientListKeys.equals(userUUID))
                            .findAny();
                    client.ifPresent(userId -> chatService.removeClientByName(room, userId));
                    log.debug("삭제완료 [{}]", client);
                    break;
                default:
                    log.debug("[ws] Type of the received message {} is undefined!", webRTCMessage.getType());
            }

        } catch (IOException e) {
            log.debug("An error occured: {}", e.getMessage());
            System.out.println("An error occured: " + e.getMessage());
        }
    }

}
