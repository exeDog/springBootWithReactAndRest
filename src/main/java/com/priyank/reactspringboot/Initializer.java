package com.priyank.reactspringboot;

import com.priyank.reactspringboot.model.Event;
import com.priyank.reactspringboot.model.Group;
import com.priyank.reactspringboot.model.GroupRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.Collections;
import java.util.stream.Stream;

@Component
class Initializer implements CommandLineRunner {

    private final GroupRepository repository;

    public Initializer(GroupRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... strings){
        Stream.of("Misc Group", "Dallas Group", "Austin Group",
                "India Group").forEach(name ->
                repository.save(new Group(name))
        );

        Group dGroup = repository.findByName("Dallas Group");

        Event event = Event.builder().title("Full Stack Developer")
                        .description("Reactive with Spring Boot + React")
                        .date(Instant.parse("2018-12-12T18:00:00.000Z"))
                        .build();

        dGroup.setEvents(Collections.singleton(event));
        repository.save(dGroup);

//        repository.findAll().forEach(System.out::println);

    }
}
