import { serveStaticFromScreens } from "../screensHandler.js";

export default async function handler(req, res) {
  try {
    // Safely parse incoming path variants from Vercel's catch-all proxy
    const raw = req.query?.path ?? req.params?.path;
    let requestedPath = "/";

    if (raw) {
      requestedPath = Array.isArray(raw)
        ? `/${raw.join("/")}`
        : raw.startsWith("/") ? raw : `/${raw}`;
    }

    // Execute the screens handler safely inside the serverless execution context
    return serveStaticFromScreens(req, res, requestedPath);
  } catch (error) {
    console.error("CRITICAL: Serverless Function Invocation Failure:", error);

    // Fallback response to prevent the serverless container from abruptly exiting
    return res.status(502).json({
      error: "FUNCTION_INVOCATION_FAILED",
      message: "An unhandled exception occurred within the cloud execution environment.",
      details: error?.message
    });
  }
}
