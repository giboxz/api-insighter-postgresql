import express from "express";
import IndustriaController from "../controllers/industriaController.js";

const router = express.Router();

router
  .get("/industrias", IndustriaController.listarIndustrias)
  .get("/industrias/:id", IndustriaController.listarIndustriasID)
  .get("/loginindustria", IndustriaController.loginIndustria)
  .post("/industrias", IndustriaController.cadastrarIndustria)
  .put("/industrias/:id", IndustriaController.atualizarIndustria)
  .delete("/industrias/:id", IndustriaController.deletarIndustria)

export default router;
