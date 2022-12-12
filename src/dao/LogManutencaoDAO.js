import client from "../config/connection.js";

class LogManutencaoDAO {
  static listarLogManutencao(res, id_industria) {
    const query = {
      text: "SELECT l.id, l.id_maquina, l.id_funcionario, l.descricao, l.data_update, l.status_manutencao FROM log_manutencao l JOIN maquina m ON l.id_maquina = m.id JOIN setor s ON m.id_setor = s.id WHERE s.id_industria = $1",
      values: [id_industria],
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
  }
  static listarLogManutencaoPorId(res, id_industria, id_log_manutencao) {
    const query = {
      text: "SELECT l.id, l.id_maquina, l.id_funcionario, l.descricao, l.data_update, l.status_manutencao FROM log_manutencao l JOIN maquina m ON l.id_maquina = m.id JOIN setor s ON m.id_setor = s.id WHERE s.id_industria = $1 AND l.id = $2",
      values: [id_industria, id_log_manutencao],
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
  }

  static cadastrarLogManutencao(res, log_manutencao) {
    const query = {
      text: "INSERT INTO log_manutencao(id_maquina, id_funcionario, descricao, data_update, status_manutencao) VALUES ($1, $2, $3, $4, $5);",
      values: [
        log_manutencao.id_maquina,
        log_manutencao.id_funcionario,
        log_manutencao.descricao,
        log_manutencao.data_update,
        log_manutencao.status_manutencao,
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
  }

  static atualizarLogManutencao(
    res,
    log_manutencao,
    id_industria,
    id_log_manutencao
  ) {
    const query = {
      text: "UPDATE log_manutencao l SET id_maquina = $1, id_funcionario = $2, descricao = $3, data_update = $4, status_manutencao = $5 FROM maquina m JOIN setor s ON m.id_setor = s.id WHERE m.id = l.id_maquina AND l.id = $6 AND s.id_industria = $7",
      values: [
        log_manutencao.id_maquina,
        log_manutencao.id_funcionario,
        log_manutencao.descricao,
        log_manutencao.data_update,
        log_manutencao.status_manutencao,
        id_log_manutencao,
        id_industria,
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
  }

  static excluirLogManutencao(res, id_industria, id_log_manutencao) {
    const query = {
      text: "DELETE FROM log_manutencao l USING maquina m, setor s WHERE l.id_maquina = m.id AND m.id_setor = s.id AND m.id = l.id_maquina AND l.id = $1 AND s.id_industria = $2",
      values: [id_log_manutencao, id_industria],
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
  }
}

export default LogManutencaoDAO;
