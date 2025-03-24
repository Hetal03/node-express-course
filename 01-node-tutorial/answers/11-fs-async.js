const fs = require("fs");
const path = require("path");

console.log("Script started.");

// Ensure the "temporary" directory exists
const dirPath = path.join(__dirname, "temporary");
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

// Define the file path
const filePath = path.join(dirPath, "fileB.txt");

// Write the first line
fs.writeFile(filePath, "This is line 1\n", (err) => {
    if (err) {
        return console.error("Error writing line 1:", err);
    }
    console.log("Line 1 written.");

    // Write the second line
    fs.writeFile(filePath, "This is line 2\n", { flag: "a" }, (err) => {
        if (err) {
            return console.error("Error writing line 2:", err);
        }
        console.log("Line 2 written.");

        // Write the third line
        fs.writeFile(filePath, "This is line 3\n", { flag: "a" }, (err) => {
            if (err) {
                return console.error("Error writing line 3:", err);
            }
            console.log("Line 3 written.");

            // Read and display the file contents
            fs.readFile(filePath, "utf8", (err, data) => {
                if (err) {
                    return console.error("Error reading file:", err);
                }
                console.log("\nFinal File Contents:\n", data);
            });
        });
    });
});

console.log("Script execution continues...");
