import { randomUUID } from "crypto";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { magicLink } from "better-auth/plugins";
import { db } from "@/db/client";
import * as schema from "@/db/schema";
import { userRoles } from "@/db/schema";
import { sendAuthLink } from "@/lib/mail";

const trustedOrigins = [
  "https://dealshare.pl",
  "https://www.dealshare.pl",
  "http://localhost:3000",
  process.env.APP_URL,
  ...(process.env.AUTH_TRUSTED_ORIGINS?.split(",") ?? [])
].filter((origin): origin is string => Boolean(origin?.trim()));

export const auth = betterAuth({
  appName: "Dealshare",
  baseURL: process.env.APP_URL,
  secret: process.env.AUTH_SECRET,
  trustedOrigins,
  database: drizzleAdapter(db, {
    provider: "mysql",
    schema
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    minPasswordLength: 10,
    maxPasswordLength: 128,
    revokeSessionsOnPasswordReset: true,
    sendResetPassword: async ({ user, url }) => {
      await sendAuthLink({ email: user.email, name: user.name, url, purpose: "reset-password" });
    }
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: 60 * 60,
    sendVerificationEmail: async ({ user, url }) => {
      await sendAuthLink({ email: user.email, name: user.name, url, purpose: "verify-email" });
    }
  },
  user: {
    additionalFields: {
      phone: {
        type: "string",
        required: false,
        input: true
      }
    }
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24
  },
  rateLimit: {
    enabled: true,
    window: 60,
    max: 60
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          await db
            .insert(userRoles)
            .values({ id: randomUUID(), userId: user.id, role: "client" })
            .onDuplicateKeyUpdate({ set: { role: "client" } });
        }
      }
    }
  },
  plugins: [
    magicLink({
      expiresIn: 60 * 15,
      storeToken: "hashed",
      sendMagicLink: async ({ email, url }) => {
        await sendAuthLink({ email, url, purpose: "magic-link" });
      }
    }),
    nextCookies()
  ]
});

export type AuthSession = typeof auth.$Infer.Session;
