var config = {
  apiKey: "xxxxxxxxxxxxxxxxxxxxxxxx",
  authDomain: "xxxxxxx.firebaseapp.com",
  databaseURL: "https://xxxxxxxx.firebaseio.com",
  projectId: "xxxxxxxxxxx",
  storageBucket: "xxxxxxxxxx.appspot.com",
  messagingSenderId: "xxxxxxxxxxxxxxx"
};
firebase.initializeApp(config);
var database = firebase.database();

const botoes = document.querySelectorAll('.btns');
botoes.forEach(botao => {
  botao.addEventListener("click", function sendData(){
  
    let corDb = database.ref('cor');
    let data = { //creates the object to be storaged on firebase
      r:rgb.r,
      g:rgb.g,
      b:rgb.b,
      label:botao.innerHTML
    }
    corDb.push(data,finished); //push the data
    draw();
  }, false)
});

function finished(err){ //feedback function about sending the data to firebase
  if(err){
    console.error("Something went wrong :S");
    console.error(err);
  }else{
    console.log("Data sucessfully storaged!")
  }
}

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
    ctx.fillStyle = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    ctx.fillRect(0, 0, 150, 150);
  }
}

var firebaseJson;
let colors = [];
$.getJSON("neuralnetjs.json", function(data){
  firebaseJson = data.cor;
  Object.entries(firebaseJson).forEach(( record ) =>{
    col = [record[1].r/255, record[1].g/255, record[1].b/255];
    colors.push(col);
    });
});
console.log(colors);
let xs = tf.tensor3d(colors);
console.log(xs.shape);






  
 








