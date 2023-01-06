package edu.oak.grapitspring.chat;

import lombok.Builder;
import lombok.Data;

@Data
public class ChatDTO {

    public enum MessageType {
        ENTER, LEAVE, TALK, DRAW
    }

    private MessageType type;
    private String roomId;
    private String sender;
    private String message;
    private String time;

    @Builder
    public ChatDTO(MessageType type, String roomId, String sender, String message, String time) {
        this.type = type;
        this.roomId = roomId;
        this.sender = sender;
        this.message = message;
        this.time = time;
    }
}
