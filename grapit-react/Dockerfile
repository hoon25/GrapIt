# node
FROM node:14 as builder
# 경로 설정하기
WORKDIR /app
# package.json 워킹 디렉토리에 복사 (.은 설정한 워킹 디렉토리를 뜻함)
COPY package.json .
# 명령어 실행 (의존성 설치)
RUN npm install
# 현재 디렉토리의 모든 파일을 도커 컨테이너의 워킹 디렉토리에 복사한다.
COPY . /app
RUN npm run build


## nginx
FROM nginx:1.19.1-alpine

## conf
RUN rm /etc/nginx/sites-available/default
RUN rm /etc/nginx/sites-enabled/default
COPY /myapp.conf /etc/nginx/sites-available/myapp.conf
RUN ln -s /etc/nginx/sites-available/myapp.conf /etc/nginx/sites-enabled/myapp.conf

## cert
COPY /etc/nginx/certs/cert.pem /etc/nginx/certs/cert.pem
COPY /etc/nginx/certs/privkey.pem /etc/nginx/certs/privkey.pem

COPY --from=builder /app/build /app/build

CMD ["nginx", "-g", "daemon off;"]
