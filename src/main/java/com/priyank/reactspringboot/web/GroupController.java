package com.priyank.reactspringboot.web;

import com.priyank.reactspringboot.model.Group;
import com.priyank.reactspringboot.model.GroupRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Optional;


@RestController
@RequestMapping("/group")
public class GroupController {

    private final Logger log = LoggerFactory.getLogger(GroupController.class);

    private GroupRepository groupRepository;

    @Autowired
    public void setGroupRepository(GroupRepository groupRepository) {
        this.groupRepository = groupRepository;
    }

    @GetMapping("/")
    Collection<Group> groupCollection() {
        return groupRepository.findAll();
    }

    @GetMapping("/{id}")
    ResponseEntity<?> getGroup(@PathVariable Long id) {
        Optional<Group> group = groupRepository.findById(id);
        return group.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/")
    ResponseEntity<Group> createGroup(@Valid @RequestBody Group group) throws URISyntaxException {
        log.info("Request to create group", group);
        Group result = groupRepository.save(group);
        return ResponseEntity.created(new URI("/api/group/" + result.getId()))
                .body(result);
    }

    @PutMapping("/")
    ResponseEntity<Group> updateGroup(@Valid @RequestBody Group group) {
        log.info("Updating the group", group);
        Group group1 = groupRepository.save(group);
        return ResponseEntity.ok().body(group1);
    }

    @DeleteMapping("/{id}")
    ResponseEntity<?> deleteGroup(@PathVariable Long id) {
        log.info("Deleting group id", id);
        groupRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

}
