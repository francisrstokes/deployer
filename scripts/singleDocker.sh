#!/usr/bin/env bash

echo removing the old image

docker rmi notphilips/"$APPNAME":latest -f

echo signing in
docker login -u "$DOCKER_USERNAME" -p "$DOCKER_PASSWORD"

echo pulling a new image
docker pull notphilips/"$APPNAME":latest

echo stopping the current container
docker stop "$APPNAME"-container

echo removing the current container
docker rm "$APPNAME"-container

echo running a new container
docker run $dockerizedEnv --name="$APPNAME"-container --restart=always -p $PORT:80 -d notphilips/"$APPNAME":latest

echo done
