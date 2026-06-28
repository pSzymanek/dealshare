import nodemailer from "nodemailer";

const contactEmail = process.env.CONTACT_TO_EMAIL ?? "biuro@dealshare.pl";

function getSmtpConfig() {
  const host = process.env.SMTP_HOST ?? process.env.MAIL_HOST;
  const port = Number(process.env.SMTP_PORT ?? process.env.MAIL_PORT ?? 587);
  const user = process.env.SMTP_USER ?? process.env.MAIL_USER;
  const pass = process.env.SMTP_PASS ?? process.env.MAIL_PASSWORD;
  const from = process.env.SMTP_FROM ?? process.env.MAIL_FROM ?? `Dealshare <${contactEmail}>`;

  if (!host || !user || !pass) return null;

  return { host, port, user, pass, from };
}

export function isMailConfigured() {
  return Boolean(getSmtpConfig());
}

export async function sendMail({
  to,
  subject,
  text,
  html,
  replyTo
}: {
  to: string | string[];
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
}) {
  const config = getSmtpConfig();

  if (!config) {
    throw new Error("SMTP_NOT_CONFIGURED");
  }

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.port === 465,
    auth: {
      user: config.user,
      pass: config.pass
    }
  });

  await transporter.sendMail({
    from: config.from,
    to,
    subject,
    text,
    html,
    replyTo,
    disableFileAccess: true,
    disableUrlAccess: true
  });
}

export async function sendAuthLink({
  email,
  name,
  url,
  purpose
}: {
  email: string;
  name?: string | null;
  url: string;
  purpose: "magic-link" | "verify-email" | "reset-password";
}) {
  const content = {
    "magic-link": {
      subject: "Bezpieczne logowanie do Dealshare",
      heading: "Wejdź do panelu Dealshare",
      action: "Zaloguj się do panelu"
    },
    "verify-email": {
      subject: "Potwierdź adres e-mail w Dealshare",
      heading: "Potwierdź swój adres e-mail",
      action: "Potwierdź e-mail"
    },
    "reset-password": {
      subject: "Ustaw nowe hasło w Dealshare",
      heading: "Ustaw nowe hasło",
      action: "Ustaw nowe hasło"
    }
  }[purpose];
  const greeting = name?.trim() ? `Dzień dobry ${name.trim()},` : "Dzień dobry,";
  const text = `${greeting}\n\n${content.heading}. Link jest jednorazowy i ma ograniczony czas ważności:\n${url}\n\nJeśli to nie Ty rozpocząłeś tę operację, zignoruj wiadomość.`;
  const html = `
    <div style="font-family:Arial,sans-serif;color:#10233f;line-height:1.6;max-width:620px">
      <p>${greeting}</p>
      <h1 style="color:#001f4d;font-size:26px">${content.heading}</h1>
      <p>Użyj poniższego przycisku. Link jest jednorazowy i ma ograniczony czas ważności.</p>
      <p style="margin:28px 0"><a href="${url}" style="display:inline-block;background:#005bff;color:#fff;padding:13px 20px;border-radius:6px;text-decoration:none;font-weight:700">${content.action}</a></p>
      <p style="font-size:13px;color:#64748b">Jeśli to nie Ty rozpocząłeś tę operację, zignoruj wiadomość.</p>
    </div>`;

  await sendMail({ to: email, subject: content.subject, text, html });
}

export { contactEmail };
