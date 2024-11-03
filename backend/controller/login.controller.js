// login.controller.js
const {usuario} = require('../db/models/users.schema');
const {rifa} = require('../db/models/rifas.schema');
const { response } = require('../helpers/dataResponse');

const login = async (req, res) => {
  const { nombre, contrasena } = req.body;

  try {
    const user = await usuario.findOne({ nombre, contrasena });
    if (user) {
      response(res, {payload: user})
    } else {
      response(res, {payload: user, msg: 'Credenciales incorrectas'})
    }
  } catch (error) {
    console.error("Error al verificar usuario:", error);
    res.status(500).json({ success: false, mensaje: 'Error en el servidor' });
  }
};

const register = async (req, res) => {
  try {
    const { nombre, contrasena, cedula, celular, ciudad, correo } = req.body;

    const existingUser = await usuario.findOne({ $or: [{ correo }, { cedula }] });
    if (existingUser) {
      return res.status(400).json({ success: false, mensaje: 'El usuario ya está registrado' });
    }

    const users = await usuario.find({});
    const maxUserId = users.reduce((max, user) => (user.userId > max ? user.userId : max), 0);
    const newUserId = maxUserId + 1;

    console.log('Users >>>', users, newUserId);

    const newUser = new usuario({
      userId: newUserId,
      nombre,
      contrasena,
      cedula,
      celular,
      ciudad,
      correo
    });

    await newUser.save();

    res.status(201).json({ success: true, mensaje: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ success: false, mensaje: 'Error en el servidor' });
  }
}

const asignarRifa = async (req, res) => {
  try {
    const { numeroRifa, idUsuario } = req.body

    const findRifa = await rifa.findOne({ numeroRifa });
    let message;

    if (findRifa.estado === 'disponible') {
      findRifa.fecha = new Date().toLocaleDateString(),
      findRifa.hora = new Date().toLocaleTimeString(),
      findRifa.idUsuario = idUsuario;
      findRifa.estado = 'ocupado';
      await findRifa.save();

      message = `Número de rifa ${findRifa.numeroRifa} asignado exitosamente al usuario ${idUsuario}.`
    } else {
      message = `El número de rifa ${findRifa.numeroRifa} ya está en uso.`
    }
    const allRifas = await rifa.find({idUsuario})

    response(res, {payload: allRifas, msg: message})
  } catch (error) {
    console.log("Error -> ", error.message);
    return res.status(500).json(error.message);
  }
}

const obtenerRifas = async (req, res) => {
  try {
    
    const { userId } = req.body;
    console.log('userId', userId);

    const allRifas = await rifa.find({idUsuario: userId})

    response(res, {payload: allRifas})

  } catch (error) {
    console.log("Error -> ", error.message);
    return res.status(500).json(error.message);
  }
}

const obtenerRifasPremios = async (req, res) => {
  try {

    const allRifas = await rifa.find({ idUsuario: { $ne: "Sin premio" } });

    response(res, {payload: allRifas})

  } catch (error) {
    console.log("Error -> ", error.message);
    return res.status(500).json(error.message);
  }
}


const crearRifas = async () => {
  try {
    const rifas = [];

    for (let i = 1; i <= 999; i++) {
      const numeroRifa = i.toString().padStart(3, '0'); // Formato "001", "002", etc.

      rifas.push({
        numeroRifa,
        estado: 'disponible',
        idUsuario: null,
        fecha: null,
        hora: null,
        premio: null
      });
    }

    // Inserta todas las rifas en la base de datos de una vez
    await rifa.insertMany(rifas);

    console.log("Se han creado 999 rifas con estado 'disponible'");
  } catch (error) {
    console.error("Error al crear rifas:", error);
  }
};


const actualizarPremiosRifas = async () => {
  try {
    const rifas = await rifa.find({}).sort({ numeroRifa: 1 });

    // 700 premios al azar
    const rifasAleatorias = rifas.sort(() => 0.5 - Math.random()).slice(0, 700);

    // Asignamos premios aleatorios a las 700 rifas seleccionadas
    rifasAleatorias.forEach((rifa, index) => {
      rifa.premio = `$${index + 1}`;
    });

    // Guardamos las rifas premiadas en la base de datos
    for (const rifa of rifasAleatorias) {
      await rifa.save();
    }
    console.log("Actualización de premios completada exitosamente");
  } catch (error) {
    console.error("Error al actualizar premios:", error);
  }
};

module.exports = { 
  login,
  asignarRifa,
  obtenerRifas,
  register,
  obtenerRifasPremios
};
