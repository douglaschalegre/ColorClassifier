
function randomColor() {
  number = Math.random(); // gets a number from 0 to 1
  number = number * 255; // transforming it into rgb
  number = Math.ceil(number); // ceils it so it is a int
  return number;
}

function draw() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');

    let r = randomColor();
    let g = randomColor();
    let b = randomColor();
    ctx.fillStyle = `rgb(${r}, ${b}, ${g})`;
    ctx.fillRect(0, 0, 100, 100);
  }
}

const botoes = document.querySelectorAll('.btns');
botoes.forEach(botao => {
  botao.addEventListener("click", draw, false)
})