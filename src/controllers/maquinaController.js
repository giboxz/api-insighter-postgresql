import MaquinaDAO from "../dao/MaquinaDAO.js";

class MaquinaController {
  static listarMaquinas = (req, res) => {
    MaquinaDAO.listarMaquinas(res, req.user.id_industria);
  };

  static listarMaquinaPorId = (req, res) => {
    MaquinaDAO.listarMaquinaPorId(res, req.user.id_industria, req.params.id);
  };

  static cadastrarMaquina = (req, res) => {
    const maquina = req.body;
    MaquinaDAO.cadastrarMaquina(res, maquina);
  };

  static atualizarMaquina = (req, res) => {
    const maquina = req.body;
    MaquinaDAO.atualizarMaquina(
      res,
      maquina,
      req.user.id_industria,
      req.params.id
    );
  };

  static excluirMaquina = (req, res) => {
    MaquinaDAO.excluirMaquina(res, req.user.id_industria, req.params.id);
  };
}

export default MaquinaController;
