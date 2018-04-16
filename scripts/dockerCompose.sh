#!/usr/bin/env bash
set -e

mkdir -p ./dist

echo downloading files...
aws s3 sync s3://health-works ./dist/
echo done

echo Extracting files...
tar xvzf ./dist/moonshot-docker.tar.gz -C ./dist
echo done

echo loading moonshot
docker rmi health-works/moonshot -f
docker load -i ./dist/moonshot.tar
echo done

echo compose down
docker-compose $dockerizedEnv -f ./dist/docker-compose.yml down

echo compose up
docker-compose $dockerizedEnv -f ./dist/docker-compose.yml up -d --no-build --force-recreate
echo done
