import client from "../config/connection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ silent: process.env.NODE_ENV === 'production' });

class IndustriaController {
  static listarIndustrias = (req, res) => {
    const user = req.user;

    const query = {
      text: "SELECT * FROM industria WHERE status = 'TRUE' AND id = $1;",
      values: [user.id_industria],
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
      text: "SELECT * FROM industria WHERE id = $1 AND status = 'TRUE'",
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
      text: "INSERT INTO industria(nome, cnpj, telefone, email, cep, uf, cidade, bairro, rua, numero, senha, status) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);",
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
        user.status,
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
        res
          .status(500)
          .send("Algo de errado, não foi possivel cadastrar a industria.");
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
      text: "UPDATE industria SET nome = $1, cnpj = $2, telefone = $3, email = $4, cep = $5, uf = $6, cidade = $7, bairro = $8, rua = $9, numero = $10, senha = $11, status = $12 WHERE id = $13;",
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
        user.status,
        req.params.id,
      ],
    };

    const query3 = {
      text: "SELECT * FROM industria WHERE email = $1 AND id = $2;",
      values: [user.email, req.params.id],
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
                .send(
                  "Algo de errado, não foi possivel atualizar a industria."
                );
            }
          });
        } else {
          client.query(query3, (err, result) => {
            if (result.rows.length > 0) {
              client.query(query2, (err, result) => {
                if (!err) {
                  res.status(200).send("Industria atualizada com sucesso.");
                } else {
                  res
                    .status(500)
                    .send(
                      "Algo de errado, não foi possivel atualizar a industria."
                    );
                }
              });
            } else {
              res.status(500).send("Algo de errado, email já cadastrado.");
            }
          });
        }
      } else {
        res
          .status(500)
          .send("Algo de errado, não foi possivel atualizar a industria.");
      }
    });

    client.end;
  };

  static deletarIndustria = (req, res) => {
    const query = {
      text: "UPDATE industria SET status = 'FALSE' WHERE id = $1;",
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
      text: "SELECT * FROM industria WHERE email = $1 AND status = 'TRUE';",
      values: [user.email],
    };

    client.query(query, async (err, result) => {
      if (!err) {
        if (result.rows.length > 0) {
          if (await bcrypt.compare(user.senha, result.rows[0].senha)) {
            const token = jwt.sign(
              { id_industria: result.rows[0].id },
              process.env.MY_SECRET,
              { expiresIn: process.env.EXPIRES_IN }
            );
            res.status(200).json({
              message: "Industria logada com sucesso.",
              token: token
            });
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
