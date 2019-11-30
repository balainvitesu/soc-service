package com.qatar.soc.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.qatar.soc.model.Activity;

@Repository
public interface ActivityRepository extends JpaRepository<Activity, Integer> {

}
