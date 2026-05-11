import bcrypt from "bcryptjs";

const SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS ?? (process.env.NODE_ENV === "production" ? 10 : 4));

function isBcryptHash(value) {
  return typeof value === "string" && (value.startsWith("$2a$") || value.startsWith("$2b$") || value.startsWith("$2y$"));
}

export async function hashPassword(password) {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(plainPassword, storedPassword) {
  if (!plainPassword || !storedPassword) {
    return false;
  }
  if (isBcryptHash(storedPassword)) {
    return bcrypt.compare(plainPassword, storedPassword);
  }
  // Backward compatibility for legacy plain-text records.
  return plainPassword === storedPassword;
}
