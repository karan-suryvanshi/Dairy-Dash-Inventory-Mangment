package com.dairydash.common.api;

import java.time.Instant;

public class ApiResponse<T> {
	private boolean success;
	private String message;
	private T data;
	private Instant timestamp;
	
	public ApiResponse() {
		this.timestamp = Instant.now();
	}

	public ApiResponse(boolean success, String message, T data) {
		super();
		this.success = success;
		this.message = message;
		this.data = data;
	}

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public T getData() {
		return data;
	}

	public void setData(T data) {
		this.data = data;
	}

	public Instant getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(Instant timestamp) {
		this.timestamp = timestamp;
	}
}
