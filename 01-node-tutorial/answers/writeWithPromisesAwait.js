
const { writeFile, readFile } = require("fs").promises;

mp.txt
const writer = async () => {
  try {

    await writeFile("temp.txt", "First line\n", { flag: "w" });  // 'w' flag will overwrite the file.
    await writeFile("temp.txt", "Second line\n", { flag: "a" }); // 'a' flag will append to the file.
    await writeFile("temp.txt", "Third line\n", { flag: "a" });
    
    console.log("✅ File written successfully.");
  } catch (error) {
    console.error("❌ Error writing file:", error);
  }
};


const reader = async () => {
  try {
    // Reading the file 'temp.txt'.
    const data = await readFile("temp.txt", "utf8"); 
    console.log("📖 File content:\n", data);
  } catch (error) {
    console.error("❌ Error reading file:", error);
  }
};

const readWrite = async () => {
  await writer(); 
  await reader(); 
};


readWrite();
