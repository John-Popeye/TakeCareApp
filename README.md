# TakeCareApp
University Project 

How to start:

Project Java Version: Java 17

1. Run docker compose up on docker-config/docker-compose.yaml, this will start keycloack authentication service together with mongdoDB and mySQL instances
2. After succesful start of images, go to localhost:8069 -> administration console, login using admin/admin credentials
3. Click on combobox on left with 'master' value, and select create realm
4. Click on Browse and import realm-export.json from docker-config project
5. Run spring boot applications (mvn spring-boot:run) in order
configserver -> eurekaserver -> gatewayserver -> notificationservice -> postservice
6. Go to client and run ng serve
7. Application is running on localhost:4200
