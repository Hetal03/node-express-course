const http = require("http");

// Create an HTTP server
const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "text/html");

    if (req.url === "/") {
        res.write("<h1>Welcome to the Home Page</h1>");
    } else if (req.url === "/about") {
        res.write("<h1>About Us</h1><p>This is a simple Node.js server.</p>");
    } else if (req.url === "/contact") {
        res.write("<h1>Contact</h1><p>Email: contact@example.com</p>");
    } else {
        res.statusCode = 404;
        res.write("<h1>404 Not Found</h1><p>The page you requested does not exist.</p>");
    }
    
    res.end(); // End response
});

// Start the server on port 3000
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
