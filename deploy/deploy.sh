#!/bin/bash

cd $HOME

source ./dockerrc

echo $DOCKER_PASS | sudo docker login --username $DOCKER_USER --password-stdin
sudo docker-compose pull lcapi
sudo docker-compose stop lcapi
sudo docker-compose rm -f lcapi
sudo docker-compose up -d
