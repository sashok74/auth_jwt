import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from './modules/routes.js';
import errorMiddleware from './middlewares/error-middleware.js';

const whitelist = ['http://localhost:3000' /** other domains if any */];
const corsOptions: cors.CorsOptions = {
  credentials: true,
  origin: 'http://localhost:5173',
};

class App {
  public server;

  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.errorHendler();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cookieParser());
    this.server.use(cors(corsOptions));
  }

  routes() {
    this.server.use('/api/auth', routes);
  }

  errorHendler() {
    this.server.use(errorMiddleware);
  }
}

export default new App().server;
