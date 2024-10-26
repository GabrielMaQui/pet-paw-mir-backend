import { EmailParams, MailerSend, Recipient, Sender } from 'mailersend';
import nodemailer from 'nodemailer';

import {
  getHTMLTemplate,
  getHTMLTemplateForPasswordReset,
} from '../templates/credential.js';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendVerificationEmail(
  email: string,
  name: string,
  token: string,
) {
  try {
    console.log('Starting to send verification email...');
    console.log('Recipient email:', email);
    console.log('Recipient name:', name);
    console.log('Verification token:', token);

    const mailerSend = new MailerSend({
      apiKey: process.env.API_KEY_EMAIL || '',
    });

    const sentFrom = new Sender(
      'MS_l8qbrq@trial-jpzkmgq2y9ng059v.mlsender.net',
      'PET PAWS',
    );

    const recipients = [new Recipient(email, 'Nuevo Usuario')];

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setSubject('Email Verification')
      .setHtml(getHTMLTemplate(name, token));

    console.log('EmailParams prepared:', emailParams);

    await mailerSend.email.send(emailParams);

    console.log('Verification email sent successfully!');
  } catch (error) {
    console.error('Error sending verification email:', error);
  }
}
export async function sendPasswordResetEmail(
  email: string,
  name: string,
  token: string,
) {
  const mailerSend = new MailerSend({
    apiKey: process.env.API_KEY_EMAIL || '',
  });

  const sentFrom = new Sender(
    'MS_FVVzdK@trial-jpzkmgq2y9ng059v.mlsender.net',
    'PET PAWS',
  );

  const recipients = [new Recipient(email, 'Restablecimiento de Contraseña')];

  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setSubject('Restablecimiento de Contraseña')
    .setHtml(getHTMLTemplateForPasswordReset(name, token));

  await mailerSend.email.send(emailParams);
}

export async function sendVerificationEmailNodeMailer(
  email: string,
  name: string,
  token: string,
) {
  try {
    console.log('Starting to send verification email...');
    console.log('Recipient email:', email);
    console.log('Recipient name:', name);
    console.log('Verification token:', token);

    const mailOptions = {
      from: '"PET PAWS" <noreply@petpaws.com>',
      to: email,
      subject: 'Email Verification',
      text: 'Hola',
      html: getHTMLTemplate(name, token), // Cuerpo del correo en HTML
    };

    console.log('MailOptions prepared:', mailOptions);

    await transporter.sendMail(mailOptions);

    console.log('Verification email sent successfully!');
  } catch (error) {
    console.error('Error sending verification email:', error);
  }
}

export async function sendPasswordResetEmailNodeMailer(
  email: string,
  name: string,
  token: string,
) {
  try {
    const mailOptions = {
      from: '"PET PAWS" <noreply@petpaws.com>',
      to: email,
      subject: 'Restablecimiento de Contraseña',
      html: getHTMLTemplateForPasswordReset(name, token), //
    };

    await transporter.sendMail(mailOptions);

    console.log('Password reset email sent successfully!');
  } catch (error) {
    console.error('Error sending password reset email:', error);
  }
}
