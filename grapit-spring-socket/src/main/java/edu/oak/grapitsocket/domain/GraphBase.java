package edu.oak.grapitsocket.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Getter
@ToString
@RedisHash(value = "component") // timeToLive
public class GraphBase {

    @Id
    private final String roomId;

    private final String type;

    private final String data;


    @Builder
    public GraphBase(String roomId, String type, String data) {
        this.roomId = roomId;
        this.type = type;
        this.data = data;
    }
}


