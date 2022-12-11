import client from "../config/connection.js";

class SetorController {
  static listarSetor = (req, res) => {
    const query = {
      text: "SELECT * FROM setor WHERE status = 'TRUE'",
      values: [],
    };

    client.query(query, (err, result) => {
      if (!err) {
        res.status(200).send(result.rows);
      } else {
        res
          .status(500)
          .send("Algo de errado, não foi possivel listar os setores.");
      }
    });
    client.end;
  };

  static listarSetorPorId = (req, res) => {
    const query = {
      text: "SELECT * FROM setor WHERE id = $1 AND status = 'TRUE'",
      values: [req.params.id],
    };

    client.query(query, (err, result) => {
      if (!err) {
        res.status(200).send(result.rows);
      } else {
        res
          .status(500)
          .send("Algo de errado, não foi possivel listar o setor.");
      }
    });
    client.end;
  };

  static cadastrarSetor = (req, res) => {
    const user = req.body;

    const query = {
      text: "INSERT INTO setor(id_industria, nome, status) VALUES ($1, $2, $3);",
      values: [user.id_industria, user.nome, user.status],
    };

    client.query(query, (err, result) => {
      if (!err) {
        res.status(200).send("Setor cadastrado com sucesso.");
      } else {
        res
          .status(500)
          .send("Algo de errado, não foi possivel cadastrar o setor.");
      }
    });
    client.end;
  };

  static atualizarSetor = (req, res) => {
    const user = req.body;

    const query = {
      text: "UPDATE setor SET id_industria = $1, nome = $2, status = $3 WHERE id = $4;",
      values: [user.id_industria, user.nome, user.status, req.params.id],
    };

    client.query(query, (err, result) => {
      if (!err) {
        res.status(200).send("Setor atualizado com sucesso.");
      } else {
        res
          .status(500)
          .send("Algo de errado, não foi possivel atualizar o setor.");
      }
    });
    client.end;
  };

  static excluirSetor = (req, res) => {
    const query = {
      text: "UPDATE setor SET status = 'FALSE' WHERE id = $1",
      values: [req.params.id],
    };

    client.query(query, (err, result) => {
      if (!err) {
        res.status(200).send("Setor deletado com sucesso.");
      } else {
        res
          .status(500)
          .send("Algo de errado, não foi possivel deletar o setor.");
      }
    });
    client.end;
  };
}

export default SetorController;
