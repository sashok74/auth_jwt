import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import dotenv from 'dotenv';
dotenv.config();

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport(
      smtpTransport({
        service: 'gmail',
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_APPPASS,
        },
      }),
    );
  }

  async sendActivationMail(toEmail, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: toEmail,
      subject: 'Активация аккаунта на ' + process.env.API_URL,
      text: '',
      html: `
            <div>
              <h1>Для активации перейти по ссылке</h1>
              <a href="${link}">${link}</a>
            </div>
            `,
    });
  }
}

export default new MailService();
