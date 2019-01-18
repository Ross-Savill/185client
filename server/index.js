const axios = require('axios');
const express = require('express');
const mongoose = require('mongoose');
const chalk = require('chalk');
const app = express();
const Quagga = require('quagga');
const port = 5000;

app.get('/', (req,res) => res.send("185 API"));
app.post('/', (req, res) => res.send("Got a POST request"));
app.put('/', (req, res) => res.send("Got a PUT request"));
app.delete('/', (req, res) => res.send("Got a DELETE request"));

app.listen(port, () => console.log(`Listening on port: ${chalk.green(port)}`))

Quagga.decodeSingle({
    decoder: {
        readers: ["code_128_reader"] // List of active readers
    },
    locate: true, // try to locate the barcode in the image
    // You can set the path to the image in your server
    // or using it's base64 data URI representation data:image/jpg;base64, + data
    src: '/barcode_image.jpg'
}, function(result){
    if(result.codeResult) {
        console.log("result", result.codeResult.code);
    } else {
        console.log("not detected");
    }
});
