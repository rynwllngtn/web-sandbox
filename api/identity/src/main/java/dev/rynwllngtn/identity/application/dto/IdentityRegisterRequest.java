package dev.rynwllngtn.identity.application.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.hibernate.validator.constraints.br.CPF;

public record IdentityRegisterRequest(
        @NotBlank(message = "O CPF é obrigatório")
        @CPF(message = "O formato do CPF é inválido")
        String cpf,
        @NotBlank(message = "A senha é obrigatória")
        @Size(min = 8, message = "A senha deve ter no mínimo 8 caracteres")
        String password,
        @NotBlank(message = "O nome precisa ser fornecido")
        String username,
        @NotBlank(message = "O e-mail é obrigatório")
        @Email(message = "O formato do e-mail é inválido")
        String email
) {}