#!/bin/bash

cd $HOME

. lcapirc

sudo $(aws ecr get-login --region us-east-1)
sudo docker-compose pull lcapi
sudo docker-compose stop lcapi
sudo docker-compose rm -f lcapi
sudo docker-compose up -d
