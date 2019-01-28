const axios = require('axios');
const express = require('express');
const mongoose = require('mongoose');
const chalk = require('chalk');
const app = express();
<<<<<<< HEAD
const mongodPort = 27017;
const port = 5000;
const cors = require('cors');
const router = require('./routes/');
const beep = require('beepbeep')

app.use(cors());
app.use(express.json());
app.use('/', router)
app.listen(port, () => console.log(`Listening on port: ${chalk.green(port)}`))

// Connect to MongoD
mongoose.connect(`mongodb://localhost:${mongodPort}/185`);
mongoose.connection.on('connected', () => {
  console.log('connected', () => {
      console.log(chalk.green(`connected to mongod on port: ${mongodPort}`))
  });
=======
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
>>>>>>> 40576ab0d3d20e79a0256709fd1539a7651815d6
});

mongoose.connection.on('error', () => {
  console.log(chalk.red(`failed to connect to mongod on port: ${mongodPort}`));
  beep(1);
});