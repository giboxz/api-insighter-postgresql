import client from "../config/connection.js";

class LogManutencaoController {
  static listarLogManutencao = (req, res) => {
    client.query(`SELECT * FROM log_manutencao`, (err, result) => {
      if (!err) {
        res.status(200).send(result.rows);
      } else {
        res.status(500).send("Algo de errado");
      }
    });
    client.end;
  };

  static listarLogManutencaoPorId = (req, res) => {
    client.query(
      `SELECT * FROM log_manutencao WHERE id = ${req.params.id}`,
      (err, result) => {
        if (!err) {
          res.send(result.rows);
        }
      }
    );
    client.end;
  };

  static cadastrarLogManutencao = (req, res) => {
    const user = req.body;
    let conteudoQuery = `INSERT INTO log_manutencao(id_maquina, id_funcionario, descricao, status)
                        VALUES  (${user.id_maquina}, ${user.id_funcionario}, '${user.descricao}', '${user.status}');`;

    client.query(conteudoQuery, (err, result) => {
      if (!err) {
        res.send("Industria cadastrada com sucesso.");
      } else {
        console.log(err.message);
      }
    });
    client.end;
  };

  static atualizarLogManutencao = (req, res) => {
    const user = req.body;

    let conteudoQuery = `UPDATE log_manutencao SET id_maquina = ${user.id_maquina}, id_funcionario = '${user.id_funcionario}', descricao = '${user.descricao}', status = '${user.status}' WHERE id = ${req.params.id};`;

    client.query(conteudoQuery, (err, result) => {
      if (!err) {
        res.send("Industria atualizada com sucesso.");
      } else {
        console.log(err.message);
      }
    });
    client.end;
  };

  static excluirLogManutencao = (req, res) => {
    let conteudoQuery = `DELETE FROM log_manutencao WHERE id = ${req.params.id}`;

    client.query(conteudoQuery, (err, result) => {
      if (!err) {
        res.send("Industria deletada com sucesso.");
      } else {
        console.log(err.message);
      }
    });
    client.end;
  };
}

export default LogManutencaoController;
