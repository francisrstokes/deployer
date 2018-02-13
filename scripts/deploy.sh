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
docker load -i ./dist/moonshot.tar
echo done

# exports env variables from the .env file
sed -E -n 's/[^#]+/export &/ p' ./.env

echo composing
docker-compose -f ./dist/docker-compose.yml up -d --no-build
echo done
