package edu.oak.grapitsocket.domain;

import lombok.*;
import org.springframework.data.redis.core.RedisHash;

import java.util.List;

@Getter
@ToString
@Setter
//@RedisHash(value = "component") // timeToLive
@NoArgsConstructor
@AllArgsConstructor
public class MessageData {

    private String uniqueId;
}
