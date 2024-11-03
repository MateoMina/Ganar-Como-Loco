const { connect, set } = require('mongoose');

const DB_URI = process.env.MONGODB_URI;

const dbInit = async () => {
    set("strictQuery", false);
    await connect(DB_URI);
};

module.exports = {
    dbInit
}