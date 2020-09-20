#!/bin/bash
imageName=track-my-diet:1.0
containerName=tmd

docker build -t $imageName -f Dockerfile  .

echo Delete old container...
docker rm -f $containerName

echo Run new container...
docker run -d -p 80:1024 --name $containerName $imageName