import client from "../config/connection.js";

class IndustriaController {
  static listarIndustrias = (req, res) => {
    client.query(`SELECT * FROM industria`, (err, result) => {
      if (!err) {
        res.status(200).send(result.rows);
      } else {
        res.status(500).send("Algo de errado");
      }
    });
    client.end;
  };

  static listarIndustriasID = (req, res) => {
    client.query(
      `SELECT * FROM industria WHERE id = ${req.params.id}`,
      (err, result) => {
        if (!err) {
          res.send(result.rows);
        }
      }
    );
    client.end;
  };

  static cadastrarIndustria = (req, res) => {
    const user = req.body;
    let conteudoQuery = `INSERT INTO industria(nome, cnpj, telefone, email, cep, uf, cidade, bairro, rua, numero, senha)
                        VALUES('${user.nome}', '${user.cnpj}', '${user.telefone}', '${user.email}', '${user.cep}', '${user.uf}', '${user.cidade}', '${user.bairro}', '${user.rua}', '${user.numero}', '${user.senha}');`;

    client.query(conteudoQuery, (err, result) => {
      if (!err) {
        res.send("Industria cadastrada com sucesso.");
      } else {
        console.log(err.message);
      }
    });
    client.end;
  };

  static atualizarIndustria = (req, res) => {
    const user = req.body;

    let conteudoQuery = `UPDATE industria SET nome = '${user.nome}', cnpj = '${user.cnpj}', telefone = '${user.telefone}', email = '${user.email}', cep = '${user.cep}', uf = '${user.uf}', cidade = '${user.cidade}', bairro = '${user.bairro}', rua = '${user.rua}', numero = '${user.numero}', senha = '${user.senha}' WHERE id = ${req.params.id};`;

    client.query(conteudoQuery, (err, result) => {
      if (!err) {
        res.send("Industria atualizada com sucesso.");
      } else {
        console.log(err.message);
      }
    });
    client.end;
  };

  static deletarIndustria = (req, res) => {
    let conteudoQuery = `DELETE FROM industria WHERE id = ${req.params.id}`;

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

export default IndustriaController;
