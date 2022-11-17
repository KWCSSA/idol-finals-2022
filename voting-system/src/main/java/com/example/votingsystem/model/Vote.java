package com.example.votingsystem.model;

import lombok.Getter;
import lombok.Setter;

public class Vote {
    @Setter
    @Getter
    private String candidateName;

    @Setter
    @Getter
    private Integer numberOfTickets;

    public Vote(String candidateName, Integer numberOfTickets) {
        this.candidateName = candidateName;
        this.numberOfTickets = numberOfTickets;
    }

    public Vote(String candidateName) {
        this.candidateName = candidateName;
        this.numberOfTickets = 1;
    }
}
