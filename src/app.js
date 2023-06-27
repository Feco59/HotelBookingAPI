import express from 'express'
import apiRouter from './Routes/api.js';

const app = express();
app.use('/',apiRouter)

export default app;