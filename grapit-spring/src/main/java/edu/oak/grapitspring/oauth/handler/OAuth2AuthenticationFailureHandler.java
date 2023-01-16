package edu.oak.grapitspring.oauth.handler;


import edu.oak.grapitspring.oauth.repository.OAuth2AuthorizationRequestBasedOnCookieRepository;
import edu.oak.grapitspring.utils.CookieUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static edu.oak.grapitspring.oauth.repository.OAuth2AuthorizationRequestBasedOnCookieRepository.REDIRECT_URI_PARAM_COOKIE_NAME;

@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationFailureHandler extends SimpleUrlAuthenticationFailureHandler {

    private final OAuth2AuthorizationRequestBasedOnCookieRepository auth2AuthorizationRepository;


    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {

        String tagretUrl = CookieUtil.getCookie(request, REDIRECT_URI_PARAM_COOKIE_NAME)
                .map(Cookie::getValue)
                .orElse(("/"));

        exception.printStackTrace();

        tagretUrl = UriComponentsBuilder.fromUriString(tagretUrl)
                .queryParam("error", exception.getLocalizedMessage())
                .build().toUriString();

        auth2AuthorizationRepository.removeAuthorizationRequest(request, response);

        getRedirectStrategy().sendRedirect(request, response, tagretUrl);

    }
}
