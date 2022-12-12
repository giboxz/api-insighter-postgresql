import client from "../config/connection.js";

class MaquinaDAO {
  static listarMaquinas(res, id_industria) {
    const query = {
      text: "SELECT m.id, m.id_setor, m.nome AS nome_maquina, m.temperatura_min, m.temperatura_max, m.vibracao_min, m.vibracao_max, m.ruido_min, m.ruido_max, m.status FROM maquina m JOIN setor s ON m.id_setor = s.id WHERE m.status = 'TRUE' AND s.id_industria = $1",
      values: [id_industria],
    };

    client.query(query, (err, result) => {
      if (!err) {
        res.status(200).send(result.rows);
      } else {
        res
          .status(500)
          .send("Algo de errado, não foi possivel listar as maquinas.");
      }
    });
    client.end;
  }

  static listarMaquinaPorId(res, id_industria, id_maquina) {
    const query = {
      text: "SELECT m.id, m.id_setor, m.nome AS nome_maquina, m.temperatura_min, m.temperatura_max, m.vibracao_min, m.vibracao_max, m.ruido_min, m.ruido_max, m.status FROM maquina m JOIN setor s ON m.id_setor = s.id WHERE m.status = 'TRUE' AND s.id_industria = $1 AND m.id = $2",
      values: [id_industria, id_maquina],
    };

    client.query(query, (err, result) => {
      if (!err) {
        res.status(200).send(result.rows);
      } else {
        res
          .status(500)
          .send("Algo de errado, não foi possivel listar a maquina.");
      }
    });
    client.end;
  }

  static cadastrarMaquina(res, maquina) {
    const query = {
      text: "INSERT INTO maquina(id_setor, nome, temperatura_max, temperatura_min, ruido_max, ruido_min, vibracao_max, vibracao_min, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);",
      values: [
        maquina.id_setor,
        maquina.nome,
        maquina.temperatura_max,
        maquina.temperatura_min,
        maquina.ruido_max,
        maquina.ruido_min,
        maquina.vibracao_max,
        maquina.vibracao_min,
        maquina.status,
      ],
    };

    client.query(query, (err, result) => {
      if (!err) {
        res.status(200).send("Maquina cadastrada com sucesso.");
      } else {
        res
          .status(500)
          .send("Algo de errado, não foi possivel cadastrar a maquina.");
      }
    });
    client.end;
  }

  static atualizarMaquina(res, maquina, id_industria, id_maquina) {
    const query = {
      text: "UPDATE maquina m SET id_setor = $1, nome = $2, temperatura_max = $3, temperatura_min = $4, ruido_max = $5, ruido_min = $6, vibracao_max = $7, vibracao_min = $8, status = $9 FROM setor s WHERE s.id = m.id_setor AND s.id_industria = $10 AND m.id = $11;",
      values: [
        maquina.id_setor,
        maquina.nome,
        maquina.temperatura_max,
        maquina.temperatura_min,
        maquina.ruido_max,
        maquina.ruido_min,
        maquina.vibracao_max,
        maquina.vibracao_min,
        maquina.status,
        id_industria,
        id_maquina,
      ],
    };

    client.query(query, (err, result) => {
      if (!err) {
        res.status(200).send("Maquina atualizada com sucesso.");
      } else {
        res
          .status(500)
          .send("Algo de errado, não foi possivel atualizar a maquina.");
      }
    });
    client.end;
  }

  static excluirMaquina(res, id_industria, id_maquina) {
    const query = {
      text: "UPDATE maquina m SET status = 'FALSE' FROM setor s WHERE s.id = m.id_setor AND s.id_industria = $1 AND m.id = $2",
      values: [id_industria, id_maquina],
    };

    client.query(query, (err, result) => {
      if (!err) {
        res.status(200).send("Maquina deletada com sucesso.");
      } else {
        res
          .status(500)
          .send("Algo de errado, não foi possivel deletar a maquina.");
      }
    });
    client.end;
  }
}

export default MaquinaDAO;
