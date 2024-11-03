import { useEffect, useState } from "react";
import { apiUrl } from "../context/constants";

const Admin = () => {
    const [infoRifas, setInfoRifa] = useState();

    useEffect(() => {
        obtenerRifasPremios()
    }, []);

    const obtenerRifasPremios = async () => {
        const response = await fetch( apiUrl + 'auth/obtenerRifasPremios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: JSON.parse(localStorage.getItem('userInfo')).userId }),
          });
    
          const respuesta = await response.json();
          setInfoRifa(respuesta.payload)
    }

  return (
    <>
    <h1>Usuarios ganadores</h1>
      <table className="tabla-registros">
        <thead>
          <tr>
            <th className="tabla-encabezado">Id usuario</th>
            <th className="tabla-encabezado">Fecha</th>
            <th className="tabla-encabezado">Numero rifa</th>
            <th className="tabla-encabezado">Premio</th>
          </tr>
        </thead>
        <tbody >
          {infoRifas ? infoRifas.map((registro, index) => (
            <tr key={index} className="tabla-fila">
              <td className="tabla-celda">{registro.idUsuario}</td>
              <td className="tabla-celda">{registro.fecha}</td>
              <td className="tabla-celda">{registro.numeroRifa}</td>
              <td className="tabla-celda">{registro.premio}</td>
            </tr>
          )): <></>}
        </tbody>
      </table>
    </>
  );
};

export default Admin;
