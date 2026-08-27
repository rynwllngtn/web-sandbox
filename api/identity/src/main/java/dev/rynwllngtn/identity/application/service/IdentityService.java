package dev.rynwllngtn.identity.application.service;

import dev.rynwllngtn.identity.application.dto.IdentityRegisterRequest;
import dev.rynwllngtn.identity.application.dto.IdentityLoginRequest;
import dev.rynwllngtn.identity.application.dto.IdentityResponse;
import dev.rynwllngtn.identity.application.dto.IdentityTokenResponse;
import dev.rynwllngtn.identity.application.exception.ResourceNotFoundException;
import dev.rynwllngtn.identity.application.mapper.IdentityMapper;
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
    private final IdentityMapper identityMapper;

    private Identity findByIdOrThrow(UUID uuid) {
        Optional<Identity> identity = identityRepository.findById(uuid);
        return identity.orElseThrow(
                () -> new ResourceNotFoundException("Identidade não encontrada!")
        );
    }

    private Identity findByCpfAndPasswordOrThrow(String cpf, String password) {
        Optional<Identity> identity = identityRepository.findByCpfAndPassword(cpf, password);
        return identity.orElseThrow(
                () -> new ResourceNotFoundException("Identidade não encotrada!")
        );
    }

    public IdentityResponse findById(UUID uuid) {
        Identity identity = findByIdOrThrow(uuid);
        return identityMapper.toResponse(identity);
    }

    public IdentityTokenResponse login(IdentityLoginRequest request) {
        Identity identity = findByCpfAndPasswordOrThrow(request.cpf(), request.password());
        return new IdentityTokenResponse(identity.getId());
    }

    public IdentityResponse register(IdentityRegisterRequest request) {
        Identity identity = identityMapper.toEntity(request);
        identity = identityRepository.save(identity);
        return identityMapper.toResponse(identity);
    }

}