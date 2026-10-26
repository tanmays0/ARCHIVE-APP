/** Encode remote image URIs so Android loaders don't treat `+` as spaces. */
export function safeImageUri(uri: string): string {
  if (!uri) return uri;
  try {
    return encodeURI(decodeURI(uri)).replace(/\+/g, '%2B');
  } catch {
    return uri.replace(/\+/g, '%2B');
  }
}
