package com.dairydash.common.health;

import java.time.Instant;

public class HealthResponse {
	private String status;
	private String message;
	private Instant timestamp;
	
	public HealthResponse() {
		this.timestamp = Instant.now();
	}

	public HealthResponse(String status, String message) {
		super();
		this.status = status;
		this.message = message;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Instant getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(Instant timestamp) {
		this.timestamp = timestamp;
	}
}
