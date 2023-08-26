package com.anand.serviceImpl;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.anand.entity.Bus;
import com.anand.entity.Reservation;
import com.anand.entity.Route;
import com.anand.exception.BusException;
import com.anand.exception.RouteException;
import com.anand.repository.BusRepository;
import com.anand.repository.ReservationRepository;
import com.anand.repository.RouteRepository;
import com.anand.service.BusService;

@Service
public class BusServiceImpl implements BusService{

	@Autowired
	private BusRepository busRepository;
	@Autowired
	private RouteRepository routeRepository;
	
	
	@Override
	public Bus addBus(Bus bus,Integer routeId) {
		
		Route route = routeRepository.findById(routeId).orElseThrow(()-> new RouteException("Please Enter Valid Route Id"));
		
		String busNumber = bus.getBusNumber();
		List busNumberList = busRepository.findByBusNumber(busNumber);
		if(busNumberList.size() != 0) {
			throw new BusException("Bus number already exist");
		}
		LocalDate busJourneyDate = bus.getBusJourneyDate();
		if(busJourneyDate.isBefore(LocalDate.now())) {
			throw new BusException("Please Enter Valid Bus Journey Date");
		}
		
		List<Reservation> reservationList = new ArrayList<>();
		bus.setReservationList(reservationList);
		List<Bus> busList = route.getBusList();
		busList.add(bus);
		route.setBusList(busList);
		bus.setRoute(route);
		routeRepository.save(route);
		return bus;
	}

	@Override
	public Bus updateBus(Bus bus) {
		Bus oldBus = busRepository.findById(bus.getBusId()).orElseThrow(()-> 
				new BusException("Bus does not exist"));
		
		if(bus.getAvailableSeats() > bus.getSeats()) {
			throw new BusException("Please Enter Correct Number Of Total and Available Seats");
		}
		busRepository.save(bus);
		return bus;
	}

	@Override
	public String deleteBus(Integer busId) {
		Bus bus = busRepository.findById(busId).orElseThrow(() -> 
					new BusException("Bus does not exist.Plese Enter Valid Bus Id"));
		busRepository.delete(bus);
		return "Bus Successfully Deleted";
	}

	@Override
	public List<Bus> getAllBus(Integer pageNumber,Integer numberOfRecords) {
		Pageable p =  PageRequest.of(pageNumber - 1, numberOfRecords);
		Page<Bus> page = busRepository.findAll(p); 
		List<Bus> buses = page.getContent();
		return buses;
	}

}
