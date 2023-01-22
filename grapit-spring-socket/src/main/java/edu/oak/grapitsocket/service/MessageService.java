package edu.oak.grapitsocket.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import edu.oak.grapitsocket.domain.MessageBase;
import edu.oak.grapitsocket.domain.MessageData;
import edu.oak.grapitsocket.domain.MessageDataFigure3D;
import edu.oak.grapitsocket.message.MessageRequestDTO;
import edu.oak.grapitsocket.repository.MessageRedisRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@RequiredArgsConstructor
@Service
public class MessageService {

    //    private final RedisTemplate<String, MessageBase> redisTemplate;
    private final MessageRedisRepository messageRedisRepository;
    private final ObjectMapper objectMapper;


    // if key exists append value to the end of the list or create a new list
    public MessageResponseDTO addComponet(MessageRequestDTO requestDTO) throws Exception {
        String prefix = null;
        Class<? extends MessageData> messageDataClass = null;


        switch (requestDTO.getType()) {
            case FIGURE3D:
                prefix = "_FIGURE3D";
                messageDataClass = MessageDataFigure3D.class;
        }

        // component-list있는지 확인
        MessageBase messageBase = messageRedisRepository.findById(requestDTO.getRoomId() + prefix).orElse(new MessageBase());
        HashMap<String, MessageData> data = messageBase.getData();
        if (data == null) {
            data = new HashMap<String, MessageData>();
        }

        // component-list에 component 추가
        MessageData messageData = objectMapper.readValue(requestDTO.getData(), messageDataClass);
        System.out.println("messageData.toString() = " + messageData.toString());
        data.put(messageData.getUniqueId(), messageData);

        messageBase.setRedisKey(requestDTO.getRoomId() + prefix);
        messageBase.setRoomId(requestDTO.getRoomId());
        messageBase.setType(requestDTO.getType());
        messageBase.setSender(requestDTO.getSender());
        messageBase.setData(data);
        messageRedisRepository.save(messageBase);

        return MessageResponseDTO.builder()
            .type(messageBase.getType())
            .roomId(messageBase.getRoomId())
            .sender(messageBase.getSender())
            .data(messageBase.getData().toString())
            .build();
    }

    public void deleteComponent() {

    }

    public void updateComponent() {

    }

}
