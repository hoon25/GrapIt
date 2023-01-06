package edu.oak.grapitspring.user;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;

@RestController
@RequiredArgsConstructor
@Slf4j
public class UserController {

    private final UserService userService;

    //proxy test
//    @GetMapping("/api/hello")
//    public String index() {
//        log.info("route succ!!!!!!");
//        return "hi";
//    }

    @GetMapping("/testoverlay")
    public ResponseEntity<String> loginForm() {
        log.info("testoverlay");
        return ResponseEntity.status(HttpStatus.OK).body("hello");
    }

    @PostMapping("/login")
    public ResponseEntity<UserEntity> login(@RequestBody UserEntity userEntity, HttpSession session) {
        System.out.println("UserController.login");

        System.out.println("userEntity = " + userEntity);
        UserEntity user = userService.logIn(userEntity.getEmail());
        if (user == null) {
            log.info("login Fail");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        //TODO 비밀번호 상관없이 동작
        session.setAttribute("user", user);
        log.info("session check : " + session.getAttribute("user").toString());
        log.info("login Succ");
        return ResponseEntity.ok()
                .body(user);
    }

    @GetMapping("/logout")
    public ResponseEntity logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok().build();
    }


}
