import express from "express";
import SetorController from "../controllers/setorController.js";
import { loginAuth } from "../middleware/loginAuth.js";

const router = express.Router();

router

  .get("/setor", loginAuth, SetorController.listarSetor)
  .get("/setor/:id", loginAuth, SetorController.listarSetorPorId)
  .post("/setor", loginAuth, SetorController.cadastrarSetor)
  .put("/setor/:id", loginAuth, SetorController.atualizarSetor)
  .delete("/setor/:id", loginAuth, SetorController.excluirSetor);

export default router;
