import SetorDAO from "../dao/SetorDAO.js";

class SetorController {
  static listarSetor = (req, res) => {
    SetorDAO.listarSetor(res, req.user.id_industria);
  };

  static listarSetorPorId = (req, res) => {
    SetorDAO.listarSetorPorId(res, req.user.id_industria, req.params.id);
  };

  static cadastrarSetor = (req, res) => {
    const setor = req.body;
    SetorDAO.cadastrarSetor(res, setor);
  };

  static atualizarSetor = (req, res) => {
    const setor = req.body;
    SetorDAO.atualizarSetor(res, setor, req.params.id, req.user.id_industria);
  };

  static excluirSetor = (req, res) => {
    SetorDAO.excluirSetor(res, req.params.id, req.user.id_industria);
  };
}

export default SetorController;
