import { useState } from "react";
import './styles/cambiarcontrasena.css';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from "../context/constants";

const Register = () => {
  const [nombre, setnombre] = useState("");
  const [contrasena, setcontrasena] = useState("");
  const [cedula, setcedula] = useState("");
  const [celular, setcelular] = useState("");
  const [ciudad, setciudad] = useState("");
  const [correo, setcorreo] = useState("");
  const [fechaDeNacimiento, setfechaDeNacimiento] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();

    const response = await fetch( apiUrl + "auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nombre, contrasena, cedula, celular, ciudad, correo }),
    });

    const data = await response.json();

    if (data.success) {
      setMessage("Registro exitoso. Puedes volver al login.");
    } else {
      setMessage(data.message);
    }
  };

  return (
    <div className="container">
      <h2>Registrar</h2>
      <form className="space-y-6 w-full max-w-md" onSubmit={handleCreate}>
        <div>
          <label>Nombre:</label>
          <input type="text" value={nombre} onChange={(e) => setnombre(e.target.value)} required />
        </div>
        <div>
          <label>Contraseña:</label>
          <input type="text" value={contrasena} onChange={(e) => setcontrasena(e.target.value)} required />
        </div>
        <div>
          <label>Cédula:</label>
          <input type="text" value={cedula} onChange={(e) => setcedula(e.target.value)} required />
        </div>
        <div>
          <label>Celular:</label>
          <input type="text" value={celular} onChange={(e) => setcelular(e.target.value)} required />
        </div>
        <div>
          <label>Ciudad:</label>
          <input type="text" value={ciudad} onChange={(e) => setciudad(e.target.value)} required />
        </div>
        <div>
          <label>Correo:</label>
          <input type="text" value={correo} onChange={(e) => setcorreo(e.target.value)} required />
        </div>
        <div>
          <label>Fecha de Nacimiento:</label>
          <input type="date" value={fechaDeNacimiento} onChange={(e) => setfechaDeNacimiento(e.target.value)} />
        </div>
        <div className="flex flex-col space-y-2">
          <button type="submit" className="btn-submit" onClick={handleCreate}>Registro</button>
          <button type="button" onClick={() => navigate('/')} className="btn-back">Volver al Login</button>
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;
