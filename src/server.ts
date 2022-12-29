import app from './app.js';
import dotenv from 'dotenv';

declare let process: {
  env: {
    PORT: number,
  }
}

dotenv.config();

//const PORT = Number(process.env.PORT) || 3333;
const PORT = process.env.PORT || 3333;

app.listen(PORT, '192.168.122.107', () => console.log(`start server at ${PORT}`));

