package com.anand.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.anand.entity.Reservation;
import com.anand.entity.ReservationDto;
import com.anand.repository.ReservationRepository;
import com.anand.service.ReservationService;

@RestController
public class ReservationController {
	
	@Autowired
	private ReservationService reservationService;
	
	@PostMapping("/addReservation/{routeId}/{userId}")
	public ResponseEntity<Reservation> addReservation(@RequestBody ReservationDto reservationDto,
														@PathVariable Integer routeId,@PathVariable Integer userId){
		Reservation response = reservationService.addReservation(reservationDto,routeId,userId);
		return new ResponseEntity<Reservation>(response,HttpStatus.OK);
	}
	
	@PatchMapping("cancelTicket/{userId}/{userBookingId}")
	public ResponseEntity<String> cancelTicket(@PathVariable Integer userId,
										@PathVariable Integer userBookingId){
		String response = reservationService.cancelTicket(userId,userBookingId);
		return new ResponseEntity<String>(response,HttpStatus.OK);
	}
				
}
