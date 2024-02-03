@echo off
cd client
start yarn start
cd..
cd server
start python server.py
