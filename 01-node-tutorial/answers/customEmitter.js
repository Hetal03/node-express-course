const EventEmitter = require('events');  

const emitter = new EventEmitter();


emitter.on('greeting', (name) => {
  console.log(`Hello, ${name}!`);
});


emitter.on('addNumbers', (a, b) => {
  console.log(`The sum of ${a} and ${b} is ${a + b}`);
});


setInterval(() => {
  emitter.emit('timer', 'Time is up!');
}, 3000);  


emitter.on('timer', (msg) => {
  console.log(msg);
});


emitter.on('triggerAnotherEvent', () => {
  console.log('Another event is being triggered!');
  emitter.emit('greeting', 'Alice'); 
});

// Trigger some events
emitter.emit('greeting', 'John');      
emitter.emit('addNumbers', 5, 10);     
emitter.emit('triggerAnotherEvent');   
