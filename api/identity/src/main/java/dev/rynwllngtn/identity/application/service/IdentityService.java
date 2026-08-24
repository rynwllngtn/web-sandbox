package dev.rynwllngtn.identity.application.service;

import dev.rynwllngtn.identity.application.dto.IdentityRequestDto;
import dev.rynwllngtn.identity.application.dto.IdentityResponseDto;
import dev.rynwllngtn.identity.domain.Identity;
import dev.rynwllngtn.identity.infrastructure.persistence.IdentityRepositoryJpa;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class IdentityService {

    private final IdentityRepositoryJpa identityRepository;

    private Identity findByIdOrThrow(UUID uuid) {
        Optional<Identity> identity = identityRepository.findById(uuid);
        return identity.orElseThrow(
                () -> new RuntimeException("Identity not found!")
        );
    }

    public IdentityResponseDto findById(UUID uuid) {
        Identity identity = findByIdOrThrow(uuid);
        return new IdentityResponseDto(identity.getId(),
                                       identity.getCpf(),
                                       identity.getEmail(),
                                       identity.getStatus());
    }

    public IdentityResponseDto persist(IdentityRequestDto requestDto) {
        Identity identity = new Identity(requestDto.cpf(),
                                         requestDto.password(),
                                         requestDto.email());
        identity = identityRepository.save(identity);
        return new IdentityResponseDto(identity.getId(),
                                       identity.getCpf(),
                                       identity.getEmail(),
                                       identity.getStatus());
    }

}