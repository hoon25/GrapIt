package edu.oak.grapitspring.domain;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "room")
@Getter
@Setter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Room {

    @Id
    @GeneratedValue
    private Long roomId;

    private String roomName;

    private long userCount;

    private Long roomCreatorId;

    @Builder
    public Room(Long roomId, String roomName, long userCount, Long roomCreator) {
        this.roomId = roomId;
        this.roomName = roomName;
        this.userCount = userCount;
        this.roomCreatorId = roomCreator;
    }

    public static Room create(String roomName, Long roomCreator) {
        Room room = new Room();
        room.roomName = roomName;
        room.roomCreatorId = roomCreator;
        return room;
    }

}


