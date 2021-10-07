require('dotenv').config();
const mongoose = require('mongoose');

const MONGO_USERNAME = 'astrouser_dev';
const MONGO_PASSWORD = 'Secure@123$';

//  const MONGO_HOSTNAME = "api.astrosarathi.com";
  const MONGO_HOSTNAME = 'localhost';

const MONGO_PORT = '27017';
const MONGO_DB = 'astrology';
// let dbConn =  'mongodb+srv://astrosarathi:p@ssword.123@astrosarathi.wln5c.mongodb.net/astrology?retryWrites=true&w=majority';
let dbConn = `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`;
//  let dbConn = `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`;

module.exports = {
  // 'secret': 'expressapitest',
  'dbConnection': dbConn
}
// run code after pull or push on cpanel node pm2 restart api_astro
// when upper cmd will not found then use another cmd
//  pm2 start /home/cuycldyu/api/publicapi/app.js --name api_astro

