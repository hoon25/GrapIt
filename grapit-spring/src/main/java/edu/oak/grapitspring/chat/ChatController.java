package edu.oak.grapitspring.chat;

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
public class ChatController {

    private final SimpMessageSendingOperations template;
    private final ChatService chatService;

    //Client가 SEND할 수 있는 경로
    //stompConfig에서 설정한 applicationDestinationPrefixes와 @MessageMapping 경로가 병합됨
    //"/sub/chat/enterUser"
    @MessageMapping("/chat/enterUser")
    public void enterUser(@Payload ChatDTO chat, SimpMessageHeaderAccessor headerAccessor) {
        log.info("enterUser : " + chat.getSender());

        headerAccessor.getSessionAttributes().put("userNickName", chat.getSender());
        headerAccessor.getSessionAttributes().put("roomId", chat.getRoomId());

        chat.setMessage(chat.getSender() + " 님 입장!!");
        template.convertAndSend("/api/sub/chat/room/" + chat.getRoomId(), chat);
    }

    @MessageMapping("/chat/sendMessage")
    public void sendMessage(@Payload ChatDTO chat, SimpMessageHeaderAccessor headerAccessor) {
        System.out.println("ChatController.sendMessage");
        System.out.println("chat.getSender() = " + chat.getSender());
        System.out.println("chat.getMessage() = " + chat.getMessage());

        chat.setMessage(chat.getMessage());
        template.convertAndSend("/api/sub/chat/room/" + chat.getRoomId(), chat);
    }

    @EventListener
    public void webSocketEventListener(SessionDisconnectEvent event) {
        System.out.println("ChatController.webSocketEventListener");
        SimpMessageHeaderAccessor headerAccessor = SimpMessageHeaderAccessor.wrap(event.getMessage());

        String roomId = (String) headerAccessor.getSessionAttributes().get("roomId");
        String userNickName = (String) headerAccessor.getSessionAttributes().get("userNickName");

        if (userNickName != null) {
            log.info("User Disconnected : " + userNickName);
            ChatDTO chat = ChatDTO.builder().roomId(roomId).sender(userNickName)
                    .message(userNickName + " 님이 퇴장하셨습니다.")
                    .build();
            template.convertAndSend("/api/sub/chat/room/" + roomId, chat);
        }
    }

}
