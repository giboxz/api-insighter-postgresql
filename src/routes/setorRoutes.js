import express from "express";
import SetorController from "../controllers/setorController.js";

const router = express.Router();

router

  .get("/setor", SetorController.listarSetor)
  .get("/setor/:id", SetorController.listarSetorPorId)
  .post("/setor", SetorController.cadastrarSetor)
  .put("/setor/:id", SetorController.atualizarSetor)
  .delete("/setor/:id", SetorController.excluirSetor);

export default router;
