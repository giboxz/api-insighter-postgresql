import client from "../config/connection.js";

class MaquinaController {
  static listarMaquinas = (req, res) => {
    client.query(`SELECT * FROM maquina`, (err, result) => {
      if (!err) {
        res.status(200).send(result.rows);
      } else {
        res.status(500).send("Algo de errado");
      }
    });
    client.end;
  };

  static listarMaquinaPorId = (req, res) => {
    client.query(
      `SELECT * FROM maquina WHERE id = ${req.params.id}`,
      (err, result) => {
        if (!err) {
          res.send(result.rows);
        }
      }
    );
    client.end;
  };

  static cadastrarMaquina = (req, res) => {
    const user = req.body;
    let conteudoQuery = `INSERT INTO maquina(id_setor, nome, temperatura_max, temperatura_min, ruido_max, ruido_min, vibracao_max, vibracao_min)
                        VALUES  (${user.id_setor}, '${user.nome}', '${user.temperatura_max}', '${user.temperatura_min}', '${user.ruido_max}', '${user.ruido_min}', '${user.vibracao_max}', '${user.vibracao_min}');`;

    client.query(conteudoQuery, (err, result) => {
      if (!err) {
        res.send("Industria cadastrada com sucesso.");
      } else {
        console.log(err.message);
      }
    });
    client.end;
  };

  static atualizarMaquina = (req, res) => {
    const user = req.body;

    let conteudoQuery = `UPDATE maquina SET id_setor = ${user.id_setor}, nome = '${user.nome}', temperatura_max = '${user.temperatura_max}', temperatura_min = '${user.temperatura_min}', ruido_max = '${user.ruido_max}', ruido_min = '${user.ruido_min}', vibracao_max = '${user.vibracao_max}', vibracao_min = '${user.vibracao_min}' WHERE id = ${req.params.id};`;

    client.query(conteudoQuery, (err, result) => {
      if (!err) {
        res.send("Industria atualizada com sucesso.");
      } else {
        console.log(err.message);
      }
    });
    client.end;
  };

  static excluirMaquina = (req, res) => {
    let conteudoQuery = `DELETE FROM maquina WHERE id = ${req.params.id}`;

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

export default MaquinaController;
