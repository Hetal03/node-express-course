// 08-os-module.js
const os = require("os");

// Get information about the current user
const user = os.userInfo();
console.log("User Info:", user);

// Get the system uptime in seconds
console.log(`System Uptime: ${os.uptime()} seconds`);

// Get the OS type and platform
console.log("Operating System:", os.type());
console.log("Platform:", os.platform());

// Get the OS release version
console.log("OS Release:", os.release());

// Get total system memory in GB
console.log("Total Memory:", (os.totalmem() / 1024 / 1024 / 1024).toFixed(2), "GB");

// Get free memory in GB
console.log("Free Memory:", (os.freemem() / 1024 / 1024 / 1024).toFixed(2), "GB");

// Get system CPU information
console.log("CPU Architecture:", os.arch());
console.log("CPU Cores:", os.cpus().length);
console.log("CPU Model:", os.cpus()[0].model);
