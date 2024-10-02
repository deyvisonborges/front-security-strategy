const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const PORT = 4000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Simula um banco de dados de usuários
const users = [{ username: "user1", password: "password1" }];

// Secret para JWT
const JWT_SECRET = "mysecretkey";

// Rota de login
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    // Gera o token JWT
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });

    // Armazena o token no cookie HttpOnly
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // Em produção, usar true para HTTPS
      sameSite: "Strict",
    });

    return res.json({ message: "Login bem-sucedido!" });
  } else {
    return res.status(401).json({ message: "Credenciais inválidas" });
  }
});

// Rota protegida
app.get("/profile", (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Sem autorização" });
  }

  // Verifica o token JWT
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return res.json({ message: `Bem-vindo, ${decoded.username}` });
  } catch (err) {
    return res.status(401).json({ message: "Token inválido" });
  }
});

// Logout
app.post("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ message: "Logout bem-sucedido" });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
