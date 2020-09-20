#!/bin/bash
imageName=track-my-diet:1.0
containerName=tmd

sudo docker build -t $imageName -f Dockerfile  .

echo Delete old container...
sudo docker rm -f $containerName

echo Run new container...
sudo docker run -d -p 80:1024 --name $containerName $imageName