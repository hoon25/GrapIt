package edu.oak.grapitspring.service.Room;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RoomResponseDTO {
    private Long roomId;
    private String roomName;
    private String roomCreatorNickName;
}
