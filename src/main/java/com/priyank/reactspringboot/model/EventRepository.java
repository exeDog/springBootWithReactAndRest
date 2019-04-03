package com.priyank.reactspringboot.model;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository("EventRepository")
public interface EventRepository extends JpaRepository<Event, Long> {
    Event findByTitle(String title);
}
