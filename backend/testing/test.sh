#!/bin/bash

# Install dependencies
npm run install
npm install express puppeteer multer

# Start server in the background
node ../server.js &
SERVER_PID=$!
sleep 3

# Run tests
curl -X POST http://localhost:3000/upload -F "htmlFile=@HW6_P3.html"
curl -X POST http://localhost:3000/convert
curl -X GET http://localhost:3000/download

# Stop the server by killing the process
kill $SERVER_PID

