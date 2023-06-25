import express from 'express'
import apiRouter from './Routes/api.js';

const app = express();
app.use('/',apiRouter)

app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});


export default app;