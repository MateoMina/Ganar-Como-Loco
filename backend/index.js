const express = require('express');
const { urlencoded, json } = require('express');
const router = require('./routes/login.routes.js');
const cors = require('cors');
const app = express();

const db = require('./db/mongo.js');

app.use(cors({
    origin:'https://backend-theta-beige.vercel.app/'
}));

app.use(urlencoded({ extended: true }));
app.use(json());

db.dbInit()
    .then(() => {
        console.log('Conexión realizada');
        app.use('/auth', router);
        app.listen(4000, () => {
            console.log('listening at port 4000');
        });
    })
    .catch(err => {
        console.error('Error de conexión a la base de datos:', err);
    });
