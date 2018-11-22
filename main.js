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


labelList = [ //used to grab the index of each color
    'amarelo',
    'laranja',
    'vermelho',
    'roxo',
    'azul',
    'verde',
    'cinza',
    'rosa',
    'marrom'
  ]

var firebaseJson;
let colors = [];
let labels = [];
let model;
let xs,ys;
let rSlider, gSlider, bSlider;

$.getJSON("neuralnetjs.json", function(data){
  firebaseJson = data.cor;
 
  Object.entries(firebaseJson).forEach(( record ) =>{ //used to collect all json(database) information
    col = [record[1].r/255, record[1].g/255, record[1].b/255];
    colors.push(col);
    labels.push(labelList.indexOf(record[1].label));
    });

    xs = tf.tensor2d(colors);
    let labelTensor = tf.tensor1d(labels, 'int32');
    ys = tf.oneHot(labelTensor, 9);
    labelTensor.dispose();

    model = tf.sequential();
    let hidden = tf.layers.dense({ //the nn hidden layer
      units: 16, //number of units in the hidden layer
      activation: 'sigmoid',
      inputDim: 3
    });
    let output = tf.layers.dense({ //output layer (number of colors available)
      units: 9,
      activation: 'softmax'
    });
    model.add(hidden);
    model.add(output);
    
    const learningRate = 0.2; // learning rate used by nn
    const optmizer = tf.train.sgd(learningRate);
    model.compile({
      optimizer: optmizer,
      loss: 'categoricalCrossentropy'
    });

    async function train(){ //makes the neural network learn
      const options = {
        epochs: 5, // higher number the more training it will do
        validationSplit: 0.1,
        shuffle: true,
        callbacks: {
          onTrainBegin: () => console.log('training start'),
          onTrainEnd: () => console.log('training complete'),

          onEpochEnd: (num, logs) => { //log each epoch so we know if something glitched
            console.log('Epoch: '+num); 
            console.log('Loss: '+logs.loss);
          }
        }
      }  
      return await model.fit(xs, ys, options)
    }

    train().then(results => { // execute train when page loads
      console.log(results);
    });
});

function drawPredict(){ //creates the prediction canvas color

  let r = document.getElementById('red').value;    //those 3 are the sliders
  let g = document.getElementById('green').value;  // rgb selected by
  let b = document.getElementById('blue').value;   // the user
  var canvas = document.getElementById('canvasPredict');
  var ctx = canvas.getContext('2d');
  randomRGB();
  ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
  ctx.fillRect(0, 0, 150, 150);

  const xs = tf.tensor2d([[r/255, g/255, b/255]]); //normalize the slider rgb data
  let results = model.predict(xs);
  let index = results.argMax(1).dataSync()[0]; //gets index of the color with higher chance of being the correct
  let label = labelList[index]; // gets the label of the higher chance color
  
  var output = document.getElementById('label');
  output.innerHTML = label;
}

$('#red').mousemove(drawPredict); //update the canvas each time some slider is moved
$('#green').mousemove(drawPredict);
$('#blue').mousemove(drawPredict);










  
 








