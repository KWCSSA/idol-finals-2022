# Voting System Backend

## Contribution

### Prerequisites

1. IDE

   - IntelliJ IDEA; or
   - Eclipse

2. Java 11

3. Maven 3.8.6
   - Instruction1: https://www.baeldung.com/install-maven-on-windows-linux-mac
   - Instruction2(if not working for Win10 on Instruction1): https://mkyong.com/maven/how-to-install-maven-in-windows/
   - Installation on Mac: http://harindern.blogspot.com/2014/04/maven-on-mac.html

### Run the Application

Install the plugin: https://projectlombok.org/

```
./mvnw spring-boot:run
```

Now run the service with curl (in a separate terminal window), by running the following command (shown with its output):

```
$ curl ec2-3-231-161-68.compute-1.amazonaws.com:8080
Greetings from KWCSSA Voting System!
```

### API documentation

- Raw file is openapi.yml

- Documentation: https://app.swaggerhub.com/templates-docs/BEIHAOZHOU/Voting-System

References:

1. https://spring.io/guides/gs/spring-boot/
2. https://www.mongodb.com/compatibility/spring-boot
3. https://www.bezkoder.com/spring-boot-mongodb-crud
