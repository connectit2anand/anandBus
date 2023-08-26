package com.anand.entity;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
@Entity
@Data
public class Reservation {
	 	@Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Integer reservationID;
	 	
	 	@Enumerated(EnumType.STRING)
	    private Status Status;
	 	

	    private LocalDate bookingDate;
	 	

	    private LocalTime bookingTime;
	    

	    private String source;
	    

	    private String destination;
	    


	    private LocalDate journeyDate;
	    

	    private Integer bookedSeat;
	    

	    private Integer fare;

	    @ManyToOne
	    private Bus bus;
}
