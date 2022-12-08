import client from "../config/connection.js";

class LogMaquinaController {
  static listarLogMaquinas = (req, res) => {
    client.query(`SELECT * FROM log_maquina`, (err, result) => {
      if (!err) {
        res.status(200).send(result.rows);
      } else {
        res.status(500).send("Algo de errado");
      }
    });
    client.end;
  };

  static listarLogMaquinaPorId = (req, res) => {
    client.query(
      `SELECT * FROM log_maquina WHERE id_maquina = ${req.params.id}`,
      (err, result) => {
        if (!err) {
          res.send(result.rows);
        }
      }
    );
    client.end;
  };

  static listarLogMaquinaPorIdData = (req, res) => {
    client.query(
      `SELECT * FROM log_maquina WHERE id_maquina = ${req.params.id} AND data_hr >= '${req.params.dataInicio}' AND data_hr < '${req.params.dataFim}'`,
      (err, result) => {
        if (!err) {
          res.send(result.rows);
        }
      }
    );
    client.end;
  };

  static listarLogMaquinaComAnomalia = async (req, res) => {
    client.query(
      `SELECT * FROM log_maquina AS l2
        JOIN (SELECT max(id) AS id, id_maquina, max(data_hr) 
                FROM log_maquina
                GROUP BY id_maquina) AS l1
        ON l2.id = l1.id
        WHERE anomalia = 'TRUE'`,
      (err, result) => {
        if (!err) {
          res.send(result.rows);
        }
      }
    );
    client.end;
  };

  static cadastrarLogMaquina = (req, res) => {
    const user = req.body;
    let conteudoQuery = `INSERT INTO log_maquina(id_maquina, data_hr, temperatura, ruido, vibracao, anomalia)
                        VALUES  (${user.id_maquina}, '${user.data_hr}', '${user.temperatura}', '${user.ruido}', '${user.vibracao}', '${user.anomalia}');`;

    client.query(conteudoQuery, (err, result) => {
      if (!err) {
        res.send("Industria cadastrada com sucesso.");
      } else {
        console.log(err.message);
      }
    });
    client.end;
  };
}

export default LogMaquinaController;
