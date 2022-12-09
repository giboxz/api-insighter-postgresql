import client from "../config/connection.js";

class SetorController {
  static listarSetor = (req, res) => {
    client.query(`SELECT * FROM setor`, (err, result) => {
      if (!err) {
        res.status(200).send(result.rows);
      } else {
        res.status(500).send("Algo de errado");
      }
    });
    client.end;
  };

  static listarSetorPorId = (req, res) => {
    client.query(
      `SELECT * FROM setor WHERE id = ${req.params.id}`,
      (err, result) => {
        if (!err) {
          res.send(result.rows);
        }
      }
    );
    client.end;
  };

  static cadastrarSetor = (req, res) => {
    const user = req.body;
    let conteudoQuery = `INSERT INTO setor(id_industria, nome)
                        VALUES  (${user.id_industria}, '${user.nome}');`;

    client.query(conteudoQuery, (err, result) => {
      if (!err) {
        res.send("Industria cadastrada com sucesso.");
      } else {
        console.log(err.message);
      }
    });
    client.end;
  };

  static atualizarSetor = (req, res) => {
    const user = req.body;

    let conteudoQuery = `UPDATE setor SET id_industria = ${user.id_industria}, nome = '${user.nome}' WHERE id = ${req.params.id};`;

    client.query(conteudoQuery, (err, result) => {
      if (!err) {
        res.send("Industria atualizada com sucesso.");
      } else {
        console.log(err.message);
      }
    });
    client.end;
  };

  static excluirSetor = (req, res) => {
    let conteudoQuery = `DELETE FROM setor WHERE id = ${req.params.id}`;

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

export default SetorController;
