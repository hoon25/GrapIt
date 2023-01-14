#!/bin/bash
./gradlew clean build
./gradlew build

sudo docker-compose up --build -d
