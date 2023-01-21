package edu.oak.grapitsocket.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Getter
@ToString
@RedisHash(value = "component") // timeToLive
@NoArgsConstructor
public class MessageBase {

    @Id
    private String roomId;

    private MessageType type;

    private String data;

    private String time;

    private String sender;


    @Builder
    public MessageBase(String roomId, MessageType type, String data, String time, String sender) {
        this.roomId = roomId;
        this.type = type;
        this.data = data;
        this.time = time;
        this.sender = sender;
    }
}


