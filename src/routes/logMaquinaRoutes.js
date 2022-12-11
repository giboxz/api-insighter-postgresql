import express from "express";
import LogMaquinaController from "../controllers/logMaquinaController.js";
import { loginAuth } from "../middleware/loginAuth.js";

const router = express.Router();

router
  .get("/logmaquinas", loginAuth, LogMaquinaController.listarLogMaquinaComAnomalia)
  .get("/logsmaquinas", loginAuth, LogMaquinaController.listarLogMaquinas)
  .get("/logmaquinas/:id", loginAuth, LogMaquinaController.listarLogMaquinaPorId)
  .get("/logmaquinas/:id/:dataInicio/:dataFim", loginAuth, LogMaquinaController.listarLogMaquinaPorIdData)
  .post("/logmaquinas", loginAuth, LogMaquinaController.cadastrarLogMaquina);

export default router;
