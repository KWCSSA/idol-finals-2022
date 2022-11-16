package com.example.votingsystem.controller;

import static com.example.votingsystem.constants.Constants.*;

import com.example.votingsystem.model.Ticket;
import com.example.votingsystem.model.Vote;
import com.example.votingsystem.repository.TicketRepository;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TicketController {
  @Autowired
  TicketRepository ticketRepository;

  @GetMapping("/result/{round}")
  public ResponseEntity<HashMap<String, Integer>> getResultForRound(@PathVariable(required = true) String round) {
    HashMap<String, Integer> result = new HashMap<>();

    ticketRepository.findAll().forEach(ticket -> {
      String candidateName = getVotedCandidateByRound(ticket, round);
      if (result.containsKey(candidateName)) {
        result.put(candidateName, result.get(candidateName) + 1);
      } else {
        result.put(candidateName, 1);
      }
    });

    return new ResponseEntity<>(result, HttpStatus.OK);
  }

  @PostMapping("/vote/{round}")
  public ResponseEntity<List<Ticket>> adminVote(@PathVariable("round") String round, @RequestBody Vote adminVote) {
    List<Ticket> tickets = new ArrayList<Ticket>();

    for (int i = 0; i < adminVote.getNumOfTickets(); ++i) {
      String uniqueID = "admin" + UUID.randomUUID().toString();
      Ticket _ticket = ticketRepository.save(new Ticket(uniqueID));
      setVotedCandidateByRound(_ticket, round, adminVote.getCandidateName());
      tickets.add(_ticket);
    }
    return new ResponseEntity<>(tickets, HttpStatus.OK);
  }

  @PutMapping("/vote/{round}/{id}")
  public ResponseEntity<Ticket> vote(@PathVariable("round") String round,
                                     @PathVariable("id") String id,
                                     @RequestBody Vote vote) {
    Optional<Ticket> ticket = ticketRepository.findById(id);
    if (!ticket.isPresent()) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    Ticket _ticket = ticket.get();
    String candidateName = vote.getCandidateName();
    if (getVotedCandidateByRound(_ticket, round) != "") {
      return new ResponseEntity<>(HttpStatus.ALREADY_REPORTED);
    }
    setVotedCandidateByRound(_ticket, round, candidateName);
    return new ResponseEntity<>(ticketRepository.save(_ticket), HttpStatus.OK);
  }

  private String getVotedCandidateByRound(Ticket ticket, String round) {
    switch (round) {
      case SEMIFINAL1:
        return ticket.getSemiFinalRound1();
      case SEMIFINAL2:
        return ticket.getSemiFinalRound2();
      case SEMIFINAL3:
        return ticket.getSemiFinalRound3();
      case REPECHAGE:
        return ticket.getRepechageRound();
      case FINAL:
        return ticket.getFinalRound();
      default:
        return "";
    }
  }

  private void setVotedCandidateByRound(Ticket ticket, String round, String candidateName) {
    switch (round) {
      case SEMIFINAL1:
        ticket.setSemiFinalRound1(candidateName);
        break;
      case SEMIFINAL2:
        ticket.setSemiFinalRound2(candidateName);
        break;
      case SEMIFINAL3:
        ticket.setSemiFinalRound3(candidateName);
        break;
      case REPECHAGE:
        ticket.setRepechageRound(candidateName);
        break;
      case FINAL:
        ticket.setFinalRound(candidateName);
        break;
      default:
        break;
    }
  }
}
