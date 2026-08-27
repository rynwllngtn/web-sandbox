package dev.rynwllngtn.identity.infrastructure.persistence;

import dev.rynwllngtn.identity.domain.Identity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface IdentityRepositoryJpa extends JpaRepository<Identity, UUID> {
    Optional<Identity> findByCpfAndPassword(String cpf, String password);
}