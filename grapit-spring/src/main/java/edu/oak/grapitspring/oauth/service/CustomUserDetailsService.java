package edu.oak.grapitspring.oauth.service;

import edu.oak.grapitspring.domain.Member;
import edu.oak.grapitspring.oauth.entity.MemberPrincipal;
import edu.oak.grapitspring.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;


    @Override
    public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
        Member member = memberRepository.findByName(name);
        if (member == null) {
            throw new UsernameNotFoundException("Can not find username");
        }
        return MemberPrincipal.create(member);
    }
}
