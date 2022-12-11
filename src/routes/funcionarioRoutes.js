import express from "express";
import FuncionarioController from "../controllers/funcionarioController.js";
import { loginAuth } from "../middleware/loginAuth.js";

const router = express.Router();

router

  .get("/funcionario", loginAuth, FuncionarioController.listarFuncionario)
  .get("/funcionario/:id", loginAuth, FuncionarioController.listarFuncionarioPorId)
  .post("/funcionario", loginAuth, FuncionarioController.cadastrarFuncionario)
  .put("/funcionario/:id", loginAuth, FuncionarioController.atualizarFuncionario)
  .put("/desligarfuncionario/:id", loginAuth, FuncionarioController.desligarFuncionario)
  .delete("/funcionario/:id", loginAuth, FuncionarioController.excluirFuncionario);

export default router;
