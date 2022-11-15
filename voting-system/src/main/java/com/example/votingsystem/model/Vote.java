package com.example.votingsystem.model;

import lombok.Getter;

public class Vote {
  @Getter private String candidateName;
  @Getter private Integer numOfTickets;
  public Vote(String candidateName, Integer numOfTickets) {
    this.candidateName = candidateName;
    this.numOfTickets = numOfTickets;
  }

  public Vote(String candidateName) {
    this.candidateName = candidateName;
    this.numOfTickets = 1;
  }
}
