import client from "../config/connection.js";

class FuncionarioController {
  static listarFuncionario = (req, res) => {
    const query = {
      text: "SELECT * FROM funcionario",
      values: [],
    };

    client.query(query, (err, result) => {
      if (!err) {
        res.status(200).send(result.rows);
      } else {
        res
          .status(500)
          .send("Algo de errado, não foi possivel listar os funcionarios.");
      }
    });
    client.end;
  };

  static listarFuncionarioPorId = (req, res) => {
    const query = {
      text: "SELECT * FROM funcionario WHERE id = $1",
      values: [req.params.id],
    };

    client.query(query, (err, result) => {
      if (!err) {
        res.status(200).send(result.rows);
      } else {
        res
          .status(500)
          .send("Algo de errado, não foi possivel listar o funcionario.");
      }
    });
    client.end;
  };

  static cadastrarFuncionario = (req, res) => {
    const user = req.body;

    const query = {
      text: "INSERT INTO funcionario(id_setor, nome, cpf, data_nascimento, genero, telefone, email, cep, uf, cidade, bairro, rua, numero, data_entrada, data_saida, cargo) VALUES  ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16);",
      values: [
        user.id_setor,
        user.nome,
        user.cpf,
        user.data_nascimento,
        user.genero,
        user.telefone,
        user.email,
        user.cep,
        user.uf,
        user.cidade,
        user.bairro,
        user.rua,
        user.numero,
        user.data_entrada,
        user.data_saida,
        user.cargo,
      ],
    };

    client.query(query, (err, result) => {
      if (!err) {
        res.status(200).send("Funcionario cadastrado com sucesso.");
      } else {
        res
          .status(500)
          .send("Algo de errado, não foi possivel cadastrar o funcionario.");
      }
    });
    client.end;
  };

  static atualizarFuncionario = (req, res) => {
    const user = req.body;

    const query = {
      text: "UPDATE funcionario SET id_setor = $1, nome = $2, cpf = $3, data_nascimento = $4, genero = $5, telefone = $6, email = $7, cep = $8, uf = $9, cidade = $10, bairro = $11, rua = $12, numero = $13, data_entrada = $14, data_saida = $15, cargo = $16 WHERE id = $17;",
      values: [
        user.id_setor,
        user.nome,
        user.cpf,
        user.data_nascimento,
        user.genero,
        user.telefone,
        user.email,
        user.cep,
        user.uf,
        user.cidade,
        user.bairro,
        user.rua,
        user.numero,
        user.data_entrada,
        user.data_saida,
        user.cargo,
        req.params.id,
      ],
    };

    client.query(query, (err, result) => {
      if (!err) {
        res.status(200).send("Funcionario atualizado com sucesso.");
      } else {
        res
          .status(500)
          .send("Algo de errado, não foi possivel atualizar o funcionario.");
      }
    });
    client.end;
  };

  static excluirFuncionario = (req, res) => {
    const query = {
      text: "DELETE FROM funcionario WHERE id = $1",
      values: [req.params.id],
    };

    client.query(query, (err, result) => {
      if (!err) {
        res.status(200).send("Funcionario deletado com sucesso.");
      } else {
        res
          .status(500)
          .send("Algo de errado, não foi possivel deletar o funcionario.");
      }
    });
    client.end;
  };

  static desligarFuncionario = (req, res) => {
    const user = req.body;

    const query = {
      text: "UPDATE funcionario SET data_saida = $1 WHERE id = $2;",
      values: [user.data_saida, req.params.id],
    };

    client.query(query, (err, result) => {
      if (!err) {
        res.status(200).send("Funcionario desligado com sucesso.");
      } else {
        res
          .status(500)
          .send("Algo de errado, não foi possivel desligar o funcionario.");
      }
    });
    client.end;
  };
}

export default FuncionarioController;
