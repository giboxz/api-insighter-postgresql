import express from "express";
import FuncionarioController from "../controllers/funcionarioController.js";

const router = express.Router();

router

  .get("/funcionario", FuncionarioController.listarFuncionario)
  .get("/funcionario/:id", FuncionarioController.listarFuncionarioPorId)
  .post("/funcionario", FuncionarioController.cadastrarFuncionario)
  .put("/funcionario/:id", FuncionarioController.atualizarFuncionario)
  .put("/desligarfuncionario/:id", FuncionarioController.desligarFuncionario)
  .delete("/funcionario/:id", FuncionarioController.excluirFuncionario);

export default router;
