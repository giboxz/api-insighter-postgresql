import client from "../config/connection.js";

class FuncionarioDAO {
  static listarFuncionario(res, id_industria) {
    const query = {
      text: "SELECT f.id, f.id_setor, s.id_industria, f.nome AS nome_funcionario, s.nome AS nome_setor, cpf, data_nascimento, genero, telefone, email, cep, uf, cidade, bairro, rua, numero, data_entrada, data_saida, cargo, f.status FROM funcionario AS f JOIN setor AS s ON f.id_setor = s.id WHERE f.status = 'TRUE' AND s.id_industria = $1",
      values: [id_industria],
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
  }

  static listarFuncionarioPorId(res, id_industria, id_funcionario) {
    const query = {
      text: "SELECT f.id, f.id_setor, s.id_industria, f.nome AS nome_funcionario, s.nome AS nome_setor, cpf, data_nascimento, genero, telefone, email, cep, uf, cidade, bairro, rua, numero, data_entrada, data_saida, cargo, f.status FROM funcionario AS f JOIN setor AS s ON f.id_setor = s.id WHERE f.status = 'TRUE' AND s.id_industria = $1 AND f.id = $2",
      values: [id_industria, id_funcionario],
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
  }

  static cadastrarFuncionario(res, funcionario) {
    const query = {
      text: "INSERT INTO funcionario(id_setor, nome, cpf, data_nascimento, genero, telefone, email, cep, uf, cidade, bairro, rua, numero, data_entrada, data_saida, cargo, status) VALUES  ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17);",
      values: [
        funcionario.id_setor,
        funcionario.nome,
        funcionario.cpf,
        funcionario.data_nascimento,
        funcionario.genero,
        funcionario.telefone,
        funcionario.email,
        funcionario.cep,
        funcionario.uf,
        funcionario.cidade,
        funcionario.bairro,
        funcionario.rua,
        funcionario.numero,
        funcionario.data_entrada,
        funcionario.data_saida,
        funcionario.cargo,
        funcionario.status,
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
  }

  static atualizarFuncionario(res, funcionario, id_industria, id_funcionario) {
    const query = {
      text: "UPDATE funcionario f SET id_setor = $1, nome = $2, cpf = $3, data_nascimento = $4, genero = $5, telefone = $6, email = $7, cep = $8, uf = $9, cidade = $10, bairro = $11, rua = $12, numero = $13, data_entrada = $14, data_saida = $15, cargo = $16, status = $17 FROM setor s WHERE s.id = f.id_setor AND s.id_industria = $18 AND f.id = $19",
      values: [
        funcionario.id_setor,
        funcionario.nome,
        funcionario.cpf,
        funcionario.data_nascimento,
        funcionario.genero,
        funcionario.telefone,
        funcionario.email,
        funcionario.cep,
        funcionario.uf,
        funcionario.cidade,
        funcionario.bairro,
        funcionario.rua,
        funcionario.numero,
        funcionario.data_entrada,
        funcionario.data_saida,
        funcionario.cargo,
        funcionario.status,
        id_industria,
        id_funcionario,
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
  }

  static excluirFuncionario(res, id_industria, id_funcionario) {
    const query = {
      text: "UPDATE funcionario f SET status = 'FALSE' FROM setor s WHERE s.id = f.id_setor AND s.id_industria = $1 AND f.id = $2",
      values: [id_industria, id_funcionario],
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
  }

  static desligarFuncionario(res, data_saida, id_industria, id_funcionario) {
    const query = {
      text: "UPDATE funcionario f SET data_saida = $1, status = 'FALSE' FROM setor s WHERE s.id = f.id_setor AND s.id_industria = $2 AND f.id = $3",
      values: [data_saida, id_industria, id_funcionario],
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
  }
}

export default FuncionarioDAO;
