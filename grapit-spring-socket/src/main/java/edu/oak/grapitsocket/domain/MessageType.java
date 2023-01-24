package edu.oak.grapitsocket.domain;

import lombok.ToString;

@ToString
public enum MessageType {

    ENTER,
    LEAVE,
    PAINT,
    RATIO2D,
    CAMERA2D,
    GRAPH2D,
    CAMERA3D,
    FIGURE3D // 3D 도형 component



//        ENTER, LEAVE // 공통
//        , PAINT // fabric
//        , GRAPH2D // 2D 그래프 component
//        , RATIO2D // 2D 좌표 View
//        , FIGURE3D // 3D 그래프 component
//        , CAMERA3D // 3D 카메라 View

}
