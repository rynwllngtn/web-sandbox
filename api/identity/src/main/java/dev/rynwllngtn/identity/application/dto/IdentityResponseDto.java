package dev.rynwllngtn.identity.application.dto;

import dev.rynwllngtn.identity.domain.IdentityStatus;

import java.util.UUID;

public record IdentityResponseDto(
        UUID id,
        String cpf,
        String email,
        IdentityStatus status
) {}