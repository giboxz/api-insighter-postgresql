import pkg from 'pg';
import dotenv from "dotenv";
dotenv.config({ silent: process.env.NODE_ENV === 'production' });

const { Client } = pkg;

const client = new Client({
  host: process.env.HOST_PG,
  user: process.env.USER_PG,
  port: process.env.PORT_PG,
  password: process.env.PASSWORD_PG,
  database: process.env.DATABASE_PG,
});

client.connect();

export default client;
