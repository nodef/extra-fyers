import crypto from 'crypto';



// SHA256
// ------

/**
 * Get SHA256 digest of data in hex.
 * @param data string data
 * @returns SHA256 digest in hex
 */
export function sha256DigestHex(data: string): string {
  return crypto.createHash('sha256').update(data).digest('hex');
}
