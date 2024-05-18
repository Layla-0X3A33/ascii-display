const config = {
  canvas: {
    width: 100,
    height: 35,
    charSize: 16,
    id: "Canvas"
  }
};

const display = new AsciiDisplay(
  config.canvas.width,
  config.canvas.height,
  config.canvas.charSize,
  config.canvas.id
);

const layer1 = display.addUiLayer(3, 3, "layer1");

const ui = [
  layer1.addAsciiObject(1, 1, 11, 3, 0, 0, 3, 1, makeBox(11, 3)),
  layer1.addAsciiObject(1, 5, 3, 3, 0, 1, 1, 1, makeBox(3, 3)),
  layer1.addAsciiObject(5, 5, 7, 3, 1, 1, 2, 1, makeBox(7, 3)),
  layer1.addAsciiObject(1, 9, 3, 3, 0, 2, 1, 1, makeBox(3, 3)),
  layer1.addAsciiObject(5, 9, 3, 3, 1, 2, 1, 1, makeBox(3, 3)),
  layer1.addAsciiObject(9, 9, 3, 3, 2, 2, 1, 1, makeBox(3, 3))
];

ui[0].shader = turnRed;
ui[1].shader = turnRed;
ui[2].shader = turnRed;
ui[3].shader = turnRed;
ui[4].shader = turnRed;
ui[5].shader = turnRed;
layer1.highlight(0);

display.drawChars();

function turnRed(chars, info) {
  const temp = new Int32Array(chars);

  if (info.highlighted === true) {
    for (let i = temp.length; i-- > 0;) {
      temp[i] &= 0XFFFF0000;
    }
  }

  return temp;
}

window.addEventListener("keydown", (e) => {

  switch (e.key) {
    case "ArrowUp":
      layer1.navUp();
      break;
    case "ArrowDown":
      layer1.navDown();
      break;
    case "ArrowLeft":
      layer1.navLeft();
      break;
    case "ArrowRight":
      layer1.navRight();
      break;
    default:
      break;
  }
  
  display.drawChars();

})