import client from "../config/connection.js";

class MaquinaController {
  static listarMaquinas = (req, res) => {
    const query = {
      text: "SELECT m.id, m.id_setor, m.nome AS nome_maquina, m.temperatura_min, m.temperatura_max, m.vibracao_min, m.vibracao_max, m.ruido_min, m.ruido_max, m.status FROM maquina m JOIN setor s ON m.id_setor = s.id WHERE m.status = 'TRUE' AND s.id_industria = $1",
      values: [req.user.id_industria],
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
  };

  static listarMaquinaPorId = (req, res) => {
    const query = {
      text: "SELECT m.id, m.id_setor, m.nome AS nome_maquina, m.temperatura_min, m.temperatura_max, m.vibracao_min, m.vibracao_max, m.ruido_min, m.ruido_max, m.status FROM maquina m JOIN setor s ON m.id_setor = s.id WHERE m.status = 'TRUE' AND s.id_industria = $1 AND m.id = $2",
      values: [req.user.id_industria, req.params.id],
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
  };

  static cadastrarMaquina = (req, res) => {
    const user = req.body;

    const query = {
      text: "INSERT INTO maquina(id_setor, nome, temperatura_max, temperatura_min, ruido_max, ruido_min, vibracao_max, vibracao_min, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);",
      values: [
        user.id_setor,
        user.nome,
        user.temperatura_max,
        user.temperatura_min,
        user.ruido_max,
        user.ruido_min,
        user.vibracao_max,
        user.vibracao_min,
        user.status,
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
  };

  static atualizarMaquina = (req, res) => {
    const user = req.body;

    const query = {
      text: "UPDATE maquina m SET id_setor = $1, nome = $2, temperatura_max = $3, temperatura_min = $4, ruido_max = $5, ruido_min = $6, vibracao_max = $7, vibracao_min = $8, status = $9 FROM setor s WHERE s.id = m.id_setor AND s.id_industria = $10 AND m.id = $11;",
      values: [
        user.id_setor,
        user.nome,
        user.temperatura_max,
        user.temperatura_min,
        user.ruido_max,
        user.ruido_min,
        user.vibracao_max,
        user.vibracao_min,
        user.status,
        req.user.id_industria,
        req.params.id,
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
  };

  static excluirMaquina = (req, res) => {
    const query = {
      text: "UPDATE maquina m SET status = 'FALSE' FROM setor s WHERE s.id = m.id_setor AND s.id_industria = $1 AND m.id = $2",
      values: [req.user.id_industria, req.params.id],
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
  };
}

export default MaquinaController;
