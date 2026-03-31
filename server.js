
import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(express.json());
app.use(cors());

const API_KEY = "AIzaSyDBnAEuIG-UcfzfNMZ3WGMnG3pLSE4m9Yg";

app.post("/gemini", async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    const data = await response.json();

    const texto = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Erro ao gerar";

    res.json({ texto });

  } catch (err) {
    res.status(500).json({ erro: "Erro no servidor" });
  }
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
