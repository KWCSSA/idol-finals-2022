package com.example.votingsystem.model;

import static com.example.votingsystem.constants.Constants.NOT_STARTED;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "status")
public class RoundStatus {

  @Getter @Setter
  private String status;

  @Getter @Setter
  private String round;

  @Getter @Setter
  private String[] candidates;

  public RoundStatus(String round, String[] candidates) {
    this.status = NOT_STARTED;
    this.round = round;
    this.candidates = candidates;
  }
}
