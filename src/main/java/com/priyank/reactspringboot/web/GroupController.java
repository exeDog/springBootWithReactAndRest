package com.priyank.reactspringboot.web;

import com.priyank.reactspringboot.model.Group;
import com.priyank.reactspringboot.model.GroupRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Optional;


@RestController
@RequestMapping
public class GroupController {

    private final Logger log = LoggerFactory.getLogger(GroupController.class);

    private GroupRepository groupRepository;

   public GroupController(GroupRepository groupRepository){
       this.groupRepository = groupRepository;
   }

    @GetMapping("/")
    public String home(){
        return "Hello World!";
    }

   @GetMapping("/groups")
   Collection<Group> groupCollection(){
       return groupRepository.findAll();
   }

   @GetMapping("/groups/{id}")
    ResponseEntity<?> getGroup(@PathVariable Long id){
       Optional<Group> group = groupRepository.findById(id);
       return group.map(response -> ResponseEntity.ok().body(response))
               .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
   }

   @PostMapping("/group")
    ResponseEntity<Group> createGroup(@Valid @RequestBody Group group) throws URISyntaxException{
       log.info("Request to create group",group);
       Group result = groupRepository.save(group);
       return ResponseEntity.created(new URI("/api/group/"+result.getId()))
               .body(result);
   }

   @PutMapping("/group")
    ResponseEntity<Group> updateGroup(@Valid @RequestBody Group group){
       log.info("Updating the group",group);
       Group group1 = groupRepository.save(group);
       return ResponseEntity.ok().body(group1);
   }

   @DeleteMapping("/group/{id}")
    ResponseEntity<?> deleteGroup(@PathVariable Long id){
       log.info("Deleting group id",id);
       groupRepository.deleteById(id);
       return ResponseEntity.ok().build();
   }

}
