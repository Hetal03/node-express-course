const fs = require("fs");
const path = require("path");

// Ensure the "temporary" directory exists
const dirPath = path.join(__dirname, "temporary");
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

// Define the file path
const filePath = path.join(dirPath, "fileA.txt");

// Write to the file (overwrite if it exists)
fs.writeFileSync(filePath, "This is the first line.\n");

// Append additional lines
fs.writeFileSync(filePath, "This is the second line.\n", { flag: "a" });
fs.writeFileSync(filePath, "This is the third line.\n", { flag: "a" });

// Read the file contents
const fileContents = fs.readFileSync(filePath, "utf8");

// Log the contents
console.log("File Contents:\n", fileContents);
