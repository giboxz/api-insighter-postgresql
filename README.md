# API Insighter
 
 ### Este repositorio contém a API do projeto academico INSIGHTER, que se trata de uma aplicação cujo objetivo é visualizar e prever anomalias em maquinarios industriais.

## Base de dados

### Para rodar nossa API primeiro temos que criar uma base de dados no POSTGRESQL, o codigo é o seguinte:

#### Criando o database:

> CREATE DATABASE insighter;

#### Criando tabelas dentro do database:

> CREATE TABLE industria (
	id SERIAL PRIMARY KEY,
	nome VARCHAR(150),
	cnpj VARCHAR(18),
	telefone VARCHAR(14),
	email VARCHAR(150),
	cep VARCHAR(9),
	uf CHAR(2),
	cidade VARCHAR(150),
	bairro VARCHAR(150),
	rua VARCHAR(150),
	numero VARCHAR(5),
	senha VARCHAR(150),
	status BOOLEAN	
);

> CREATE TABLE setor (
	id SERIAL PRIMARY KEY,
	id_industria INTEGER NOT NULL,
	nome VARCHAR(150),
	status BOOLEAN
);

> CREATE TABLE funcionario (
	id SERIAL PRIMARY KEY,
	id_setor INTEGER NOT NULL,
	nome VARCHAR(150),
	cpf VARCHAR(14),
	data_nascimento DATE,
	genero CHAR(1),
	telefone VARCHAR(14),
	email VARCHAR(150),
	cep VARCHAR(9),
	uf CHAR(2),
	cidade VARCHAR(150),
	bairro VARCHAR(150),
	rua VARCHAR(150),
	numero VARCHAR(5),
	data_entrada DATE,
	data_saida DATE,
	cargo VARCHAR(150),
	status BOOLEAN
);

> CREATE TABLE maquina (
	id SERIAL PRIMARY KEY,
	id_setor INTEGER NOT NULL,
	nome VARCHAR(150),
	temperatura_max REAL,
	temperatura_min REAL,
	ruido_max REAL,
	ruido_min REAL,
	vibracao_max REAL,
	vibracao_min REAL,
	status BOOLEAN
);

> CREATE TABLE log_maquina (
	id SERIAL PRIMARY KEY,
	id_maquina INTEGER NOT NULL,
	data_hr TIMESTAMP WITHOUT TIME ZONE,
	temperatura REAL,
	ruido REAL,
	vibracao REAL,
	anomalia BOOLEAN
);

> CREATE TABLE log_manutencao (
	id SERIAL PRIMARY KEY,
	id_maquina INTEGER NOT NULL,
	id_funcionario INTEGER NOT NULL,
	descricao TEXT,
	data_update DATE,
	status_manutencao BOOLEAN
);

#### Adicionando as chaves estrangeiras:

> ALTER TABLE setor ADD CONSTRAINT fk_id_industria
    FOREIGN KEY (id_industria)
    REFERENCES industria(id);
	
> ALTER TABLE funcionario ADD CONSTRAINT fk_id_setor
    FOREIGN KEY (id_setor)
    REFERENCES setor(id);
	
> ALTER TABLE maquina ADD CONSTRAINT fk_id_setor
    FOREIGN KEY (id_setor)
    REFERENCES setor(id);
	
> ALTER TABLE log_maquina ADD CONSTRAINT fk_id_maquina
    FOREIGN KEY (id_maquina)
    REFERENCES maquina(id);
	
> ALTER TABLE log_manutencao ADD CONSTRAINT fk_id_maquina
    FOREIGN KEY (id_maquina)
    REFERENCES maquina(id);
	
> ALTER TABLE log_manutencao ADD CONSTRAINT fk_id_funcionario
    FOREIGN KEY (id_funcionario)
    REFERENCES funcionario(id);


## Clonando repositorio 

#### Agora que criamos nossa base de dados, podemos clonar o repositorio.

#### Após clonar o repositorio o primeiro passo é criar um arquivo ".env" na pasta raiz para colocar as variaveis de ambiente.

#### Primeiro adicionamos as variáveis relacionadas ao banco de dados:

> HOST_PG=... ("localhost" se você criou o banco de dados localmente)<br>
> USER_PG=... (seu usuário do POSTGRESQL)<br>
> PORT_PG=... (porta do POSTGRESQL, a padrão é "5432")<br>
> PASSWORD_PG=... (senha do POSTGRESQL)<br>
> DATABASE_PG=... (o nome do database criado)<br>

#### Depois adicionamos as variáveis relacionadas a geração de token de autenticação (JWT):

> MY_SECRET=... (você pode colocar qualquer string)<br>
> EXPIRES_IN=... (tempo de expiração do token, EX: "1h")

## Instalando dependencias:

#### Agora podemos rodar o comando "npm install" no console para instalar as dependencias do projeto.

## Rodando o projeto:

#### Agora que finalizamos todas as configurações, basta rodarmos o comando "npm run dev" no console para deixar nossa API ativa.

## Interação com os end-points:

#### Você pode visualizar todos os end-point possiveis na pasta "/src/routes/...".
#### Para testar um end-point você pode utilizar o programa Insominia. Não se esqueça que só as rotas de Login Industria e Cadastro Industria são liberadas para acesso sem login.

#### Após cadastrar uma industria e fazer o login você receberá um token de autenticação, você deverá enviar esse token no HEADER da requisição. O Insominia facilita isso, basta você entrar em "AUTH" -> "Bearer Token" e colocar o token recebido no campo especificado. Agora que você está logado é possivel interagir com todos os end-points.

## Muito obrigado!

