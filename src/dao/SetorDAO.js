import client from "../config/connection.js";

class SetorDAO {
  static listarSetor(res, id_industria) {
    const query = {
      text: "SELECT * FROM setor WHERE status = 'TRUE' AND id_industria = $1",
      values: [id_industria],
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
  }

  static listarSetorPorId(res, id_industria, id_setor) {
    const query = {
      text: "SELECT * FROM setor WHERE id = $1 AND status = 'TRUE' AND id_industria = $2",
      values: [id_setor, id_industria],
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
  }

  static cadastrarSetor(res, setor) {
    const query = {
      text: "INSERT INTO setor(id_industria, nome, status) VALUES ($1, $2, $3);",
      values: [setor.id_industria, setor.nome, setor.status],
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
  }

  static atualizarSetor(res, setor, id_setor, id_industria) {
    const query = {
      text: "UPDATE setor SET id_industria = $1, nome = $2, status = $3 WHERE id = $4 AND id_industria = $5;",
      values: [
        setor.id_industria,
        setor.nome,
        setor.status,
        id_setor,
        id_industria,
      ],
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
  }

  static excluirSetor(res, id_setor, id_industria) {
    const query = {
      text: "UPDATE setor SET status = 'FALSE' WHERE id = $1 AND id_industria = $2",
      values: [id_setor, id_industria],
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
  }
}

export default SetorDAO;
