import { serveStaticFromScreens } from "./screensHandler.js";

export default function handler(req, res) {
  // Default landing page (matches existing server.js behavior)
  return serveStaticFromScreens(req, res, "/splash_screen.tsx");
}
