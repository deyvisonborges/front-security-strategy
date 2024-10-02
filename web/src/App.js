import React, { useState } from "react";
import axios from "axios";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/login",
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  const handleProfile = async () => {
    try {
      const response = await axios.get("http://localhost:4000/profile", {
        withCredentials: true,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/logout",
        {},
        {
          withCredentials: true,
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Erro no logout");
    }
  };

  return (
    <div className="App">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>

      <h2>Ações</h2>
      <button onClick={handleProfile}>Ver Perfil</button>
      <button onClick={handleLogout}>Logout</button>

      <p>{message}</p>
    </div>
  );
}

export default App;
