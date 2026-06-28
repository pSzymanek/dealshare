import { randomUUID } from "node:crypto";
import mysql from "mysql2/promise";

const email = process.argv[2]?.trim().toLowerCase();
const databaseUrl = process.env.DATABASE_URL;

if (!email || !email.includes("@")) {
  throw new Error("Użycie: npm run admin:bootstrap -- adres@dealshare.pl");
}

if (!databaseUrl) {
  throw new Error("Brak zmiennej DATABASE_URL.");
}

const connection = await mysql.createConnection(databaseUrl);

try {
  const [rows] = await connection.execute("SELECT id FROM users WHERE email = ? LIMIT 1", [email]);
  const user = rows[0];

  if (!user) {
    throw new Error("Najpierw zarejestruj konto z tym adresem e-mail.");
  }

  await connection.execute("INSERT IGNORE INTO user_roles (id, user_id, role) VALUES (?, ?, 'admin')", [randomUUID(), user.id]);
  console.log(`Uprawnienia administratora nadane: ${email}`);
} finally {
  await connection.end();
}
