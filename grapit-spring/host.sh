cd docker
docker-compose up -d
cd ..
echo "###################"
echo "mysql 서버 ON"
echo "###################"

pkill java
./gradlew build
nohup java -jar build/libs/springSocket-0.0.1-SNAPSHOT.jar &
#docker rm -f pgi-was
#docker build -f ./Dockerfile -t pgi-was-image .
#docker run -itd -p 8080:8080 --name pgi-was pgi-was-image
echo "###################"
echo "springboot 서버 ON"
echo "###################"


cd ../grapit-react
#cp ./package_server.json ./package.json
pkill node
npm install
nohup npm start &
#docker rm -f pgi-web
#docker build -f ./Dockerfile -t pgi-web-image .
#docker run -itd -p 3000:3000 --add-host host.docker.internal:host-gateway --name pgi-web pgi-web-image
#cp ./package_local.json ./package.json
cd ./springSocket
echo "###################"
echo "react 서버 ON"
echo "###################"