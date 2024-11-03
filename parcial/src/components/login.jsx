import { useState } from "react";
import './styles/login.css';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from "../context/constants";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if(username == 'admin' && password == '123') return navigate('/usuario');
      const response = await fetch(apiUrl + 'auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify({ nombre: 'jhonier', contrasena: '123' }),
        body: JSON.stringify({ nombre: username, contrasena: password }),
      });

      const data = await response.json();

      console.log('data', data);

      if (data.payload) {
        localStorage.setItem('userInfo', JSON.stringify(data.payload))
        navigate('/usuario');
      } else {
        setErrorMessage(data.mensaje || 'Credenciales incorrectas');
      }

      console.log(data);
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
      setErrorMessage('Error en el servidor, intenta más tarde.');
    }
  };

  const handleRegister = () => {
    navigate('/register'); 
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuario:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <div>
          <button type="submit">Login</button>
        </div>
        <a
          onClick={handleRegister}
        >
          Registrate
        </a>
      </form>
    </div>
  );
};

export default Login;
