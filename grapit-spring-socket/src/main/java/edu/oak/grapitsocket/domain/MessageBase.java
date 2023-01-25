package edu.oak.grapitsocket.domain;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import java.util.HashMap;

@Getter
@Setter
@ToString
@RedisHash(value = "component") // timeToLive
@NoArgsConstructor
public class MessageBase {

    @Id
    private String redisKey;

    private String roomId;

    private MessageType type;

    private HashMap<String, MessageData> data;

    private String sender;


    @Builder
    public MessageBase(String roomId, MessageType type, HashMap<String, MessageData> data, String sender) {
        this.roomId = roomId;
        this.type = type;
        this.data = data;
        this.sender = sender;
    }
}


