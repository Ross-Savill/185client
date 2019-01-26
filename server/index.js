const axios = require('axios');
const express = require('express');
const mongoose = require('mongoose');
const chalk = require('chalk');
const app = express();
const port = 5000;
const mongodPort = 27017;
const router = require('./routes/');
const cors = require('cors');
const beep = require('beepbeep');

// App stuff
app.use(express.json());
app.use(cors());
app.use('/', router)
app.listen(port, () => console.log(`[!] Listening on port: ${chalk.green(port)}`))

// Connect to MongoD
mongoose.connect(`mongodb://localhost:${mongodPort}/185`, { useNewUrlParser: true });
  mongoose.connection.on('connected', () => {
  console.log(`[!] Connected to MongoD on port: ${mongodPort}`);
});

mongoose.connection.on('error', () => {
  console.log(chalk.red(`[X] Failed to connect to MongoD on port: ${mongodPort}`));
  beep()
});
