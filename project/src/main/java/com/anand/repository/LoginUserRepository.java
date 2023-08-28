package com.anand.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.anand.entity.LoginUser;

public interface LoginUserRepository extends JpaRepository<LoginUser, Integer>{

}
