package com.anand.entity;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonIgnore;


import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Entity
@Data
public class Bus {
	 	@Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Integer busId;
	 	
	 	@NotBlank(message = "Bus number can't be null/blank, Please provide bus number!")
	 	private String busNumber;
	 	
	    @NotBlank(message = "Bus name can't be null/blank, Please provide a valid name first!")
	    private String busName;

	    @NotBlank(message = "Driver name can't be null/blank, Please provide a valid name first!")
	    private String driverName;

	    @NotBlank(message = "Bus Type can't be null/blank, Please provide a valid bus type")
	    private String busType;



	    @NotNull(message = "Bus Journey Date can't be null, Please provide correct date")
	    @DateTimeFormat(pattern = "yyyy-MM-dd")
	    private LocalDate busJourneyDate;

	    @DateTimeFormat(iso = DateTimeFormat.ISO.TIME)
	    private LocalTime arrivalTime;

	    @DateTimeFormat(iso = DateTimeFormat.ISO.TIME)
	    private LocalTime departureTime;

	    private Integer seats;
	    

	    private Integer availableSeats;


	    private Integer fare;


	    @ManyToOne
	    private Route route;
	    
	    @JsonIgnore
	    @OneToMany(mappedBy = "bus",cascade = CascadeType.ALL)
	    private List<Reservation> reservationList = new ArrayList<>();
}
