var config = {
    apiKey: "AIzaSyBbP1d0WC9pEz_M_Vq3KeG8kiIAuAjsZfA",
    authDomain: "neuralnetjs.firebaseapp.com",
    databaseURL: "https://neuralnetjs.firebaseio.com",
    projectId: "neuralnetjs",
    storageBucket: "neuralnetjs.appspot.com",
    messagingSenderId: "377751663111"
};

//makes all buttons change the collor of the canvas after clicked
const botoes = document.querySelectorAll('.btns');
botoes.forEach(botao => {
  botao.addEventListener("click", draw, false)
});

firebase.initializeApp(config);
var database = firebase.database();

//creates a random number from 1 to 255
function randomColor(){
    number = Math.random(); 
    number = number*255; 
    number = Math.floor(number); 
    return number; 
}

//creates a rgb number and return as a object
function randomRGB(){
  red = randomColor();
  green = randomColor();
  blue = randomColor();
  return rgb = {
    r:red,
    g:green,
    b:blue
  };
}

//draws in html a square with a random rgb color
function draw() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {    
    var ctx = canvas.getContext('2d');
    randomRGB();
    console.log(rgb);
    ctx.fillStyle = `rgb(${rgb.r}, ${rgb.b}, ${rgb.g})`; //rgb aparentemente tá errado
    ctx.fillRect(0, 0, 150, 150);
  }
}

