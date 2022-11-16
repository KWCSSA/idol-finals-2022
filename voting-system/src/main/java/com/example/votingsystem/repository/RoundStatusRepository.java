package com.example.votingsystem.repository;

import com.example.votingsystem.model.RoundStatus;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RoundStatusRepository extends MongoRepository<RoundStatus, String> {
  Optional<RoundStatus> findByRound(String round);
  Optional<RoundStatus> findByStatus(String status);
}