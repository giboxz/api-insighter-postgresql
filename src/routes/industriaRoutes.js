import express from "express";
import IndustriaController from "../controllers/industriaController.js";
import { loginAuth } from "../middleware/loginAuth.js";

const router = express.Router();

router
  .get("/industrias", loginAuth, IndustriaController.listarIndustrias)
  .get("/industrias/:id", loginAuth, IndustriaController.listarIndustriasID)
  .post("/loginindustria", IndustriaController.loginIndustria)
  .post("/industrias", IndustriaController.cadastrarIndustria)
  .put("/industrias/:id", loginAuth, IndustriaController.atualizarIndustria)
  .delete("/industrias/:id", loginAuth, IndustriaController.deletarIndustria);

export default router;
