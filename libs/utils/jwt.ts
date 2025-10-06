import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

/**
 * Generates a signed JWT for a given user ID
 */
export function generateToken(userId: string) {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "7d" });
}

/**
 * Verifies a JWT and returns the payload
 */
export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET);
}
