import client from "../config/connection.js";

class LogMaquinaController {
  static listarLogMaquinas = (req, res) => {
    console.log(req.user.id_industria)
    const query = {
      text: "SELECT l.id, l.id_maquina, l.data_hr, l.temperatura, l.ruido, l.vibracao, l.anomalia FROM log_maquina l JOIN maquina m ON l.id_maquina = m.id JOIN setor s ON m.id_setor = s.id WHERE s.id_industria = $1",
      values: [req.user.id_industria],
    };

    client.query(query, (err, result) => {
      if (!err) {
        res.status(200).send(result.rows);
      } else {
        res
          .status(500)
          .send("Algo de errado, não foi possivel listar os Logs de maquina.");
      }
    });
    client.end;
  };

  static listarLogMaquinaPorId = (req, res) => {
    const query = {
      text: "SELECT l.id, l.id_maquina, l.data_hr, l.temperatura, l.ruido, l.vibracao, l.anomalia FROM log_maquina l JOIN maquina m ON l.id_maquina = m.id JOIN setor s ON m.id_setor = s.id WHERE s.id_industria = $1 AND l.id_maquina = $2",
      values: [req.user.id_industria, req.params.id],
    };

    client.query(query, (err, result) => {
      if (!err) {
        res.status(200).send(result.rows);
      } else {
        res
          .status(500)
          .send("Algo de errado, não foi possivel listar o Log de maquina.");
      }
    });
    client.end;
  };

  static listarLogMaquinaPorIdData = (req, res) => {
    const query = {
      text: "SELECT l.id, l.id_maquina, l.data_hr, l.temperatura, l.ruido, l.vibracao, l.anomalia FROM log_maquina l JOIN maquina m ON l.id_maquina = m.id JOIN setor s ON m.id_setor = s.id WHERE s.id_industria = $1 AND l.id_maquina = $2 AND data_hr >= $3 AND data_hr < $4;",
      values: [req.user.id_industria, req.params.id, req.params.dataInicio, req.params.dataFim],
    };

    client.query(query, (err, result) => {
      if (!err) {
        res.status(200).send(result.rows);
      } else {
        res
          .status(500)
          .send("Algo de errado, não foi possivel listar o Log de maquina.");
      }
    });
    client.end;
  };

  static listarLogMaquinaComAnomalia = async (req, res) => {
    const query = {
      text: "SELECT l2.id, l2.id_maquina, l2.data_hr, l2.temperatura, l2.ruido, l2.vibracao, l2.anomalia FROM log_maquina AS l2 JOIN (SELECT max(id) AS id, id_maquina, max(data_hr) FROM log_maquina GROUP BY id_maquina) AS l1 ON l2.id = l1.id JOIN maquina m ON l2.id_maquina = m.id JOIN setor s ON m.id_setor = s.id WHERE s.id_industria = $1 AND l2.anomalia = 'TRUE'",
      values: [req.user.id_industria],
    };

    client.query(query, (err, result) => {
      if (!err) {
        res.status(200).send(result.rows);
      } else {
        res
          .status(500)
          .send(
            "Algo de errado, não foi possivel listar o Log de maquinas com anomalia."
          );
      }
    });
    client.end;
  };

  static cadastrarLogMaquina = (req, res) => {
    const user = req.body;

    const query = {
      text: "INSERT INTO log_maquina(id_maquina, data_hr, temperatura, ruido, vibracao, anomalia) VALUES ($1, $2, $3, $4, $5, $6);",
      values: [
        user.id_maquina,
        user.data_hr,
        user.temperatura,
        user.ruido,
        user.vibracao,
        user.anomalia,
      ],
    };

    client.query(query, (err, result) => {
      if (!err) {
        res.status(200).send("Log de Maquina cadastrado com sucesso.");
      } else {
        res
          .status(500)
          .send("Algo de errado, não foi possivel cadastrar o Log de maquina.");
      }
    });
    client.end;
  };
}

export default LogMaquinaController;
