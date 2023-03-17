// Get the canvas element and create a 2D drawing context
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

// Set the canvas width and height to fill the window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Create a Symbol class with properties and a draw method
class Symbol{
    constructor(x,y,fontSize,canvasHeight){
        // Set a string of characters to be displayed randomly
        this.characters = '♠︎♣︎♥︎♦';
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        this.text = '';
        this.canvasHeight = canvasHeight;
    }
    draw(context){
        // Choose a random character from the string and draw it at the x and y position
        this.text = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
        context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);
        
        // If the symbol goes beyond the canvas height, reset the position
        if(this.y * this.fontSize > this.canvasHeight && Math.random() > 0.98){
            this.y = 0;
        }else{
            this.y += 1;
        }
    }
}

// Create an Effect class with properties and a method to initialize symbols
class Effect{
    constructor(canvasWidth, canvasHeight){
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.fontSize = 25;
        this.cols = this.canvasWidth/this.fontSize;
        this.symbols = [];
        this.#init(); // Initialize symbols
    }
    #init(){ // Private method to initialize symbols
        for(let i = 0; i< this.cols; i++){
            this.symbols[i] = new Symbol(i,0,this.fontSize,this.canvasHeight);
        }
    }
    resize(width, height){ // Method to resize the canvas and symbols
        this.canvasWidth = width;
        this.canvasHeight = height;
        this.cols = this.canvasWidth/this.fontSize;
        this.symbols = [];
        this.#init(); // Re-initialize symbols
    }
}

// Create an instance of Effect with the canvas dimensions
const effect = new Effect(canvas.width, canvas.height);

let lastTime = 0;
const fps = 30;
const nextFrame = 1000/fps;
let timer = 0;

// The main animation loop function
function animate(timeStamp){
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    if(timer > nextFrame){
        // Set a black background with low opacity to create a trailing effect
        ctx.fillStyle = 'rgba(0,0,0,0.05)'
        ctx.textAlign = 'center';
        ctx.fillRect(0,0, canvas.width, canvas.height);
        
        // Set the font color and size, and draw each symbol
        ctx.fillStyle = '#FF6B6B';
        ctx.font = `${effect.fontSize}px monospace`
        effect.symbols.forEach(symbol => symbol.draw(ctx));
        timer = 0
    }else{
        timer+=deltaTime;
    }
    
    requestAnimationFrame(animate); // Call the function recursively to create a smooth animation
}

animate(0); // Call the function to start the animation

// Add an event listener to resize the canvas and symbols when the window is resized
window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    effect.resize(canvas.width,canvas.height)
})
