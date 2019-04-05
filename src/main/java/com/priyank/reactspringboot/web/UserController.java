package com.priyank.reactspringboot.web;

import com.priyank.reactspringboot.model.User;
import com.priyank.reactspringboot.model.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class UserController {

    private final Logger log = LoggerFactory.getLogger(UserController.class);

    private UserRepository userRepository;

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/users")
    Collection<User> getUsers(){
        log.info("Getting all users");
        return userRepository.findAll();
    }

    @GetMapping("/users/{id}")
    ResponseEntity<?> getUser(@PathVariable Long id){
        log.info("Getting user by id "+id);
        Optional<User> user =  userRepository.findById(id);
        return user.map(response -> ResponseEntity.ok().body(response)).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/users")
    ResponseEntity<?> createUser(@Valid @RequestBody User user) throws URISyntaxException{
        log.info("Creating new user "+user);
        userRepository.save(user);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/user/{id}")
    ResponseEntity<?> deleteUser(@PathVariable Long id){
        log.info("Deleting user by id "+id);
        userRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
