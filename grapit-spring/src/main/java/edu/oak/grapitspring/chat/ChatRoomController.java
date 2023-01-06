package edu.oak.grapitspring.chat;


import edu.oak.grapitspring.user.UserEntity;
import edu.oak.grapitspring.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@RestController
@Slf4j
@RequiredArgsConstructor
public class ChatRoomController {

    private final ChatService chatService;
    private final UserService userService;

    /*
    채팅방 전체 목록
     */
    @GetMapping("/chat")
    public ResponseEntity<List<ChatRoom>> chat() {
        log.info("chat room list");
        List<ChatRoom> chatRoomList = chatService.findAllRoom();
        // VIDEO LIST 예외처리
        List<ChatRoom> chatRoomDTO = new ArrayList<>();
        chatRoomList.forEach(chatRoom -> {
            ChatRoom copyRoom = ChatRoom.builder().roomId(chatRoom.getRoomId()).roomName(chatRoom.getRoomName()).chatType(chatRoom.getChatType()).build();
            chatRoomDTO.add(copyRoom);
        });
        chatRoomDTO.forEach(chatRoom -> chatRoom.setVideoList(null));
//        return ResponseEntity.ok().body(chatService.findAllRoom());
        return ResponseEntity.ok().body(chatRoomDTO);
    }

    /*
     * 채팅방 생성
     */
    @PostMapping("/chat/room")
    public ResponseEntity<ChatRoom> createRoom(@RequestBody ChatRoom chatRoom, HttpSession session) {
        log.info(chatRoom.toString());
        log.info(chatRoom.getRoomName());
        //TODO 채팅방 이름 자동 생성
        if (session.getAttribute("user") == null) {
            Random rand = new Random();
            int randomInt = rand.nextInt(10 - 1 + 1) + 1;
            if (chatRoom.getChatType() == ChatRoom.ChatType.MSG) {
                chatService.createRoom("guest" + randomInt + "의 문자 채팅방", chatRoom.getChatType());
            } else {
                chatService.createRoom("guest" + randomInt + "의 영상 채팅방", chatRoom.getChatType());
            }

        } else {
            UserEntity userEntity = (UserEntity) session.getAttribute("user");
            if (chatRoom.getChatType() == ChatRoom.ChatType.MSG) {
                chatService.createRoom(userEntity.getNickName() + "의 문자 채팅방", chatRoom.getChatType());
            } else {
                chatService.createRoom(userEntity.getNickName() + "의 영상 채팅방", chatRoom.getChatType());
            }
        }
        return ResponseEntity.ok().build();
    }

    /*
     * 채팅방 입장
     */
    @GetMapping("/chat/room/{roomId}")
    public ResponseEntity<ChatRoom> enterRoom(@PathVariable("roomId") String roomId) {
        log.info("enterRoom");
        return ResponseEntity.ok().body(chatService.findRoomById(roomId));
    }


}
