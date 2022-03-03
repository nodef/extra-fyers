// DIGEST
// ------

export async function digestSha256Hex(text: string): Promise<string> {
  var data   = new TextEncoder().encode(text);
  var buffer = await crypto.subtle.digest('SHA-256', data);
  var bytes  = Array.from(new Uint8Array(buffer));
  return bytes.map(b => b.toString(16).padStart(2, '0')).join('');
  // Reference: https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
}
