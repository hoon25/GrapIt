package edu.oak.grapitspring.repository.Room;

import edu.oak.grapitspring.domain.Room;

import java.util.List;
import java.util.Optional;

public interface RoomRepository {

    Long insert(Room room);

    List<Room> findAllRooms();

    Optional<Room> findByRoomId(Long roomId);

    Optional<Room> findByRoomCreatorId(Long roomCreatorId);

}

