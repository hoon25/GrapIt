//package edu.oak.grapitspring.controller;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import edu.oak.grapitspring.service.MemberService;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.http.MediaType;
//import org.springframework.test.context.web.WebAppConfiguration;
//import org.springframework.test.web.servlet.MockMvc;
//
//import static org.mockito.ArgumentMatchers.any;
//import static org.mockito.BDDMockito.given;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
//import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//
//@WebMvcTest
//@WebAppConfiguration
//class MemberControllerTest {
//
//    JoinRequestDTO joinRequestDTO;
//    @Autowired
//    private MockMvc mockMvc;
//    @Autowired
//    private ObjectMapper objectMapper;
//    @MockBean
//    private MemberService memberService;
//
//    @BeforeEach
//    public void init() {
//        joinRequestDTO = JoinRequestDTO.builder()
//                .email("hoon25@naver.com")
//                .password("123123")
//                .nickName("hoon")
//                .build();
//    }
//
//    @Test
//    void joinMember_Success() throws Exception {
//        //given
//        given(memberService.join(any())).willReturn(null);
//        //when
//        //then
//        mockMvc.perform(post("/join")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(objectMapper.writeValueAsString(joinRequestDTO)))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.email").value(joinRequestDTO.getEmail()))
//                .andDo(print());
//    }
//
//
//}