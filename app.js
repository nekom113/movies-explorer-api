/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const router = require('./routes');
const { errorHandler } = require('./middlewares/error_handler');

const app = express();

const {
  DB_ADDRESS = 'mongodb://127.0.0.1:27017/bitfilmsdb',
  PORT = 3000,
} = process.env;

app.use(cors());

const start = async () => {
  try {
    await mongoose.connect(DB_ADDRESS, {});
  } catch (err) {
    console.error(`Catch ${err}`);
  }
};

start();
app.use('/', router);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, console.log(`Server is working on PORT: ${PORT}`));
