#!/bin/bash
# Install dependencies and build both client and server
cd client && npm install && npm run build
cd ../server && npm install