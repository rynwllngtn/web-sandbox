package dev.rynwllngtn.identity.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Getter @NoArgsConstructor
@Entity @Table(name = "entities")
public class Identity {

    @Id @Column(name = "id", nullable = false, updatable = false)
    private UUID id;

    @Column(name = "cpf", nullable = false, unique = true, length = 11)
    private String cpf;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "status", nullable = false)
    private IdentityStatus status;

    public Identity(String cpf, String password, String email) {
        id = UUID.randomUUID();
        this.cpf = cpf;
        this.password = password;
        this.email = email;
        status = IdentityStatus.ACTIVE;
    }

}