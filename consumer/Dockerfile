FROM        gradle:7.4-jdk11-alpine AS build

WORKDIR     /home/gradle/src

# download dependencies
COPY        --chown=gradle:gradle build.gradle settings.gradle /home/gradle/src/
RUN         gradle clean build --no-daemon > /dev/null 2>&1 || true

# build source code
COPY        --chown=gradle:gradle . /home/gradle/src
RUN         gradle clean build -x test --no-daemon

FROM        openjdk:11-jre-slim

ARG         JVM_OPS
ENV         JVM_OPS=${JVM_OPS}

COPY        --from=build /home/gradle/src/build/libs/consumer-0.0.1-SNAPSHOT.jar app.jar
COPY        src/main/resources/application-deploy.properties application.properties

CMD         ["sh","-c","java $JVM_OPS -jar app.jar"]