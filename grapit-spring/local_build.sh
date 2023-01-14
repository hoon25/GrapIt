#!/bin/bash

./gradlew clean build
./gradlew build

cp /application.properties ./src/main/resources/application.properties
sudo docker-compose up --build -d