package edu.oak.grapitsocket.message;

import edu.oak.grapitsocket.domain.MessageData;
import edu.oak.grapitsocket.domain.MessageType;
import lombok.Builder;
import lombok.Data;

@Data
public class MessageRequestDTO {

    private MessageType type;
    private String roomId;
    private String sender;
    private MessageData data;
    private String method;

    @Builder
    public MessageRequestDTO(MessageType type, String roomId, String sender, MessageData data, String method) {
        this.type = type;
        this.roomId = roomId;
        this.sender = sender;
        this.data = data;
        this.method = method;
    }

}
