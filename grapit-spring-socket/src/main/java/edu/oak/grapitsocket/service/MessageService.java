package edu.oak.grapitsocket.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import edu.oak.grapitsocket.domain.MessageBase;
import edu.oak.grapitsocket.domain.MessageData;
import edu.oak.grapitsocket.domain.MessageDataFigure3D;
import edu.oak.grapitsocket.domain.MessageDataGraph2D;
import edu.oak.grapitsocket.message.MessageRequestDTO;
import edu.oak.grapitsocket.repository.MessageRedisRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class MessageService {

    //    private final RedisTemplate<String, MessageBase> redisTemplate;
    private final MessageRedisRepository messageRedisRepository;
    private final ObjectMapper objectMapper;


    // if key exists append value to the end of the list or create a new list
    public MessageResponseDTO addComponent(MessageRequestDTO requestDTO) throws Exception {
        String prefix = null;
        Class<? extends MessageData> messageDataClass = null;


        switch (requestDTO.getType()) {
            case FIGURE3D:
                prefix = "_FIGURE3D";
                messageDataClass = MessageDataFigure3D.class;
                break;
            case GRAPH2D:
                prefix = "_GRAPH2D";
                messageDataClass = MessageDataGraph2D.class;
                break;
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
            .data(new ArrayList(messageBase.getData().values()))
            .build();
    }

    public MessageResponseDTO deleteComponent(MessageRequestDTO requestDTO) throws Exception {
        String prefix = null;
        Class<? extends MessageData> messageDataClass = null;


        switch (requestDTO.getType()) {
            case FIGURE3D:
                prefix = "_FIGURE3D";
                messageDataClass = MessageDataFigure3D.class;
                break;
            case GRAPH2D:
                prefix = "_GRAPH2D";
                messageDataClass = MessageDataGraph2D.class;
                break;
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
        data.remove(messageData.getUniqueId());

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
            .data(new ArrayList(messageBase.getData().values()))
            .build();
    }

    public void updateComponent() {

    }

    public EnterResponseDTO getAllComponent(MessageRequestDTO requestDTO) throws Exception {
        String prefix = null;
        Map<String, List<MessageData>> dataListMap = new HashMap<>();

        prefix = "_FIGURE3D";
        MessageBase messageBase = messageRedisRepository.findById(requestDTO.getRoomId() + prefix).orElse(new MessageBase());
        HashMap<String, MessageData> data = messageBase.getData();
        if (data == null) {
            data = new HashMap<String, MessageData>();
        }
        dataListMap.put("figure3D", new ArrayList(data.values()));

        prefix = "_GRAPH2D";
        MessageBase messageBase2 = messageRedisRepository.findById(requestDTO.getRoomId() + prefix).orElse(new MessageBase());
        HashMap<String, MessageData> data2 = messageBase2.getData();
        if (data2 == null) {
            data2 = new HashMap<String, MessageData>();
        }
        dataListMap.put("graph2D", new ArrayList(data2.values()));


        return EnterResponseDTO.builder()
            .type(requestDTO.getType())
            .roomId(requestDTO.getRoomId())
            .sender(requestDTO.getSender())
            .data(dataListMap)
            .build();

    }

}
