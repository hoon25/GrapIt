package edu.oak.grapitsocket.message;

import edu.oak.grapitsocket.domain.GraphBase;
import edu.oak.grapitsocket.repository.GraphRedisRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.Optional;


@Slf4j
@RequiredArgsConstructor
@Controller
public class ChatController {

    private final SimpMessageSendingOperations template;
    private final GraphRedisRepository graphRedisRepository;

    //Client가 SEND할 수 있는 경로
    //stompConfig에서 설정한 applicationDestinationPrefixes와 @MessageMapping 경로가 병합됨
    //"/sub/chat/enterUser"
    @MessageMapping("/chat/enterUser")
    public void enterUser(@Payload MessageRequestDTO chat, SimpMessageHeaderAccessor headerAccessor) {
        log.info("enterUser : " + chat.getSender());

        headerAccessor.getSessionAttributes().put("userNickName", chat.getSender());
        headerAccessor.getSessionAttributes().put("roomId", chat.getRoomId());

        chat.setMessage(chat.getSender() + " 님 입장!!");
        template.convertAndSend("/api/sub/chat/room/" + chat.getRoomId(), chat);
    }

    @MessageMapping("/chat/sendMessage")
    public void sendMessage(@Payload MessageRequestDTO chat, SimpMessageHeaderAccessor headerAccessor) {
        System.out.println("ChatController.sendMessage");
        System.out.println("chat.getSender() = " + chat.getSender());
        System.out.println("chat.getMessage() = " + chat.getMessage());

//        chat.setMessage(chat.getMessage());
        GraphBase graphBase = GraphBase.builder().roomId(chat.getRoomId()).type("2D").data(chat.getMessage()).build();
        // front가 항상 다주는게아니고, 저장하면 저장할 애만, 삭제면 삭제하는애만, 움직이면 움직인 애랑 값만
        graphRedisRepository.save(graphBase);
        System.out.println("Redis 저장 완료");
        System.out.println(graphBase);

        Optional<GraphBase> redisGraphBase = graphRedisRepository.findById(graphBase.getRoomId());
        System.out.println("Redis 로드 완료");
        System.out.println(redisGraphBase.get());
        chat.setMessage(redisGraphBase.get().getData());


        template.convertAndSend("/sock/sub/chat/room/" + chat.getRoomId(), chat);
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
                .message(userNickName + " 님이 퇴장하셨습니다.")
                .build();
            template.convertAndSend("/sock/sub/chat/room/" + roomId, chat);
        }
    }

}
