# Voting System Backend

## Contribution

### Prerequisites

1. IDE
   - IntelliJ IDEA; or
   - Eclipse

2. Java 11

3. Maven 3.8.6
   - Instruction: https://www.baeldung.com/install-maven-on-windows-linux-mac
   - Installation on Mac: http://harindern.blogspot.com/2014/04/maven-on-mac.html

### Run the Application

```
./mvnw spring-boot:run
```

Now run the service with curl (in a separate terminal window), by running the following command (shown with its output):
```
$ curl localhost:8080
Greetings from Spring Boot!
```

### API documentation
https://app.swaggerhub.com/templates-docs/BEIHAOZHOU/Voting-System/1.0.0

**Raw file is openapi.yml**

References:
1. https://spring.io/guides/gs/spring-boot/
2. https://www.mongodb.com/compatibility/spring-boot