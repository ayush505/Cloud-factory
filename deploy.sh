#!/bin/bash

set -e

cd /home/rails/apps/seller-services-marketplace

echo
echo "Checking out branch $REFERENCE..."
git reset --hard

git checkout $REFERENCE

git pull

echo
echo
rm .env || true
echo "DOMAIN=$DOMAIN" >> .env
echo "APP_DOMAIN=$APP_DOMAIN" >> .env


echo "Pulling config from github..."
wget $CONFIG_SERVER_URL/*/*/master/react-app.env -O ->> .env

if [ "$SPRING_PROFILES_ACTIVE" == "demo" ] || [ "$SPRING_PROFILES_ACTIVE" == "production" ]
then
    wget $CONFIG_SERVER_URL/*/*/master/react-keyless-production.env -O ->> .env
else
    wget $CONFIG_SERVER_URL/*/*/master/react-keyless-test.env -O ->> .env
fi

wget $CONFIG_SERVER_URL/*/*/master/marketplace.env -O ->> .env || true
wget $CONFIG_SERVER_URL/*/*/master/marketplace-${SPRING_PROFILES_ACTIVE}.env -O ->> .env || true

echo
echo "Getting client certificate to get keys"
cp /home/rails/ssl_kvs/kvs.client.crt .
cp /home/rails/ssl_kvs/kvs.client.key .

echo
echo "Building the react application of marketplace..."

if [ $(docker ps -f name=blue_marketplace -q) ]
then
    export NEW="green"
    export OLD="blue"
else
    export NEW="blue"
    export OLD="green"
fi

echo "Starting "$NEW" container"
docker-compose --compatibility --project-name=$NEW up --build -d

echo "Waiting..."
sleep 60s

echo "Stopping "$OLD" container"
docker-compose --project-name=$OLD stop

docker rm "$OLD"_marketplace_1 || true

docker rmi "$OLD"_marketplace || true

docker image prune -f || true
