package edu.oak.grapitsocket.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class MessageDataGraph2D extends MessageData {

    private String figureId;
    private String type;
    private String color;
    private Float firstProps;
    private Float secondProps;
    private Float thirdProps;
    private Integer thick;

}
