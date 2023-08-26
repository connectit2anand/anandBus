package com.anand.service;

import com.anand.entity.Reservation;
import com.anand.entity.ReservationDto;

public interface ReservationService {

	Reservation addReservation(ReservationDto reservationDto, Integer routeId, Integer userId);

	String cancelTicket(Integer userId, Integer userBookingId);

}
