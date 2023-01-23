package edu.oak.grapitsocket.textchat;

import lombok.Builder;
import lombok.Data;

@Data
public class ChatDTO {

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

    public enum MessageType {
        ENTER, LEAVE, TALK, GRAPH, PAINT, RATIO, CAMERA, FIGURE,CAMERA2D
    }
}
