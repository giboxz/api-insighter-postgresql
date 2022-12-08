import express from "express";
import MaquinaController from "../controllers/maquinaController.js";

const router = express.Router();

router

  .get("/maquinas", MaquinaController.listarMaquinas)
  .get("/maquinas/:id", MaquinaController.listarMaquinaPorId)
  .post("/maquinas", MaquinaController.cadastrarMaquina)
  .put("/maquinas/:id", MaquinaController.atualizarMaquina)
  .delete("/maquinas/:id", MaquinaController.excluirMaquina);

export default router;
