import client from "../config/connection.js";

class LogManutencaoController {
  static listarLogManutencao = (req, res) => {
    const query = {
      text: "SELECT * FROM log_manutencao",
      values: [],
    };

    client.query(query, (err, result) => {
      if (!err) {
        res.status(200).send(result.rows);
      } else {
        res
          .status(500)
          .send(
            "Algo de errado, não foi possivel listar os Logs de Manutenção."
          );
      }
    });
    client.end;
  };

  static listarLogManutencaoPorId = (req, res) => {
    const query = {
      text: "SELECT * FROM log_manutencao WHERE id = $1",
      values: [req.params.id],
    };

    client.query(query, (err, result) => {
      if (!err) {
        res.status(200).send(result.rows);
      } else {
        res
          .status(500)
          .send("Algo de errado, não foi possivel listar o Log de Manutenção.");
      }
    });
    client.end;
  };

  static cadastrarLogManutencao = (req, res) => {
    const user = req.body;

    const query = {
      text: "INSERT INTO log_manutencao(id_maquina, id_funcionario, descricao, data_update, status_manutencao) VALUES ($1, $2, $3, $4, $5);",
      values: [
        user.id_maquina,
        user.id_funcionario,
        user.descricao,
        user.data_update,
        user.status_manutencao,
      ],
    };

    client.query(query, (err, result) => {
      if (!err) {
        res.status(200).send("Log de Manutenção cadastrado com sucesso.");
      } else {
        res
          .status(500)
          .send(
            "Algo de errado, não foi possivel cadastrar o Log de Manutenção."
          );
      }
    });
    client.end;
  };

  static atualizarLogManutencao = (req, res) => {
    const user = req.body;

    const query = {
      text: "UPDATE log_manutencao SET id_maquina = $1, id_funcionario = $2, descricao = $3, data_update = $4, status_manutencao = $5 WHERE id = $6;",
      values: [
        user.id_maquina,
        user.id_funcionario,
        user.descricao,
        user.data_update,
        user.status_manutencao,
        req.params.id,
      ],
    };

    client.query(query, (err, result) => {
      if (!err) {
        res.status(200).send("Log de Manutenção atualizado com sucesso.");
      } else {
        res
          .status(500)
          .send(
            "Algo de errado, não foi possivel atualizar o Log de Manutenção."
          );
      }
    });
    client.end;
  };

  static excluirLogManutencao = (req, res) => {
    const query = {
      text: "DELETE FROM log_manutencao WHERE id = $1",
      values: [req.params.id],
    };

    client.query(query, (err, result) => {
      if (!err) {
        res.status(200).send("Log de Manutenção deletado com sucesso.");
      } else {
        res
          .status(500)
          .send(
            "Algo de errado, não foi possivel deletar o Log de Manutenção."
          );
      }
    });
    client.end;
  };
}

export default LogManutencaoController;
