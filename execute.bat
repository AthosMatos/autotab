@echo off
cd client
docker run -p 4080:80 -d autotabclient
cd..
cd server
docker run -p 8080:80 -d autotabserver

start "" http://localhost:4080/