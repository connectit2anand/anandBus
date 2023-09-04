package com.anand.service;

import java.util.List;


import com.anand.entity.Bus;
import com.anand.entity.BusDto;

public interface BusService {

	Bus addBus(Bus bus,Integer routeId);

	String updateBus(Integer busId, BusDto busDto, Integer routeId);

	String deleteBus(Integer busId);
	
	
	List<Bus> getAllBus(Integer pageNumber,Integer numberOfRecords);

	List<Bus> getAllBusesList();

}
