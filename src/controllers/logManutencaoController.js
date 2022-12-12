import LogManutencaoDAO from "../dao/LogManutencaoDAO.js";

class LogManutencaoController {
  static listarLogManutencao = (req, res) => {
    LogManutencaoDAO.listarLogManutencao(res, req.user.id_industria);
  };

  static listarLogManutencaoPorId = (req, res) => {
    LogManutencaoDAO.listarLogManutencaoPorId(
      res,
      req.user.id_industria,
      req.params.id
    );
  };

  static cadastrarLogManutencao = (req, res) => {
    const log_manutencao = req.body;
    LogManutencaoDAO.cadastrarLogManutencao(res, log_manutencao);
  };

  static atualizarLogManutencao = (req, res) => {
    const log_manutencao = req.body;
    LogManutencaoDAO.atualizarLogManutencao(
      res,
      log_manutencao,
      req.user.id_industria,
      req.params.id
    );
  };

  static excluirLogManutencao = (req, res) => {
    LogManutencaoDAO.excluirLogManutencao(
      res,
      req.user.id_industria,
      req.params.id
    );
  };
}

export default LogManutencaoController;
