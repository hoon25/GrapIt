package edu.oak.grapitsocket.service;

import edu.oak.grapitsocket.domain.MessageType;
import lombok.Builder;
import lombok.Data;

@Data
public class MessageResponseDTO {

    private MessageType type;
    private String roomId;
    private String sender;
    private String data;
    private String time;

    @Builder
    public MessageResponseDTO(MessageType type, String roomId, String sender, String data, String time) {
        this.type = type;
        this.roomId = roomId;
        this.sender = sender;
        this.data = data;
        this.time = time;
    }
}
