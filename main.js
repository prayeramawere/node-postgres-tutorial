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

app.get("/fetch-by-id/:id", async (req, res) => {
  const { id } = req.params;

  const search_query = `SELECT * FROM demotable WHERE id = $1 ORDER BY name DESC`;

  con.query(search_query, [id], (err, result) => {
    err
      ? res.json({ success: false, msg: err })
      : res.json({ success: true, data: result.rows });
  });
});

app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const update_user_query = `UPDATE demotable SET name = $1 WHERE id = $2`;

  con.query(update_user_query, [name, id], (err, result) => {
    err
      ? res.json({ success: false, msg: err })
      : res.json({ success: true, data: result });
  });
});
app.delete("/deleteall", (req, res) => {
  const delete_query = `DELETE  FROM demotable`;
  con.query(delete_query, (err, result) => {
    err
      ? res.json({ success: false, msg: err })
      : res.json({ success: true, data: result });
  });
});

app.listen(4000, () => {
  console.log(`app running live at: http://localhost:4000`);
});
