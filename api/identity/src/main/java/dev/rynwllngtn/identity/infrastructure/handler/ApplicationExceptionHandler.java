package dev.rynwllngtn.identity.infrastructure.handler;

import dev.rynwllngtn.identity.application.exception.ResourceNotFoundException;
import dev.rynwllngtn.identity.application.exception.UnauthorizedException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.Instant;

@RestControllerAdvice
public class ApplicationExceptionHandler {

    @ExceptionHandler(value = ResourceNotFoundException.class)
    public ProblemDetail resourceNotFound(ResourceNotFoundException e) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(
                HttpStatus.BAD_REQUEST, e.getMessage()
        );
        problemDetail.setProperty("timestamp", Instant.now());
        return problemDetail;
    }

    @ExceptionHandler(value = UnauthorizedException.class)
    public ProblemDetail unauthorized(UnauthorizedException e) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(
                HttpStatus.UNAUTHORIZED, e.getMessage()
        );
        problemDetail.setProperty("timestamp", Instant.now());
        return problemDetail;
    }

}