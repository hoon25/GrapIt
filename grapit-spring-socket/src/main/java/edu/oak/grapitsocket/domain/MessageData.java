package edu.oak.grapitsocket.domain;

import lombok.*;

import java.util.List;

@Getter
@ToString
@Setter
//@RedisHash(value = "component") // timeToLive
@NoArgsConstructor
public class MessageData {

    private String figureId;

    private String type;

    private String color;

    private List<String> point1;

    private List<String> point2;

    @Builder
    public MessageData(String figureId, String type, String color, List<String> point1, List<String> point2) {
        this.figureId = figureId;
        this.type = type;
        this.color = color;
        this.point1 = point1;
        this.point2 = point2;
    }
}
