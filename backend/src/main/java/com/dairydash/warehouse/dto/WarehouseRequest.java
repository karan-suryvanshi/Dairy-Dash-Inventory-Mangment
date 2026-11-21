package com.dairydash.warehouse.dto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
public record WarehouseRequest(@NotBlank @Size(max=120) String name,@Size(max=250) String location) {}
