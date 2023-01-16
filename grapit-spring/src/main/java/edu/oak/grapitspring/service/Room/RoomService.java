package edu.oak.grapitspring.service.Room;

import edu.oak.grapitspring.controller.Room.CreateRoomRequestDTO;
import edu.oak.grapitspring.domain.Room;
import edu.oak.grapitspring.repository.Member.MemberRepository;
import edu.oak.grapitspring.repository.Room.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RoomService {

    private final MemberRepository memberRepository;
    private final RoomRepository roomRepository;

    public Long createRoom(CreateRoomRequestDTO requestDTO, Long memberId) {
        Room requestRoom = requestDTO.toEntity();
        Room room = Room.create(requestRoom.getRoomName(), memberId);
        return roomRepository.insert(room);
    }

    public List<RoomResponseDTO> findAllRooms() {
        List<Room> roomRepositoryAllRooms = roomRepository.findAllRooms();
        List<RoomResponseDTO> findAllRoomsResponseDTO = roomRepositoryAllRooms.stream().map(room -> RoomResponseDTO.builder()
                .roomId(room.getRoomId())
                .roomName(room.getRoomName())
                .roomCreatorNickName(memberRepository.findByMemberId(room.getRoomCreatorId()).get().getNickName())
                .build()).collect(Collectors.toList());
        return findAllRoomsResponseDTO;
    }

    public Optional<Room> findByRoomId(Long roomId) {
        return roomRepository.findByRoomId(roomId);
    }

    public Optional<Room> findByRoomCreatorId(Long roomCreatorId) {
        return roomRepository.findByRoomCreatorId(roomCreatorId);
    }

}
