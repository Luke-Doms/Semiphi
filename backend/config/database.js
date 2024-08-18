const mongoose = require('mongoose');

require('dotenv').config();

const conn = process.env.DB_URL;

const connection = mongoose.createConnection(conn, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const UserSchema = new mongoose.Schema(
  {
    username: String,
    hash: String,
    salt: String,
    sequences: [{
      name:  String,
      seq: Array
    }],
    times: [{time: Number}]
  },
  {
    timestamps: true
  }
);
const User = connection.model('User', UserSchema);

module.exports = connection;
