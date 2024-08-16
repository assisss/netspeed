// server.js
const express = require('express');
const NetworkSpeed = require('network-speed');
const app = express();
const port = 3001;
const cors = require('cors');
const testNetworkSpeed = new NetworkSpeed();

app.use(cors());

app.get('/d', async (req, res) => {
    const baseUrl = 'https://eu.httpbin.org/stream-bytes/500000';
    const fileSizeInBytes = 500000;
    try {
        const speed = await testNetworkSpeed.checkDownloadSpeed(baseUrl, fileSizeInBytes);
        console.log(speed);
        res.json(speed); // Send the response back to the client
    } catch (error) {
        res.status(500).send('Error measuring download speed');
    }
});

app.get('/u', async (req, res) => {
    const options = {
        hostname: 'httpbin.org',  // A reliable endpoint for testing
        port: 80,
        path: '/post',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const fileSizeInBytes = 2000000;  // Adjust file size as needed
    try {
        const speed = await testNetworkSpeed.checkUploadSpeed(options, fileSizeInBytes);
        console.log('Upload Speed:', speed);
        res.json(speed);  // Send the upload speed back to the client
    } catch (error) {
        console.error('Error measuring upload speed:', error);
        res.status(500).send('Error measuring upload speed');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
