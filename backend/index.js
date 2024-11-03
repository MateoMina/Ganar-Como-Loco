const express = require('express');
const { urlencoded, json } = require('express');
const router = require('./routes/login.routes.js');
const cors = require('cors');
const app = express();

const db = require('./db/mongo.js');

app.use(cors({
    origin:'*'
}));

app.use(urlencoded({ extended: true }));
app.use(json());

db.dbInit()
    .then(() => {
        console.log('Conexión realizada');
        app.use('/auth', router);
        const port = process.env.PORT || 4000;
        app.listen(port, () => {
            console.log(`Listening on port ${port}`);
        });
    })
    .catch(err => {
        console.error('Error de conexión a la base de datos:', err);
    });

    const port = process.env.PORT || 4000;

