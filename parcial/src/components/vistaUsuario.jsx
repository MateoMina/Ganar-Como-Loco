import { useEffect, useState } from 'react';
import './styles/vistaUsuario.css';
import { apiUrl } from "../context/constants";

function VistaUsuario() {
    const [codigo, setCodigo] = useState('');
    const [registros, setRegistros] = useState([]);
    const [userInfo, setUserInfo] = useState();

    useEffect(() => {
      allRifas()
    }, [setRegistros])
    
    const allRifas = async () => {
      const dataUser = await JSON.parse(localStorage.getItem('userInfo'));
      setUserInfo(dataUser)
      const response = await fetch( apiUrl + 'auth/obtenerRifas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: JSON.parse(localStorage.getItem('userInfo')).userId }),
      });

      const respuesta = await response.json();
      setRegistros(respuesta.payload);
    }

    const registrarCodigo = async () => {
        if (codigo.trim() === '') {
            alert('Por favor ingrese un código de rifa.');
            return;
        }

        // Petición al backend
        try {
            const response = await fetch(apiUrl + 'auth/asignarRifa', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ numeroRifa: codigo, idUsuario: userInfo.userId }),
            });

            const respuesta = await response.json();
            console.log(respuesta);
            

            if (respuesta.message.length > 1) {
                alert(respuesta.message);
            }

            setRegistros(respuesta.payload);
            setCodigo('');
        } catch (error) {
            console.error('Error en la petición:', error);
            alert('Ocurrió un error al registrar el código. Intente de nuevo.');
        }
    };

    return (
      <>
        {userInfo ?
        <div className='navinfo'>
            <ul>
              <li>{userInfo.nombre}</li>
              <li>{userInfo.cedula}</li>
              <li>{userInfo.correo}</li>
              <li>{userInfo.celular}</li>
            </ul>
        </div> : <></>}
        <div className='container'>
          <div className="vista-usuario-container">
              <h1 className="titulo">Registrar rifa</h1>
              <div className="form-container">
                  <label htmlFor="codigoRifa" className="label">Registrar Código rifa:</label>
                  <input
                      type="text"
                      id="codigoRifa"
                      value={codigo}
                      onChange={(e) => setCodigo(e.target.value)}
                      className="input"
                  />
                  <button
                      onClick={registrarCodigo}
                      className="boton-registrar"
                  >
                      Registrar
                  </button>
              </div>

              <table className="tabla-registros">
                  <thead>
                      <tr>
                          <th className="tabla-encabezado">Fecha</th>
                          <th className="tabla-encabezado">Hora</th>
                          <th className="tabla-encabezado">Código</th>
                          <th className="tabla-encabezado">Premio</th>
                      </tr>
                  </thead>
                  <tbody>
                      {registros.map((registro, index) => (
                          <tr key={index} className="tabla-fila">
                              <td className="tabla-celda">{registro.fecha}</td>
                              <td className="tabla-celda">{registro.hora}</td>
                              <td className="tabla-celda">{registro.numeroRifa}</td>
                              <td className="tabla-celda">{registro.premio}</td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
        </div>
      </>
    );
}

export default VistaUsuario;
