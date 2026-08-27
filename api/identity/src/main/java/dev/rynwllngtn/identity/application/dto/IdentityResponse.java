package dev.rynwllngtn.identity.application.dto;

import dev.rynwllngtn.identity.domain.IdentityStatus;

import java.util.UUID;

public record IdentityResponse(
        UUID id,
        String cpf,
        String username,
        String email,
        IdentityStatus status
) {}