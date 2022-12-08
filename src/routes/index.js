import express from "express";
import industrias from "./industriaRoutes.js"
import logMaquinas from "./logMaquinaRoutes.js";
import maquinas from "./maquinasRoutes.js";

const routes = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).send({ nome: "Api Insighter" });
  });

  app.use(express.json(), industrias, logMaquinas, maquinas);
};

export default routes;
