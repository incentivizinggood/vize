#!/bin/bash

echo "Running database(s)..."
sudo docker-compose \
    -f docker-compose.yml \
    up --build