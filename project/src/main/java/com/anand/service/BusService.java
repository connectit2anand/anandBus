package com.anand.service;

import java.util.List;


import com.anand.entity.Bus;

public interface BusService {

	Bus addBus(Bus bus,Integer routeId);

	Bus updateBus(Bus bus);

	String deleteBus(Integer busId);
	
	
	List<Bus> getAllBus(Integer pageNumber,Integer numberOfRecords);

}
