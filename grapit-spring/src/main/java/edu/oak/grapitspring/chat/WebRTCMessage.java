package edu.oak.grapitspring.chat;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class WebRTCMessage {
    private String from;
    private String type;
    private String data;
    private Object candidate;
    private Object sdp;

    @Builder
    public WebRTCMessage(String from, String type, String data, Object candidate, Object sdp) {
        this.from = from;
        this.type = type;
        this.data = data;
        this.candidate = candidate;
        this.sdp = sdp;
    }
}
