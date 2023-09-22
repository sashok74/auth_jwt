import dotenv from 'dotenv';
import app from './app.js';

declare let process: {
  env: {
    PORT: number;
    SMTP_HOST: string;
    SMPT_PORT: number;
  };
};

dotenv.config();

//const PORT = Number(process.env.PORT) || 3333;
const PORT = process.env.PORT || 3333;

(async () => {
  await app.listen(PORT, '192.168.122.107', () => console.log(`start server at ${PORT}`));
})();
