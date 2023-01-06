package edu.oak.grapitspring.chat;

import org.springframework.web.socket.WebSocketSession;

import java.util.List;
import java.util.Map;

public interface ChatRepository {

    List<ChatRoom> findAllRoom();

    ChatRoom findRoomById(String roomId);

    ChatRoom createRoom(String roomName, ChatRoom.ChatType chatType);

    void removeRoom(String roomId);

    void addRoomUser(String roomId, Long userId);

    void delRoomUser(String roomId, Long userId);

    Map<String, WebSocketSession> addClient(ChatRoom room, String name, WebSocketSession session);

    Map<String, WebSocketSession> getClients(ChatRoom room);

    void removeClientByName(ChatRoom room, String userUUID);
}
