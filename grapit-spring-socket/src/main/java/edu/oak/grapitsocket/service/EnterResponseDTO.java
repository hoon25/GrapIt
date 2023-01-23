package edu.oak.grapitsocket.service;

import edu.oak.grapitsocket.domain.MessageData;
import edu.oak.grapitsocket.domain.MessageType;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class EnterResponseDTO {

    private MessageType type;
    private String roomId;
    private String sender;
    private Map<String, List<MessageData>> data;


    @Builder
    public EnterResponseDTO(MessageType type, String roomId, String sender, Map<String, List<MessageData>> data) {
        this.type = type;
        this.roomId = roomId;
        this.sender = sender;
        this.data = data;
    }
}
