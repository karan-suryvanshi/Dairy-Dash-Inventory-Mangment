package com.dairydash.team.dto;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
public record TeamMemberRequest(@NotBlank @Size(max=120) String name,@NotBlank @Email @Size(max=190) String email,@NotBlank @Pattern(regexp="Admin|Manager|Staff|Viewer") String role) {}
