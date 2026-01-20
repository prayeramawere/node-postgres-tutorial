import { Client } from "pg";
import express from "express";

const app = express();
app.use(express.json());

const con = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "Mawere#1234",
  database: "demodatabase",
});

await con.connect().then(() => console.log("connected"));

app.post("/post", async (req, res) => {
  const { name, id } = req.body;

  const insert_query = `INSERT INTO demotable (name,id) VALUES ('${name}', '${id}')`;
  try {
    const response = await con.query(insert_query);
    res.json({ success: true, data: response });
  } catch (error) {
    res.json({ success: false, msg: error });
  }
});

app.get("/fetch-data", (req, res) => {
  const fetch_query = `SELECT * FROM demotable`;

  con.query(fetch_query, (err, result) => {
    err
      ? res.send({ success: false, msg: err })
      : res.send({ success: true, data: result.rows });
  });
});

app.listen(4000, () => {
  console.log(`app running live at: http://localhost:4000`);
});
