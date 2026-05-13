import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  message?: string;
};

const contactEmail = process.env.CONTACT_TO_EMAIL ?? "biuro@dealshare.pl";

function clean(value?: string) {
  return value?.trim() ?? "";
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ message: "Nieprawidłowe dane formularza." }, { status: 400 });
  }

  const name = clean(payload.name);
  const email = clean(payload.email);
  const phone = clean(payload.phone);
  const company = clean(payload.company);
  const message = clean(payload.message);

  if (!name || !isValidEmail(email) || message.length < 10) {
    return NextResponse.json({ message: "Uzupełnij imię, poprawny e-mail i wiadomość minimum 10 znaków." }, { status: 400 });
  }

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT ?? 587);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpFrom = process.env.SMTP_FROM ?? contactEmail;

  if (!smtpHost || !smtpUser || !smtpPass) {
    return NextResponse.json({ message: "Formularz będzie dostępny już wkrótce." }, { status: 503 });
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass
    }
  });

  const text = [
    `Imię i nazwisko: ${name}`,
    `E-mail: ${email}`,
    `Telefon: ${phone || "Nie podano"}`,
    `Firma: ${company || "Nie podano"}`,
    "",
    "Wiadomość:",
    message
  ].join("\n");

  try {
    await transporter.sendMail({
      from: smtpFrom,
      to: contactEmail,
      replyTo: email,
      subject: `Nowa wiadomość z dealshare od ${name}`,
      text
    });

    return NextResponse.json({ message: "Dziękujemy. Wiadomość została wysłana." });
  } catch {
    return NextResponse.json({ message: "Nie udało się wysłać wiadomości. Spróbuj ponownie później." }, { status: 500 });
  }
}
