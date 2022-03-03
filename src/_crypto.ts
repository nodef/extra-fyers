import crypto from 'crypto';




// DIGEST
// ------

export async function digestSha256Hex(text: string): Promise<string> {
  return crypto.createHash('sha256').update(text).digest('hex');
}
