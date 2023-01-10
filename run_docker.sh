#!/bin/bash
# Build image and add a descriptive tag
if docker build -t socialize .;
then
    # List docker images
    docker images
    docker run -d -p 3000:3000 socialize
    # debug docker
    # docker exec -it <container_id> sh
fi