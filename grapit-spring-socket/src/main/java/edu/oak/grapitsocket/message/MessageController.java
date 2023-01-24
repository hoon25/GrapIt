package edu.oak.grapitsocket.message;

import com.fasterxml.jackson.databind.ObjectMapper;
import edu.oak.grapitsocket.domain.MessageType;
import edu.oak.grapitsocket.service.EnterResponseDTO;
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

import static edu.oak.grapitsocket.domain.MessageType.*;

@Slf4j
@RequiredArgsConstructor
@Controller
public class MessageController {

    private final SimpMessageSendingOperations template;
    private final MessageService messageService;
    private final ObjectMapper objectMapper;

    //Client가 SEND할 수 있는 경로
    //stompConfig에서 설정한 applicationDestinationPrefixes와 @MessageMapping 경로가 병합됨
    //"/sub/chat/enterUser"
    @MessageMapping("/chat/enterUser")
    public void enterUser(@Payload MessageRequestDTO request, SimpMessageHeaderAccessor headerAccessor) throws Exception {
        log.info("enterUser : " + request.getSender());

        headerAccessor.getSessionAttributes().put("userNickName", request.getSender());
        headerAccessor.getSessionAttributes().put("roomId", request.getRoomId());

        EnterResponseDTO enterResponseDTO = messageService.getAllComponent(request);
        log.info(enterResponseDTO.toString());

//        objectMapper.writeValueAsString(enterResponseDTO)
        template.convertAndSend("/sock/sub/chat/room/" + request.getRoomId(), enterResponseDTO);
    }


    @MessageMapping("/chat/sendMessage")
    public void sendMessage(@Payload MessageRequestDTO request, SimpMessageHeaderAccessor headerAccessor) throws Exception {
        System.out.println("ChatController.sendMessage");
        System.out.println("request.toString() = " + request.toString());

        // fabric, canvas, camera, scope는 direct 소켓 송수신
        if (request.getType() == PAINT || request.getType() == RATIO2D || request.getType() == CAMERA3D) {
            template.convertAndSend("/sock/sub/chat/room/" + request.getRoomId(), request);
            return;
        }


        MessageResponseDTO responseDTO = null;
        switch (request.getMethod()) {
            case "ADD":
                responseDTO = messageService.addComponent(request);
                break;
            case "UPDATE":
                responseDTO = messageService.addComponent(request);
                break;
            case "DELETE":
                responseDTO = messageService.deleteComponent(request);
                break;
            default:
                break;
        }

        responseDTO.setMethod(request.getMethod());
        System.out.println("responseDTO.toString() = " + responseDTO);
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
//                .data(userNickName + " 님이 퇴장하셨습니다.")
                .build();
            template.convertAndSend("/sock/sub/chat/room/" + roomId, chat);
        }
    }
}
