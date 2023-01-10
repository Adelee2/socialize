#!/bin/bash
dockerpath=socialize

# Authenticate & tag
echo "Docker ID and Image: $dockerpath"
docker tag socialize adelee2/$dockerpath

# Log into the Dockerhub from your local terminal
docker login
# Push image to a docker repository
docker push adelee2/$dockerpath