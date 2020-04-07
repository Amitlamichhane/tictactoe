#!/bin/bash 
python backend.py &
nodemon ./client server
