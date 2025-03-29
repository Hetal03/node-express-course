
const { writeFile, readFile } = require("fs").promises;

writeFile("temp.txt", "First line\n", { flag: "w" }) 
  .then(() => {
    console.log("First line written");
    return writeFile("temp.txt", "Second line\n", { flag: "a" }); 
  })
  .then(() => {
    console.log("Second line written");
    return writeFile("temp.txt", "Third line\n", { flag: "a" }); 
  })
  .then(() => {
    console.log("Third line written");
    return readFile("temp.txt", "utf8"); 
  })
  .then((data) => {
    console.log("📖 File content:\n", data); 
  })
  .catch((error) => {
    console.log("❌ An error occurred:", error); 
  });
