/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');

const app = express();

const { PORT = 3000 } = process.env;

const start = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb', {});
  } catch (err) {
    console.error(`Catch ${err}`);
  }
};

start();
app.use('/', router);

app.listen(PORT, console.log(`Server is working on PORT: ${PORT}`));
