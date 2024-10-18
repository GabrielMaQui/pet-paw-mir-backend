import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";
import { getHTMLTemplate } from "../templates/credential.js";

export async function sendVerificationEmail(email: string, name: string, token: string) {
  const mailerSend = new MailerSend({
    apiKey: process.env.API_KEY_EMAIL || "",
  });

  const sentFrom = new Sender("MS_EZBgjx@trial-jpzkmgq2y9ng059v.mlsender.net", "PET PAWS");

  const recipients = [
    new Recipient(email, "Nuevo Usuario")
  ];

  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setSubject("Email Verification")
    .setHtml(getHTMLTemplate(name, token));


  await mailerSend.email.send(emailParams);
}
