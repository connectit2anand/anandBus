package com.anand.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.anand.entity.UserBookingHistory;

@Repository
public interface UserBookingHistoryRepository extends JpaRepository<UserBookingHistory, Integer>{
	
}
