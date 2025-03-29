const http = require("http");
var StringDecoder = require("string_decoder").StringDecoder;

const getBody = (req, callback) => {
  const decode = new StringDecoder("utf-8");
  let body = "";
  req.on("data", function (data) {
    body += decode.write(data);
  });
  req.on("end", function () {
    body += decode.end();
    const body1 = decodeURI(body);
    const bodyArray = body1.split("&");
    const resultHash = {};
    bodyArray.forEach((part) => {
      const partArray = part.split("=");
      resultHash[partArray[0]] = partArray[1];
    });
    callback(resultHash);
  });
};

// here, you could declare one or more variables to store what comes back from the form.
//let item = "Enter something below.";
// **New Variables for Game Logic**
// **1. Random number generator (initial game number)**
let randomNumber = Math.floor(Math.random() * 100) + 1; // **Random number between 1 and 100**

let attempts = 0; // **Tracks the number of attempts made by the user**
let message = "Guess a number between 1 and 100:"; 
// here, you can change the form below to modify the input fields and what is displayed.
// This is just ordinary html with string interpolation.
const form = () => {
  return `
  <body>
  <h1>Number Guessing Game</h1>
  <p>${message}</p>
  <p>Attempts: ${attempts}</p>  <!-- **Displays number of attempts** -->
  <form method="POST">
  <input name="guess" type="number" min="1" max="100" required/>  <!-- **User input for guess** -->
  <button type="submit">Submit Guess</button>
  </form>
  </body>
  `;
};

const server = http.createServer((req, res) => {
  console.log("req.method is ", req.method);
  console.log("req.url is ", req.url);
  if (req.method === "POST") {
    getBody(req, (body) => {
      console.log("The body of the post is ", body);
      attempts++;  // **Increase attempts with each guess**
      // here, you can add your own logic
      if (body["guess"]) {
       // item = body["item"];
       const userGuess = parseInt(body["guess"]); // **Convert string guess to number**

       if (userGuess < randomNumber) {
        message = "Your guess is too low!";
      } else if (userGuess > randomNumber) {
        message = "Your guess is too high!";
      } else {
        message = "Congratulations! You've guessed the correct number!";
        attempts = 0; // **Reset attempts after correct guess**
        randomNumber = Math.floor(Math.random() * 100) + 1; // **Generate new random number after correct guess**
      }
      } else {
        //item = "Nothing was entered.";
        message = "Please enter a valid number.";  // **Feedback when no guess is made**
      }
      // Your code changes would end here
      res.writeHead(303, {
        Location: "/",
      });
      res.end();
    });
  } else {
    res.end(form());
  }
});

// Add the event listener for the 'request' event
server.on("request", (req) => {  
  console.log("event received: ", req.method, req.url);  
});


server.listen(3000);
console.log("The server is listening on port 3000.");
