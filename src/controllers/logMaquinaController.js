import client from "../config/connection.js";

class LogMaquinaController {
  static listarLogMaquinas = (req, res) => {
    const query = {
      text: "SELECT * FROM log_maquina",
      values: [],
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
      text: "SELECT * FROM log_maquina WHERE id_maquina = $1",
      values: [req.params.id],
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
      text: "SELECT * FROM log_maquina WHERE id_maquina = $1 AND data_hr >= $2 AND data_hr < $3;",
      values: [req.params.id, req.params.dataInicio, req.params.dataFim],
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
      text: "SELECT * FROM log_maquina AS l2 JOIN (SELECT max(id) AS id, id_maquina, max(data_hr) FROM log_maquina GROUP BY id_maquina) AS l1 ON l2.id = l1.id WHERE anomalia = 'TRUE'",
      values: [],
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
