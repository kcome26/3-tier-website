import express from 'express';
import sequelize from './database.js';
import router from './routes/route.js';
import playlistRouter from './routes/playlistroute';
import cors from 'cors';
const app = express();
app.options('*', cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://18.222.105.117"); 
    next();
  });
app.use(router);
sequelize.sync(); 

app.listen(80, '0.0.0.0', function () {
    console.log("Listening on port 80!");
  });
