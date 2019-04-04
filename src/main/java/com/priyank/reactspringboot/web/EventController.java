package com.priyank.reactspringboot.web;

import com.priyank.reactspringboot.model.Event;
import com.priyank.reactspringboot.model.EventRepository;
import com.priyank.reactspringboot.model.Group;
import com.priyank.reactspringboot.model.GroupRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

import javax.validation.Valid;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api")
public class EventController {

    private final Logger log = LoggerFactory.getLogger(EventController.class);

    private GroupRepository groupRepository;

    @Autowired
    public void setGroupRepository(GroupRepository groupRepository) {
        this.groupRepository = groupRepository;
    }

    private EventRepository eventRepository;

    @Autowired
    public void setEventRepository(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    @GetMapping("/event/{id}")
    ResponseEntity<?> getEvent(@PathVariable Long id) {
        log.info("Getting event information");
        Optional<Group> group = groupRepository.findById(id);
        Set<Event> events = null;
        if (group.isPresent()) {
            events = group.get().getEvents();
        }

        return events != null ? ResponseEntity.ok().body(events) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/event/{id}")
    ResponseEntity<Group> addEvent(@Valid @RequestBody Event event, @PathVariable Long id) {
        log.info("Adding a new event to group id " + id);
        Optional<Group> group = groupRepository.findById(id);
        if (group.isPresent()) {
            Set<Event> events = group.get().getEvents();
            events.add(event);
            group.get().setEvents(events);
           groupRepository.save(group.get());
        }

        return ResponseEntity.ok().body(group.get());
    }

    @PutMapping("/event/{id}")
    ResponseEntity<Event> updateEvent(@Valid @RequestBody Event event, @PathVariable Long id) {
        log.info("Updating event id " + id);
        Event event1 = eventRepository.save(event);

        return ResponseEntity.ok().body(event1);
    }

    @DeleteMapping("/event/{id}")
    ResponseEntity<?> deleteEvent(@PathVariable Long id){
        log.info("Deleting event id "+id);
        eventRepository.deleteById(id);

        return ResponseEntity.ok().build();
    }
}
