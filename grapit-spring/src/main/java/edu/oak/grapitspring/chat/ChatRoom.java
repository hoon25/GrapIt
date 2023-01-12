package edu.oak.grapitspring.chat;


import edu.oak.grapitspring.domain.Member;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.socket.WebSocketSession;

import java.util.HashMap;
import java.util.UUID;

@Data
@NoArgsConstructor
public class ChatRoom {
    private String roomId;
    private String roomName;
    private long userCount;
    private ChatType chatType;
    private HashMap<String, Member> userList = new HashMap<>();
    private HashMap<String, WebSocketSession> videoList = new HashMap<>();

    @Builder
    public ChatRoom(String roomId, String roomName, long userCount, ChatType chatType, HashMap<String, Member> userList, HashMap<String, WebSocketSession> videoList) {
        this.roomId = roomId;
        this.roomName = roomName;
        this.userCount = userCount;
        this.chatType = chatType;
        this.userList = userList;
        this.videoList = videoList;
    }

    public ChatRoom create(String roomName, ChatType chatType) {
        ChatRoom chatRoom = new ChatRoom();
        chatRoom.roomId = UUID.randomUUID().toString();
        chatRoom.roomName = roomName;
        chatRoom.chatType = chatType;
        return chatRoom;
    }

    public enum ChatType {
        MSG, RTC, BOTH,
    }
}
