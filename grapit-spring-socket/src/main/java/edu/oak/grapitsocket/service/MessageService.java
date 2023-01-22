package edu.oak.grapitsocket.service;

import edu.oak.grapitsocket.domain.MessageBase;
import edu.oak.grapitsocket.message.MessageRequestDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@RequiredArgsConstructor
@Service
public class MessageService {

    private final RedisTemplate<String, MessageBase> redisTemplate;


    // if key exists append value to the end of the list or create a new list
    public MessageResponseDTO addComponet(MessageRequestDTO requestDTO) {
        MessageBase messageBase = MessageBase.builder()
            .roomId(requestDTO.getRoomId())
            .type(requestDTO.getType())
            .data(requestDTO.getData())
            .sender(requestDTO.getSender())
            .build();
        System.out.println("messageBase = " + messageBase.toString());
        ListOperations<String, MessageBase> stringMessageBaseListOperations = redisTemplate.opsForList();
        stringMessageBaseListOperations.rightPush(messageBase.getRoomId(), messageBase);


        return MessageResponseDTO.builder()
            .roomId(messageBase.getRoomId())
            .type(messageBase.getType())
            .sender(messageBase.getSender())
//            .message(getAllComponent(messageBase.getRoomId(), stringMessageBaseListOperations))
            .build();
    }

    public void deleteComponent() {

    }

    public void updateComponent() {

    }

    private String getAllComponent(String key, ListOperations<String, MessageBase> stringMessageBaseListOperations) {
        List<MessageBase> messageBaseList = stringMessageBaseListOperations.range(key, 0, -1);

        if (messageBaseList == null) {
            return "[]";
        }
        return Arrays.toString(messageBaseList.toArray());
    }

}
