package com.qatar.soc.model;

import java.io.Serializable;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import lombok.Data;
import lombok.EqualsAndHashCode;

@MappedSuperclass
@Data
@EqualsAndHashCode(of = { "id" })
public class BaseModel implements Serializable {

	private static final long serialVersionUID = 2372526014669295340L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "id", updatable = false, nullable = false)
	private Long id;

	private String status;

	@CreatedDate
	private LocalDateTime createdTime;

	@LastModifiedDate
	private LocalDateTime updatedTime;

	private String createdBy;

	private String modifiedBy;
}
