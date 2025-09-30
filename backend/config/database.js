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
    sequences: {
      '2x2x2': [{
        name:  String,
        seq: [String]
      }],
      '2x4x4': [{
        name: String, 
        seq: [String]
      }],
      '3x3x3': [{
        name: String, 
        seq: [String]
      }],
      '4x4x4': [{
        name: String, 
        seq: [String]
      }]
    },
    times: [{time: Number}]
  },
  {
    timestamps: true
  }
);
const User = connection.model('User', UserSchema);

module.exports = connection;
