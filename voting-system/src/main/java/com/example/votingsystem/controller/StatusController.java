package com.example.votingsystem.controller;

import static com.example.votingsystem.constants.Constants.*;

import com.example.votingsystem.model.RoundStatus;
import com.example.votingsystem.repository.RoundStatusRepository;

import java.util.Optional;

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
public class StatusController {
    @Autowired
    RoundStatusRepository roundStatusRepository;

    @PostMapping("/init/{round}")
    public ResponseEntity<RoundStatus> initRound(@PathVariable String round,
                                                 @RequestBody String[] candidates) {
        RoundStatus _roundStatus = roundStatusRepository.save(new RoundStatus(round, candidates));
        return new ResponseEntity<>(_roundStatus, HttpStatus.OK);
    }

    @PutMapping("/start/{round}")
    public ResponseEntity<RoundStatus> startRound(@PathVariable String round) {
        Optional<RoundStatus> roundStatus = roundStatusRepository.findByRound(round);
        if (!roundStatus.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        RoundStatus _roundStatus = roundStatus.get();
        _roundStatus.setStatus(RUNNING);
        return new ResponseEntity<>(roundStatusRepository.save(_roundStatus), HttpStatus.OK);
    }

    @PutMapping("/end/{round}")
    public ResponseEntity<RoundStatus> endRound(@PathVariable String round) {
        Optional<RoundStatus> roundStatus = roundStatusRepository.findByRound(round);
        if (!roundStatus.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        RoundStatus _roundStatus = roundStatus.get();
        _roundStatus.setStatus(FINISHED);
        return new ResponseEntity<>(roundStatusRepository.save(_roundStatus), HttpStatus.OK);
    }

    @GetMapping("/round")
    public ResponseEntity<RoundStatus> Round(@PathVariable String round) {
        Optional<RoundStatus> roundStatus = roundStatusRepository.findByStatus(RUNNING);
        if (!roundStatus.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        RoundStatus _roundStatus = roundStatus.get();
        return new ResponseEntity<>(_roundStatus, HttpStatus.OK);
    }
}
