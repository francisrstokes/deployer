#!/usr/bin/env bash

echo stopping current container
docker stop $APPNAME-container

echo removing current container
docker rm $APPNAME-container

echo running new container
docker run --name=$APPNAME-container --restart=always -p $PORT:80 -d notphilips/$APPNAME:latest

echo done
