import { createHash, randomUUID } from "crypto";
import { and, count, eq, gte } from "drizzle-orm";
import { db } from "@/db/client";
import { submissionRateLimits } from "@/db/schema";

function createFingerprint(request: Request, identity: string) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = forwardedFor || request.headers.get("x-real-ip") || "unknown";
  const secret = process.env.AUTH_SECRET ?? "dealshare-development-rate-limit";
  return createHash("sha256").update(`${ip}|${identity}|${secret}`).digest("hex");
}

export async function checkRateLimit({
  request,
  identity,
  action,
  maxAttempts = 5,
  windowMinutes = 60
}: {
  request: Request;
  identity: string;
  action: string;
  maxAttempts?: number;
  windowMinutes?: number;
}) {
  const fingerprintHash = createFingerprint(request, identity);
  const since = new Date(Date.now() - windowMinutes * 60 * 1000);
  const [{ total }] = await db
    .select({ total: count() })
    .from(submissionRateLimits)
    .where(
      and(
        eq(submissionRateLimits.fingerprintHash, fingerprintHash),
        eq(submissionRateLimits.action, action),
        gte(submissionRateLimits.createdAt, since)
      )
    );

  if (total >= maxAttempts) throw new Error("RATE_LIMITED");

  return {
    fingerprintHash,
    record: {
      id: randomUUID(),
      fingerprintHash,
      action
    }
  };
}
