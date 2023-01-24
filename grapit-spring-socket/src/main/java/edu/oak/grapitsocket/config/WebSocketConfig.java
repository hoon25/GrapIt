package edu.oak.grapitsocket.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketTransportRegistration;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // stomp 접속 주소 URL => /sock/ws-stomp
        registry.addEndpoint("/sock/ws-stomp")
            .setAllowedOriginPatterns("*")// CORS
            .withSockJS(); // SocketJS를 연결한다는 설정
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // 메시지를 구독하는 요청 URL => 즉 메시지 받을 때
        registry.enableSimpleBroker("/sock/sub");

        // 메시지를 발행하는 요청 URL => 즉 메시지 보낼 때
        registry.setApplicationDestinationPrefixes("/sock/pub");
    }

    @Override
    public void configureWebSocketTransport(WebSocketTransportRegistration registry) {
        registry.setMessageSizeLimit(128 * 1024);
        registry.setSendTimeLimit(25 * 1000);
        registry.setSendBufferSizeLimit(1024 * 1024);
        registry.setTimeToFirstMessage(30 * 1000);
    }
}
