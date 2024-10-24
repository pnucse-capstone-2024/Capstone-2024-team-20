FROM gradle:8.8-jdk17 AS build
COPY --chown=gradle:gradle ./ /home/gradle/project
WORKDIR /home/gradle/project
RUN gradle build -x test --no-daemon

FROM openjdk:17-jdk-slim
COPY --from=build /home/gradle/project/build/libs/demo-0.0.1-SNAPSHOT.jar /app/app.jar

# COPY k8s-ca.cert /root/k8s-ca.cert
# COPY config /root/.kube/config


# COPY ./templates/*.yaml /root/templates/

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/app.jar"]