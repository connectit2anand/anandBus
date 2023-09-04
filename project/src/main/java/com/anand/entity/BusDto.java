package com.anand.entity;

import java.time.LocalDate;
import java.time.LocalTime;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class BusDto {
	
	
//	@NotBlank(message = "Bus number can't be null/blank, Please provide bus number!")
// 	private String busNumber;
	
//	private Integer routeId;
	
	
	@NotBlank(message = "Bus name can't be null/blank, Please provide a valid name first!")
    private String busName;
	
	@NotBlank(message = "Driver name can't be null/blank, Please provide a valid name first!")
    private String driverName;
	
	 private Integer fare;
	 
	 @NotNull(message = "Bus Journey Date can't be null, Please provide correct date")
	 @DateTimeFormat(pattern = "yyyy-MM-dd")
	 private LocalDate busJourneyDate;
	 
	 @DateTimeFormat(iso = DateTimeFormat.ISO.TIME)
	 private LocalTime arrivalTime;

	 @DateTimeFormat(iso = DateTimeFormat.ISO.TIME)
	 private LocalTime departureTime;
}
