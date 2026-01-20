import { Client } from "pg";
const con = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "Mawere#1234",
  database: "demodatabase",
});

await con.connect().then(() => console.log("connected"));
