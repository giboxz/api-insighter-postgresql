import LogMaquinaDAO from "../dao/LogMaquinaDAO.js";

class LogMaquinaController {
  static listarLogMaquinas = (req, res) => {
    LogMaquinaDAO.listarLogMaquinas(res, req.user.id_industria);
  };

  static listarLogMaquinaPorId = (req, res) => {
    LogMaquinaDAO.listarLogMaquinaPorId(
      res,
      req.user.id_industria,
      req.params.id
    );
  };

  static listarLogMaquinaPorIdData = (req, res) => {
    LogMaquinaDAO.listarLogMaquinaPorIdData(
      res,
      req.user.id_industria,
      req.params.id,
      req.params.dataInicio,
      req.params.dataFim
    );
  };

  static listarLogMaquinaComAnomalia = async (req, res) => {
    LogMaquinaDAO.listarLogMaquinaComAnomalia(res, req.user.id_industria);
  };

  static cadastrarLogMaquina = (req, res) => {
    const log_maquina = req.body;
    LogMaquinaDAO.cadastrarLogMaquina(res, log_maquina);
  };
}

export default LogMaquinaController;
