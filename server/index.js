const axios = require('axios');
const express = require('express');
const mongoose = require('mongoose');
const chalk = require('chalk');
const app = express();
const mongodPort = 27017;
const port = 5000;
const cors = require('cors');
const router = require('./routes/');
const beep = require('beepbeep')

app.use(cors());
app.use('/', router)
app.listen(port, () => console.log(`Listening on port: ${chalk.green(port)}`))

// Connect to MongoD
mongoose.connect(`mongodb://localhost:${mongodPort}/185`);
mongoose.connection.on('connected', () => {
  console.log('connected', () => {
      console.log(chalk.green(`connected to mongod on port: ${mongodPort}`))
  });
});

mongoose.connection.on('error', () => {
  console.log(chalk.red(`failed to connect to mongod on port: ${mongodPort}`));
  beep(1);
});