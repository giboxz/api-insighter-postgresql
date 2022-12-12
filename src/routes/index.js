import express from "express";
import industrias from "./industriaRoutes.js";
import logMaquinas from "./logMaquinaRoutes.js";
import maquinas from "./maquinasRoutes.js";
import logManutencoes from "./logManutencaoRoutes.js";
import setores from "./setorRoutes.js";
import funcionarios from "./funcionarioRoutes.js";

const routes = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).send({ nome: "Api Insighter" });
  });

  app.use(
    express.json(),
    industrias,
    logMaquinas,
    maquinas,
    logManutencoes,
    setores,
    funcionarios
  );
};

export default routes;
