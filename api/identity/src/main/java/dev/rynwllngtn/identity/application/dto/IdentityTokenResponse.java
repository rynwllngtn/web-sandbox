package dev.rynwllngtn.identity.application.dto;

import java.util.UUID;

public record IdentityTokenResponse(
        String tokenAwt
) {
    public IdentityTokenResponse(UUID identityId) {
        String tokenAwt = identityId + "_" + UUID.nameUUIDFromBytes(identityId.toString().getBytes());
        this(tokenAwt);
    }
}