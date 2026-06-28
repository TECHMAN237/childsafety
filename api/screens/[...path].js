import { serveStaticFromScreens } from "../screensHandler.js";

export default function handler(req, res) {
  const raw = req.query?.path ?? req.params?.path;
  let requestedPath = "/";

  if (raw) {
    requestedPath = Array.isArray(raw)
      ? `/${raw.join("/")}`
      : raw.startsWith("/") ? raw : `/${raw}`;
  }

  // Pass the sanitized path to the screens handler
  return serveStaticFromScreens(req, res, requestedPath);
}
