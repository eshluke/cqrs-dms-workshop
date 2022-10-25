FROM        gradle:7.4-jdk11-alpine AS build

WORKDIR     /home/gradle/src

COPY        --chown=gradle:gradle build.gradle settings.gradle /home/gradle/src/
RUN         gradle --no-daemon clean build

FROM        openjdk:11-jre-slim

COPY        --from=build /home/gradle/src/build/libs/dinerbot-0.0.1-SNAPSHOT.jar app.jar

CMD         ["sh","-c","java -jar app.jar"]
