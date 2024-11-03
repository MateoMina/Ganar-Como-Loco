import './App.css';
import Login from './components/login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import VistaUsuario from './components/vistaUsuario';
import Admin from './components/UsuarioAdmin';
import Register from './components/Register';

function App() {
  return (  
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/usuario' element={<VistaUsuario />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
