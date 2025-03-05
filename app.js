import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';

const app = express();

import bodyParser from 'body-parser';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI,
    {serverSelectionTimeoutMS: 5000})
    .then(() => console.log(`Connected to MongoDB Server on ${process.env.MONGODB_URI}`))
    .catch(err => console.error(err));


import router from './routes.js';
app.use('/api', router);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => { console.log(`Server is running on http://localhost:${PORT}`) });