/** Prefixes a public/ path with the build's basePath, so a preview build can live under a subfolder. */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
export const asset = (p: string) => (p.startsWith('/') ? BASE_PATH + p : p);
