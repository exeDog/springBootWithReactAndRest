package com.priyank.reactspringboot;

import com.priyank.reactspringboot.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.Collections;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Component
class Initializer implements CommandLineRunner {

    private final GroupRepository groupRepository;

    private final EventRepository eventRepository;

    private  final UserRepository userRepository;

    @Autowired
    public Initializer(GroupRepository groupRepository, EventRepository eventRepository, UserRepository userRepository) {
        this.groupRepository = groupRepository;
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... strings){
        Stream.of("Misc Group", "Dallas Group", "Austin Group",
                "India Group").forEach(name ->
                groupRepository.save(new Group(name))
        );

        Group dGroup = groupRepository.findByName("Dallas Group");

        Event event = Event.builder().title("Full Stack Developer")
                        .description("Reactive with Spring Boot + React")
                        .date(Instant.parse("2018-12-12T18:00:00.000Z"))
                        .build();

        User user = new User();
        user.setName("Priyank");
        user.setEmail("priyankrege@gnail.com");

        userRepository.save(user);

        event.setAttendees(Stream.of(user).collect(Collectors.toSet()));

        eventRepository.save(event);

        dGroup.setEvents(Collections.singleton(event));
        groupRepository.save(dGroup);

        groupRepository.findAll().forEach(System.out::println);

    }
}
