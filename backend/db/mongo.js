const { connect, set } = require('mongoose');

//const DB_URI = process.env.MONGODB_URI;
const DB_URI = 'mongodb+srv://jhonier:13052002@restaurant.hluhpeu.mongodb.net/rifas?retryWrites=true&w=majority&appName=restaurant'

const dbInit = async () => {
    set("strictQuery", false);
    await connect(DB_URI);
};

module.exports = {
    dbInit
}