import express from "express";
import LogManutencaoController from "../controllers/logManutencaoController.js";
import { loginAuth } from "../middleware/loginAuth.js";

const router = express.Router();

router

  .get("/logmanutencao", loginAuth, LogManutencaoController.listarLogManutencao)
  .get("/logmanutencao/:id", loginAuth, LogManutencaoController.listarLogManutencaoPorId)
  .post("/logmanutencao", loginAuth, LogManutencaoController.cadastrarLogManutencao)
  .put("/logmanutencao/:id", loginAuth, LogManutencaoController.atualizarLogManutencao)
  .delete("/logmanutencao/:id", loginAuth, LogManutencaoController.excluirLogManutencao);

export default router;
