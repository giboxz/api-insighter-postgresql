import express from "express";
import LogManutencaoController from "../controllers/logManutencaoController.js";

const router = express.Router();

router

  .get("/logmanutencao", LogManutencaoController.listarLogManutencao)
  .get("/logmanutencao/:id", LogManutencaoController.listarLogManutencaoPorId)
  .post("/logmanutencao", LogManutencaoController.cadastrarLogManutencao)
  .put("/logmanutencao/:id", LogManutencaoController.atualizarLogManutencao)
  .delete("/logmanutencao/:id", LogManutencaoController.excluirLogManutencao);

export default router;
