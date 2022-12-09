import client from "../config/connection.js";

class FuncionarioController {
  static listarFuncionario = (req, res) => {
    client.query(`SELECT * FROM funcionario`, (err, result) => {
      if (!err) {
        res.status(200).send(result.rows);
      } else {
        res.status(500).send("Algo de errado");
      }
    });
    client.end;
  };

  static listarFuncionarioPorId = (req, res) => {
    client.query(
      `SELECT * FROM funcionario WHERE id = ${req.params.id}`,
      (err, result) => {
        if (!err) {
          res.send(result.rows);
        }
      }
    );
    client.end;
  };

  static cadastrarFuncionario = (req, res) => {
    const user = req.body;
    let conteudoQuery = `INSERT INTO funcionario(id_setor, nome, cpf, data_nascimento, genero, telefone, email, cep, uf, cidade, bairro, rua, numero, data_entrada, data_saida, cargo)
                        VALUES  (${user.id_setor}, '${user.nome}', '${user.cpf}', '${user.data_nascimento}', '${user.genero}', '${user.telefone}', '${user.email}', '${user.cep}', '${user.uf}', '${user.cidade}', '${user.bairro}', '${user.rua}', '${user.numero}', '${user.data_entrada}', '${user.data_saida}', '${user.cargo}');`;

    client.query(conteudoQuery, (err, result) => {
      if (!err) {
        res.send("Industria cadastrada com sucesso.");
      } else {
        console.log(err.message);
      }
    });
    client.end;
  };

  static atualizarFuncionario = (req, res) => {
    const user = req.body;

    let conteudoQuery = `UPDATE funcionario SET id_setor = ${user.id_setor}, nome = '${user.nome}', cpf = '${user.cpf}', data_nascimento = '${user.data_nascimento}', genero = '${user.genero}', telefone = '${user.telefone}', email = '${user.email}', cep = '${user.cep}', uf = '${user.uf}', cidade = '${user.cidade}', bairro = '${user.bairro}', rua = '${user.rua}', numero = '${user.numero}', data_entrada = '${user.data_entrada}', data_saida = '${user.data_saida}', cargo = '${user.cargo}' WHERE id = ${req.params.id};`;

    client.query(conteudoQuery, (err, result) => {
      if (!err) {
        res.send("Industria atualizada com sucesso.");
      } else {
        console.log(err.message);
      }
    });
    client.end;
  };

  static excluirFuncionario = (req, res) => {
    let conteudoQuery = `DELETE FROM funcionario WHERE id = ${req.params.id}`;

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

export default FuncionarioController;
