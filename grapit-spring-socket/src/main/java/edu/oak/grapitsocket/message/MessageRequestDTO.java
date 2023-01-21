package edu.oak.grapitsocket.message;

import edu.oak.grapitsocket.domain.MessageType;
import lombok.Builder;
import lombok.Data;

@Data
public class MessageRequestDTO {

    private MessageType type;
    private String roomId;
    private String sender;
    private String data;
    private String time;

    @Builder
    public MessageRequestDTO(MessageType type, String roomId, String sender, String data, String time) {
        this.type = type;
        this.roomId = roomId;
        this.sender = sender;
        this.data = data;
        this.time = time;
    }

}
