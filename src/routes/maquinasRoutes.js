import express from "express";
import MaquinaController from "../controllers/maquinaController.js";
import { loginAuth } from "../middleware/loginAuth.js";

const router = express.Router();

router

  .get("/maquinas", loginAuth, MaquinaController.listarMaquinas)
  .get("/maquinas/:id", loginAuth, MaquinaController.listarMaquinaPorId)
  .post("/maquinas", loginAuth, MaquinaController.cadastrarMaquina)
  .put("/maquinas/:id", loginAuth, MaquinaController.atualizarMaquina)
  .delete("/maquinas/:id", loginAuth, MaquinaController.excluirMaquina);

export default router;
