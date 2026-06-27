import fs from "fs";
import path from "path";

const screensDir = path.join(process.cwd(), "screens");

function contentTypeFor(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case ".css":
      return "text/css; charset=utf-8";
    case ".tsx":
    case ".html":
      return "text/html; charset=utf-8";
    default:
      return "application/octet-stream";
  }
}

export function serveStaticFromScreens(req, res, requestedPath) {
  const filePath = requestedPath.startsWith("/")
    ? requestedPath.slice(1)
    : requestedPath;

  const absolutePath = path.join(screensDir, filePath);

  // Prevent path traversal
  const normalized = path.normalize(absolutePath);
  if (!normalized.startsWith(path.normalize(screensDir))) {
    res.status(400).send("Bad Request");
    return;
  }

  if (!fs.existsSync(absolutePath)) {
    res.status(404).send(`File not found: ${requestedPath}`);
    return;
  }

  const data = fs.readFileSync(absolutePath);
  res.setHeader("Content-Type", contentTypeFor(absolutePath));
  res.status(200).send(data);
}
