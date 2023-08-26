package com.anand.entity;

import java.time.LocalDate;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ReservationDto {
	

    private String source;
	

    private String destination;
	

    private LocalDate journeyDate;
	
	
    private Integer bookedSeat;
	
}
