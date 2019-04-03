package com.priyank.reactspringboot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@SpringBootApplication
public class ReactspringbootApplication {

    public static void main(String[] args) {
        SpringApplication.run(ReactspringbootApplication.class, args);
    }

    @GetMapping("/")
    public String home() {
        return "Hello World!";
    }

}
