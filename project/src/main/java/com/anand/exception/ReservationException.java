package com.anand.exception;

import org.springframework.stereotype.Service;


public class ReservationException extends RuntimeException{

	public ReservationException(String message) {
		super(message);
		
	}
	
}
