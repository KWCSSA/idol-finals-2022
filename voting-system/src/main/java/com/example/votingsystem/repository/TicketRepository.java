package com.example.votingsystem.repository;

import com.example.votingsystem.model.Ticket;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface TicketRepository extends MongoRepository<Ticket, String> {
}