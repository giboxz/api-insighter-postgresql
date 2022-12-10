import client from "../config/connection.js";
import bcrypt from "bcrypt";

class IndustriaController {
  static listarIndustrias = (req, res) => {
    const query = {
      text: "SELECT * FROM industria",
      values: [],
    };

    client.query(query, (err, result) => {
      if (!err) {
        res.status(200).send(result.rows);
      } else {
        res
          .status(500)
          .send("Algo de errado, não foi possivel listar as industrias.");
      }
    });
    client.end;
  };

  static listarIndustriasID = (req, res) => {
    const query = {
      text: "SELECT * FROM industria WHERE id = $1",
      values: [req.params.id],
    };

    client.query(query, (err, result) => {
      if (!err) {
        res.status(200).send(result.rows);
      } else {
        res
          .status(500)
          .send("Algo de errado, não foi possivel listar a industria.");
      }
    });
    client.end;
  };

  static cadastrarIndustria = async (req, res) => {
    const user = req.body;
    const senhaCriptografada = await bcrypt.hash(user.senha, 10);

    const query1 = {
      text: "SELECT * FROM industria WHERE email = $1;",
      values: [user.email],
    };

    const query2 = {
      text: "INSERT INTO industria(nome, cnpj, telefone, email, cep, uf, cidade, bairro, rua, numero, senha) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);",
      values: [
        user.nome,
        user.cnpj,
        user.telefone,
        user.email,
        user.cep,
        user.uf,
        user.cidade,
        user.bairro,
        user.rua,
        user.numero,
        senhaCriptografada,
      ],
    };

    client.query(query1, async (err, result) => {
      if (!err) {
        if (result.rows.length < 1) {
          client.query(query2, (err, result) => {
            if (!err) {
              res.send("Industria cadastrada com sucesso.");
            } else {
              res
                .status(500)
                .send(
                  "Algo de errado, não foi possivel cadastrar a industria."
                );
            }
          });
        } else {
          res.status(500).send("Algo de errado, email já cadastrado.");
        }
      } else {
        res.status(500).send("Algo de errado, não foi possivel cadastrar a industria.");
      }
    });

    client.end;
  };

  static atualizarIndustria = async (req, res) => {
    const user = req.body;
    const senhaCriptografada = await bcrypt.hash(user.senha, 10);

    const query1 = {
      text: "SELECT * FROM industria WHERE email = $1;",
      values: [user.email],
    };

    const query2 = {
      text: "UPDATE industria SET nome = $1, cnpj = $2, telefone = $3, email = $4, cep = $5, uf = $6, cidade = $7, bairro = $8, rua = $9, numero = $10, senha = $11 WHERE id = $12;",
      values: [
        user.nome,
        user.cnpj,
        user.telefone,
        user.email,
        user.cep,
        user.uf,
        user.cidade,
        user.bairro,
        user.rua,
        user.numero,
        senhaCriptografada,
        req.params.id,
      ],
    };

    client.query(query1, async (err, result) => {
      if (!err) {
        if (result.rows.length < 1) {
          client.query(query2, (err, result) => {
            if (!err) {
              res.status(200).send("Industria atualizada com sucesso.");
            } else {
              res
                .status(500)
                .send("Algo de errado, não foi possivel atualizar a industria.");
            }
          });      
        } else {
          res.status(500).send("Algo de errado, email já cadastrado.");
        }
      } else {
        res.status(500).send("Algo de errado, não foi possivel atualizar a industria.");
      }
    });

    client.end;
  };

  static deletarIndustria = (req, res) => {
    const query = {
      text: "DELETE FROM industria WHERE id = $1;",
      values: [req.params.id],
    };

    client.query(query, (err, result) => {
      if (!err) {
        res.send("Industria deletada com sucesso.");
      } else {
        res
          .status(500)
          .send("Algo de errado, não foi possivel deletar a industria.");
      }
    });
    client.end;
  };

  static loginIndustria = async (req, res) => {
    const user = req.body;

    const query = {
      text: "SELECT * FROM industria WHERE email = $1;",
      values: [user.email],
    };

    client.query(query, async (err, result) => {
      if (!err) {
        if (result.rows.length > 0) {
          if (await bcrypt.compare(user.senha, result.rows[0].senha)) {
            res.status(200).send("Industria logada com sucesso.");
          } else {
            res.status(500).send("Algo de errado, falha na autenticação.");
          }
        } else {
          res.status(500).send("Algo de errado, falha na autenticação.");
        }
      } else {
        res.status(500).send("Algo de errado, falha na autenticação.");
      }
    });
  };
}

export default IndustriaController;
