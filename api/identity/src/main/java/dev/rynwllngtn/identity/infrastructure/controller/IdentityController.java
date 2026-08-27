package dev.rynwllngtn.identity.infrastructure.controller;

import dev.rynwllngtn.identity.application.dto.IdentityLoginRequest;
import dev.rynwllngtn.identity.application.dto.IdentityRegisterRequest;
import dev.rynwllngtn.identity.application.dto.IdentityResponse;
import dev.rynwllngtn.identity.application.dto.IdentityTokenResponse;
import dev.rynwllngtn.identity.application.exception.UnauthorizedException;
import dev.rynwllngtn.identity.application.service.IdentityService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/identities")
public class IdentityController {

    private final IdentityService identityService;

    @GetMapping(value = "/me")
    public ResponseEntity<IdentityResponse> me(@RequestHeader("Authorization") String tokenAwt) {
        if (tokenAwt == null || !tokenAwt.startsWith("Bearer ") || !tokenAwt.contains("_")) {
            throw new UnauthorizedException("Token ausente ou com formato inválido!");
        }
        String[] token = tokenAwt.replace("Bearer ", "").split("_");
        if (token.length != 2) {
            throw new UnauthorizedException("Token com formato inválido!");
        }
        String validToken = String.valueOf(UUID.nameUUIDFromBytes(token[0].getBytes()));
        if (!token[1].equals(validToken)) {
            throw new UnauthorizedException("Token não aceito!");
        }
        IdentityResponse response = identityService.findById(UUID.fromString(token[0]));
        return ResponseEntity.ok().body(response);
    }

    @PostMapping(value = "/login")
    public ResponseEntity<IdentityTokenResponse> loginRequest(@RequestBody @Valid IdentityLoginRequest request) {
        IdentityTokenResponse response = identityService.login(request);
        return ResponseEntity.ok().body(response);
    }

    @PostMapping(value = "/register")
    public ResponseEntity<IdentityResponse> registrationRequest(@RequestBody @Valid IdentityRegisterRequest request) {
        IdentityResponse response = identityService.register(request);
        URI uri = ServletUriComponentsBuilder
                  .fromCurrentRequest()
                  .path("/{id}").buildAndExpand(response.id())
                  .toUri();
        return ResponseEntity.created(uri).body(response);
    }

}