import IndustriaDAO from "../dao/IndustriaDAO.js";

class IndustriaController {
  static listarIndustrias = (req, res) => {
    IndustriaDAO.listarIndustrias(res, req.user.id_industria);
  };

  static listarIndustriasID = (req, res) => {
    IndustriaDAO.listarIndustriasID(res, req.params.id);
  };

  static cadastrarIndustria = async (req, res) => {
    const industria = req.body;
    IndustriaDAO.cadastrarIndustria(res, industria);
  };

  static atualizarIndustria = async (req, res) => {
    const industria = req.body;
    IndustriaDAO.atualizarIndustria(res, industria, req.params.id);
  };

  static deletarIndustria = (req, res) => {
    IndustriaDAO.deletarIndustria(res, req.params.id);
  };

  static loginIndustria = async (req, res) => {
    IndustriaDAO.loginIndustria(res, req.body.email, req.body.senha);
  };
}

export default IndustriaController;
