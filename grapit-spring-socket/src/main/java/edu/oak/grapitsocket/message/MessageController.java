package edu.oak.grapitsocket.message;

import edu.oak.grapitsocket.domain.MessageBase;
import edu.oak.grapitsocket.repository.MessageRedisRepository;
import edu.oak.grapitsocket.service.MessageResponseDTO;
import edu.oak.grapitsocket.service.MessageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Slf4j
@RequiredArgsConstructor
@Controller
public class MessageController {

    private final SimpMessageSendingOperations template;
    private final MessageRedisRepository graphRedisRepository;
    private final MessageService messageService;

    //Client가 SEND할 수 있는 경로
    //stompConfig에서 설정한 applicationDestinationPrefixes와 @MessageMapping 경로가 병합됨
    //"/sub/chat/enterUser"
    @MessageMapping("/chat/enterUser")
    public void enterUser(@Payload MessageRequestDTO chat, SimpMessageHeaderAccessor headerAccessor) {
        log.info("enterUser : " + chat.getSender());

        headerAccessor.getSessionAttributes().put("userNickName", chat.getSender());
        headerAccessor.getSessionAttributes().put("roomId", chat.getRoomId());

        chat.setData(chat.getSender() + " 님 입장!!");
        template.convertAndSend("/api/sub/chat/room/" + chat.getRoomId(), chat);
    }

    @MessageMapping("/chat/sendMessage")
    public void sendMessage(@Payload MessageRequestDTO request, SimpMessageHeaderAccessor headerAccessor) {
        System.out.println("ChatController.sendMessage");
        System.out.println("chat.getSender() = " + request.getSender());
        System.out.println("chat.getMessage() = " + request.getData());

        MessageResponseDTO responseDTO = messageService.addComponet(request);
        System.out.println("responseDTO.toString() = " + responseDTO.toString());

        template.convertAndSend("/sock/sub/chat/room/" + responseDTO.getRoomId(), responseDTO);
    }

    @EventListener
    public void webSocketEventListener(SessionDisconnectEvent event) {
        System.out.println("ChatController.webSocketEventListener");
        SimpMessageHeaderAccessor headerAccessor = SimpMessageHeaderAccessor.wrap(event.getMessage());

        String roomId = (String) headerAccessor.getSessionAttributes().get("roomId");
        String userNickName = (String) headerAccessor.getSessionAttributes().get("userNickName");

        if (userNickName != null) {
            log.info("User Disconnected : " + userNickName);
            MessageRequestDTO chat = MessageRequestDTO.builder().roomId(roomId).sender(userNickName)
                .data(userNickName + " 님이 퇴장하셨습니다.")
                .build();
            template.convertAndSend("/sock/sub/chat/room/" + roomId, chat);
        }
    }

}
