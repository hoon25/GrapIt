#!bin/bash

cp /application.properties ./src/main/resources/application.properties
sudo docker-compose up --build -d