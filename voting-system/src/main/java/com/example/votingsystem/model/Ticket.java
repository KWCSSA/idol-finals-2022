package com.example.votingsystem.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("Tickets")
public class Ticket {

  @Id
  private String id;
  @Getter
  @Setter
  private String semiFinalRound1;

  @Getter
  @Setter
  private String semiFinalRound2;

  @Getter
  @Setter
  private String semiFinalRound3;

  @Getter
  @Setter
  private String repechageRound;

  @Getter
  @Setter
  private String finalRound;

  public Ticket(String id) {
    this.id = id;
    this.semiFinalRound1 = "";
    this.semiFinalRound2 = "";
    this.semiFinalRound3 = "";
    this.repechageRound = "";
    this.finalRound = "";
  }
}
