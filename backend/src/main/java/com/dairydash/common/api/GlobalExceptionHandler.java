package com.dairydash.common.api;

import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
	
	@ExceptionHandler(IllegalArgumentException.class)
	public ResponseEntity<Map<String, String>> handleBadRequest(IllegalArgumentException exception){
		return ResponseEntity.badRequest().body(
				Map.of(
						"error", "Bad Request",
						"message", exception.getMessage()
				)
		);
	}
	
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<Map<String, String>> handleValidation(MethodArgumentNotValidException exception){
		String message = exception.getBindingResult()
						 .getFieldErrors()
						 .stream()
						 .map(error -> error.getField() + ": " + error.getDefaultMessage())
						 .collect(Collectors.joining("; "));
		
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
				Map.of(
						"error", "Validation Failed",
						"message", message
				)
		);
	}
}
