const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const directoryToServe = path.join(__dirname, 'screens');

const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);

    // Default to splash_screen.tsx if root is requested
    let filePath = req.url === '/' ? '/splash_screen.tsx' : req.url;
    
    // Remove query parameters if any
    filePath = filePath.split('?')[0];

    // Build the absolute path
    const absolutePath = path.join(directoryToServe, filePath);

    fs.exists(absolutePath, (exists) => {
        if (!exists) {
            res.writeHead(404);
            res.end(`File not found: ${filePath}`);
            return;
        }

        fs.readFile(absolutePath, (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end(`Error reading file: ${err}`);
                return;
            }

            const ext = path.extname(absolutePath).toLowerCase();
            const contentTypes = {
                '.css': 'text/css; charset=utf-8',
                '.tsx': 'text/html; charset=utf-8',
                '.html': 'text/html; charset=utf-8',
            };
            const contentType = contentTypes[ext] || 'text/html; charset=utf-8';
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        });
    });
});

server.listen(PORT, () => {
    console.log(`\n🚀 Local server running!`);
    console.log(`👉 Open http://localhost:${PORT} in your browser to view the app.`);
    console.log(`(Serving files from the /screens directory)`);
    console.log(`Press Ctrl+C to stop.`);
});
