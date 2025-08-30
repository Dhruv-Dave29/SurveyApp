import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
const app = express();
const port = 4000;
dotenv.config();
app.use(cors());
app.use(bodyParser.json());

// Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

app.get("/", (req, res) => {
    res.send("welcome");
  });

// Get questions
app.get("/api/questions", async (req, res) => {
  const { data, error } = await supabase.from("questions").select("*");
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Save responses
app.post("/api/responses", async (req, res) => {
  const responses = req.body; // { questionId: answer }
  const rows = Object.entries(responses).map(([qid, answer]) => ({
    question_id: qid,
    answer,
  }));
  const { error } = await supabase.from("responses").insert(rows);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: "Responses saved" });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
