import express from "express";
import cors from "cors";
import routes from "./routes/index.js";

const app = express();

app.use(express.json());

app.use(cors({origin: ['http://127.0.0.1:5500', 'http://localhost:5500']}));

routes(app);

export default app;
