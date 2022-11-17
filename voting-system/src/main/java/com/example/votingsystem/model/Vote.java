package com.example.votingsystem.model;

import lombok.Getter;

public class Vote {
  @Getter private String candidateName;
  @Getter private Integer numberOfTickets;
  public Vote(String candidateName, Integer numberOfTickets) {
    this.candidateName = candidateName;
    this.numberOfTickets = numberOfTickets;
  }

  public Vote(String candidateName) {
    this.candidateName = candidateName;
    this.numberOfTickets = 1;
  }
}
