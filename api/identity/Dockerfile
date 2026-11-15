FROM maven:3.9.14-eclipse-temurin-25-alpine AS builder

WORKDIR /app

COPY pom.xml .
COPY identity/pom.xml ./identity/

RUN mvn dependency:go-offline

COPY identity/src ./identity/src

RUN mvn clean package -DskipTests -pl identity -am



FROM eclipse-temurin:25-jre-alpine

WORKDIR /app

COPY --from=builder /app/identity/target/*.jar identity.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "identity.jar"]