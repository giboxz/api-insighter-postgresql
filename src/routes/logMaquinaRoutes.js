import express from "express";
import LogMaquinaController from "../controllers/logMaquinaController.js";

const router = express.Router();

router
  .get("/logmaquinas", LogMaquinaController.listarLogMaquinaComAnomalia)
  .get("/logsmaquinas", LogMaquinaController.listarLogMaquinas)
  .get("/logmaquinas/:id", LogMaquinaController.listarLogMaquinaPorId)
  .get("/logmaquinas/:id/:dataInicio/:dataFim", LogMaquinaController.listarLogMaquinaPorIdData)
  .post("/logmaquinas", LogMaquinaController.cadastrarLogMaquina);

export default router;
