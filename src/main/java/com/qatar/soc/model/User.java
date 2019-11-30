package com.qatar.soc.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Entity
@Table(name = "user")
@Data
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String status;

	@NotBlank
	private String name;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
	@JsonIgnore
	private Set<Activity> activities = new HashSet<>();

	@Override
	public String toString() {
		String result = String.format("Category[id=%d, name='%s']%n", id, name);
		if (activities != null) {
			for (Activity book : activities) {
				result += String.format("Activity[id=%d, title='%s']%n", book.getId(), book.getName());
			}
		}

		return result;
	}
}