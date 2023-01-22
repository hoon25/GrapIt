package edu.oak.grapitsocket.domain;

import lombok.*;

import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class MessageDataFigure3D extends MessageData {

    private String figureId;

    private String type;

    private String color;

    // line
    private List<String> point1;

    // line
    private List<String> point2;

    // Sphere, PlatonicSolid
    private List<String> position;

    // Sphere
    private String radius;

    // PlatonicSolid
    private String length;

    @Builder
    public MessageDataFigure3D(String uniqueId, String figureId, String type, String color, List<String> point1, List<String> point2, List<String> position, String radius, String length) {
        super(uniqueId);
        this.figureId = figureId;
        this.type = type;
        this.color = color;
        this.point1 = point1;
        this.point2 = point2;
        this.position = position;
        this.radius = radius;
        this.length = length;
    }
}
