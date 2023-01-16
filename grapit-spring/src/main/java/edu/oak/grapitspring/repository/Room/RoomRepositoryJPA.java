package edu.oak.grapitspring.repository.Room;

import edu.oak.grapitspring.domain.Room;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class RoomRepositoryJPA implements RoomRepository {

    private final EntityManager em;

    public Long insert(Room room) {
        em.persist(room);
        return room.getRoomId();
    }

    public List<Room> findAllRooms() {

        return em.createQuery("select r from Room r", Room.class)
                .getResultList();
    }

    public Optional<Room> findByRoomId(Long roomId) {

        return Optional.ofNullable(em.find(Room.class, roomId));
    }

    public Optional<Room> findByRoomCreatorId(Long roomCreatorId) {

        return Optional.ofNullable(em.find(Room.class, roomCreatorId));
    }


}
