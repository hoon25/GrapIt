package edu.oak.grapitspring.controller;

import edu.oak.grapitspring.domain.Room;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CreateRoomRequestDTO {

    private String roomName;

    public Room toEntity() {
        return Room.builder().roomName(roomName).build();
    }

}
