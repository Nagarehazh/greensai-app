import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { sequelize } from './database/database';
import userRoutes from './routes/users.routes';
import authRoutes from './routes/auth.routes';

const app = express();

import './models/user';
import './models/banip';

app.use(cors());

app.use(express.json())
app.use(cookieParser())
app.use((_req, res, next) => {
  // https://greensai-ecommerce-app.netlify.app
  res.header('Access-Control-Allow-Origin', "*"); 
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

app.use(userRoutes);
app.use(authRoutes);

(async function sequelizeSync(){
    try {
      sequelize
        .sync()
        .then(() => {
          console.log('Postgres sync has been established successfully.')
        })
    } catch (error) {
      console.error('Unable to sync to the database:', error)
  }
  })();

export default app;