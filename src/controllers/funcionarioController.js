import FuncionarioDAO from "../dao/funcionarioDAO.js";

class FuncionarioController {
  static listarFuncionario = (req, res) => {
    FuncionarioDAO.listarFuncionario(res, req.user.id_industria);
  };

  static listarFuncionarioPorId = (req, res) => {
    FuncionarioDAO.listarFuncionarioPorId(
      res,
      req.user.id_industria,
      req.params.id
    );
  };

  static cadastrarFuncionario = (req, res) => {
    const funcionario = req.body;
    FuncionarioDAO.cadastrarFuncionario(res, funcionario);
  };

  static atualizarFuncionario = (req, res) => {
    const funcionario = req.body;
    FuncionarioDAO.atualizarFuncionario(
      res,
      funcionario,
      req.user.id_industria,
      req.params.id
    );
  };

  static excluirFuncionario = (req, res) => {
    FuncionarioDAO.excluirFuncionario(
      res,
      req.user.id_industria,
      req.params.id
    );
  };

  static desligarFuncionario = (req, res) => {
    FuncionarioDAO.desligarFuncionario(
      res,
      req.body.data_saida,
      req.user.id_industria,
      req.params.id
    );
  };
}

export default FuncionarioController;
