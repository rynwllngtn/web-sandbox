package dev.rynwllngtn.identity.infrastructure.controller;

import dev.rynwllngtn.identity.application.dto.IdentityRequestDto;
import dev.rynwllngtn.identity.application.dto.IdentityResponseDto;
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
@RequestMapping(value = "/identity")
public class IdentityController {

    private final IdentityService identityService;

    @GetMapping(value = "/{id}")
    public ResponseEntity<IdentityResponseDto> findById(@PathVariable(value = "id") UUID uuid) {
        IdentityResponseDto responseDto = identityService.findById(uuid);
        return ResponseEntity.ok().body(responseDto);
    }

    @PostMapping
    public ResponseEntity<IdentityResponseDto> persist(@RequestBody @Valid IdentityRequestDto requestDto) {
        IdentityResponseDto responseDto = identityService.persist(requestDto);
        URI uri = ServletUriComponentsBuilder
                  .fromCurrentRequest()
                  .path("/{id}").buildAndExpand(responseDto.id())
                  .toUri();
        return ResponseEntity.created(uri).body(responseDto);
    }

}