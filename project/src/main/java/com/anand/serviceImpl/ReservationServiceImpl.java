package com.anand.serviceImpl;


import java.time.LocalDate;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.anand.entity.Bus;
import com.anand.entity.Reservation;
import com.anand.entity.ReservationDto;
import com.anand.entity.Status;
import com.anand.entity.User;
import com.anand.entity.UserBookingHistory;
import com.anand.exception.BusException;
import com.anand.exception.ReservationException;
import com.anand.exception.UserException;
import com.anand.repository.BusRepository;
import com.anand.repository.ReservationRepository;

import com.anand.repository.UserBookingHistoryRepository;
import com.anand.repository.UserRepository;
import com.anand.service.ReservationService;

@Service
public class ReservationServiceImpl implements ReservationService{
	
	@Autowired
	private BusRepository busRepository;
	
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private ReservationRepository reservationRepository;
	
	@Autowired
	private UserBookingHistoryRepository bookingHistoryRepository;

	@Override
	public Reservation addReservation(ReservationDto reservationDto, Integer busId, Integer userId) {
		
		User user = userRepository.findById(userId).orElseThrow(() -> new UserException("Please Enter valid user id"));
		Bus bus = busRepository.findById(busId).orElseThrow(()-> new BusException("Please Enter valid bus id"));
		Reservation reservation = new Reservation();
		 reservation.setSource(reservationDto.getSource());
		 reservation.setDestination(reservationDto.getDestination());
		 LocalDate journeyDate = reservationDto.getJourneyDate();
		 if(journeyDate.isBefore(LocalDate.now())) {
			 throw new BusException("Please Enter valid journey date");
		 }
		 reservation.setJourneyDate(reservationDto.getJourneyDate());
		 int availableSeats = bus.getAvailableSeats();
		 if(availableSeats < reservationDto.getBookedSeat()) {
			 throw new BusException("The number of seats available is only: " + availableSeats);
		 }
		 bus.setAvailableSeats(availableSeats - reservationDto.getBookedSeat());
		 int fare = bus.getFare()*reservationDto.getBookedSeat();
		 reservation.setFare(fare);
		 reservation.setBookedSeat(reservationDto.getBookedSeat());
		 reservation.setBookingTime(LocalTime.now());
		 reservation.setBookingDate(LocalDate.now());
		 reservation.setStatus(Status.BOOKED);
		 reservation.setBus(bus);
		 List<Reservation> reservationList = bus.getReservationList();
		 reservationList.add(reservation);
		 bus.setReservationList(reservationList);
		 int totalNumberOfReservation = user.getTotalReservation();
		 totalNumberOfReservation = totalNumberOfReservation + reservationDto.getBookedSeat();
		 user.setTotalReservation(totalNumberOfReservation);
		 UserBookingHistory ubh = new UserBookingHistory();
		 ubh.setReservation(reservation);
		 ubh.setUser(user);
		 		 
		 userRepository.save(user);
		 busRepository.save(bus);
		 bookingHistoryRepository.save(ubh);
		 
		return reservation;
	}

	@Override
	public String cancelTicket(Integer userId, Integer userBookingHistoryId) {
		User user = userRepository.findById(userId).orElseThrow(() -> new UserException("Please enter valid user id"));
		List<UserBookingHistory> bookingHistoryList = user.getUserBookingHistory();
		for(UserBookingHistory booking : bookingHistoryList) {
			User u = booking.getUser();
			if(booking.getId() == userBookingHistoryId && u.getUserID() == userId) {
				boolean hasChangedData = changeTheData(booking,u);
				if(hasChangedData) {
					break;
				}
			}
		}
		return "Ticket successfully cancelled ";
	}

	private boolean changeTheData(UserBookingHistory booking, User user) {
		Reservation reservation = booking.getReservation();
		int bookedSeat = reservation.getBookedSeat();
		if(bookedSeat == 0) {
			throw new ReservationException("Your ticket has already been cancelled");
		}
		LocalDate journeyDate = reservation.getJourneyDate();
		LocalDate dateToCheck = journeyDate.minus(1, ChronoUnit.DAYS);
		if(!LocalDate.now().isBefore(dateToCheck)) {
			throw new ReservationException("Sorry! its too late, you have to cancel the ticket atleast one day before");
		}

		reservation.setBookedSeat(0);
		reservation.setStatus(Status.CANCEL);
		reservation.setFare(0);
		Bus bus = reservation.getBus();
		int seatsLeft = bus.getAvailableSeats();
		bus.setAvailableSeats(seatsLeft + bookedSeat);
		user.setTotalReservation(0);
		userRepository.save(user);
		busRepository.save(bus);
		reservationRepository.save(reservation);
		
		return true;
	}

}
