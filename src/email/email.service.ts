// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import * as nodemailer from 'nodemailer';
// import { User } from '@prisma/client';

// @Injectable()
// export class EmailService {
//   private transporter: nodemailer.Transporter;

//   constructor(private config: ConfigService) {
//     this.transporter = nodemailer.createTransport({
//       host: this.config.get('SMTP_HOST'),
//       port: this.config.get('SMTP_PORT'),
//       auth: {
//         user: this.config.get('SMTP_USER'),
//         pass: this.config.get('SMTP_PASS'),
//       },
//     });
//   }

//   async sendUserConfirmation(user: User, token: string) {
//     const url = `${this.config.get('SERVER_URL')}/auth/activate?token=${token}`;
//     const emailHtml = `<p>Hey ${user.pseudo},</p>
//         <p>Your requested an account creation on Bela Artisanat</p>
//             <a href='${url}'>Click here to activate your account</a>
//         <p>If you did not request this email, you can safely ignore it.</p>`;

//     await this.transporter.sendMail({
//       from: this.config.get('SMTP_EMAIL'),
//       to: user.email,
//       subject: 'Welcome user! Confirm your Email',
//       html: emailHtml,
//     });
//   }
// }

import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;
  constructor(private readonly config: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.config.get('SMTP_HOST'),
      port: Number(this.config.get('SMTP_PORT')),
      secure: process.env.MAILER_SECURE === 'false',
      auth: {
        user: this.config.get('SMTP_EMAIL'),
        pass: this.config.get('SMTP_PASSWORD'),
      },
    });
  }

  async sendUserConfirmation(user: User, token: string) {
    const url = `${this.config.get('SERVER_URL')}/auth/activate?token=${token}`;
    const emailHtml = `<p>Hey ${user.pseudo},</p>
        <p>Your requested an account creation on Bela Artisanat</p>
            <a href='${url}'>You requested an account creation on Bela Artisanat, click here
            to activate your account</a>
        <p>If you did not request this email you can safely ignore it.</p>`;

    await this.transporter.sendMail({
      from: this.config.get('SMTP_EMAIL'),
      to: user.email,
      subject: 'Welcome user! Confirm your Email',
      html: emailHtml,
    });
  }
}
