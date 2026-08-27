package dev.rynwllngtn.identity.application.mapper;

import dev.rynwllngtn.identity.application.dto.IdentityRegisterRequest;
import dev.rynwllngtn.identity.application.dto.IdentityResponse;
import dev.rynwllngtn.identity.domain.Identity;
import org.springframework.stereotype.Component;

@Component
public class IdentityMapper {

    public IdentityResponse toResponse(Identity identity) {
        return new IdentityResponse(
                identity.getId(),
                identity.getCpf(),
                identity.getUsername(),
                identity.getEmail(),
                identity.getStatus()
        );
    }

    public Identity toEntity(IdentityRegisterRequest request) {
        return new Identity(
                request.cpf(),
                request.password(),
                request.username(),
                request.email()
        );
    }

}