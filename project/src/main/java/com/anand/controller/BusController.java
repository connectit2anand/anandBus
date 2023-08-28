package com.anand.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.anand.entity.Bus;
import com.anand.service.BusService;


import jakarta.validation.Valid;

@RestController
@CrossOrigin
public class BusController {
	
	@Autowired
	private BusService busService;
	
	@PostMapping("/addBus/{routeId}")
	public ResponseEntity<Bus> addBus(@RequestBody Bus bus,@PathVariable Integer routeId){
		Bus response = busService.addBus(bus,routeId);
		return new ResponseEntity<Bus>(response,HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/updateBus/{busId}")
	public ResponseEntity<Bus> updateBus(@RequestBody Bus bus,@PathVariable Integer busId){
		Bus newBus = busService.updateBus(bus,busId);
		return new ResponseEntity<>(newBus,HttpStatus.ACCEPTED);
	}
	
	@DeleteMapping("/deleteBus/{busId}")
	public ResponseEntity<String> deleteBus(@PathVariable Integer busId){
		String response = busService.deleteBus(busId);
		return new ResponseEntity<String>(response,HttpStatus.OK);
	}
	
	@GetMapping("/getAllBus/{pageNumber}/{numberOfRecords}")
	public ResponseEntity<List<Bus>> getAllBusPageWise(@PathVariable Integer pageNumber,@PathVariable Integer numberOfRecords){
		List<Bus> busList = busService.getAllBus(pageNumber,numberOfRecords);
		return new ResponseEntity<>(busList,HttpStatus.ACCEPTED);
	}
	
	@GetMapping("/getAllBuses")
	public ResponseEntity<List<Bus>> getAllBuses(){
		List<Bus> buses = busService.getAllBusesList();
		return new ResponseEntity<List<Bus>>(buses,HttpStatus.OK);
	}
	 
}
