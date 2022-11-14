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
  private String 复赛1;

  @Getter
  @Setter
  private String 复赛2;

  @Getter
  @Setter
  private String 复赛3;

  @Getter
  @Setter
  private String 复活赛;

  @Getter
  @Setter
  private String 决赛;

  public Ticket(String id) {
    this.id = id;
    this.复赛1 = "";
    this.复赛2 = "";
    this.复赛3 = "";
    this.复活赛 = "";
    this.决赛 = "";
  }
}
