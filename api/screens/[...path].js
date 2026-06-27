import { serveStaticFromScreens } from "../screensHandler.js";

export default function handler(req, res) {
  // Vercel passes route params like: { params: { path: ['foo','bar'] } }
  // Depending on runtime, req may contain req.query.path as string[]|string.
  const raw = req.query?.path ?? req.params?.path;
  const requestedPath =
    raw === undefined ? "/" : Array.isArray(raw) ? `/${raw.join("/")}` : `/${raw}`;

  // Remove query params behavior similar to server.js
  // (Vercel already strips query, but keep consistent)
  return serveStaticFromScreens(req, res, requestedPath);
}
