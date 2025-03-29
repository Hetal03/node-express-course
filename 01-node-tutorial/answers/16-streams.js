
const fs = require('fs');


const readStream = fs.createReadStream('../content/big.txt', {
  encoding: 'utf8',
  highWaterMark: 200  
});


let counter = 0;


readStream.on('data', (chunk) => {
  counter++;
  console.log(`Received chunk #${counter}: ${chunk}`);
});


readStream.on('end', () => {
  console.log(`Stream ended. Total chunks received: ${counter}`);
});


readStream.on('error', (err) => {
  console.error('Error occurred while reading the stream:', err);
});
