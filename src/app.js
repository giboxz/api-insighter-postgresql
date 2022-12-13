import express from "express";
import cors from "cors";
import routes from "./routes/index.js";

const app = express();

app.use(express.json());

var corsOptions = {
    origin: 'http://localhost:5500',
    optionsSuccessStatus: 200
  }

app.use(cors(corsOptions));

routes(app);

export default app;
