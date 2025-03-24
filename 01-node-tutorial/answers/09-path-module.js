const path = require("path");

// Joining path segments
const filePath = path.join("Users", "Hetal Jhala", "node-express-course", "01-node-tutorial", "answers");

console.log("Joined Path:", filePath);

// Absolute path (optional)
const absolutePath = path.resolve(__dirname, "09-path-module.js");
console.log("Absolute Path:", absolutePath);
