const display = new AsciiDisplay(
    config.canvas.width,
    config.canvas.height,
    config.canvas.charSize,
    config.canvas.id
);

const layer1 = display.addDisplayLayer("layer1");
const object1 = new AsciiObject(0, 0, 2, 2, [0X3AFFFFFF, 0X33FFFFFF, 0X3AFF0000, 0X33FFFFFF]);

layer1.addAsciiObject = object1;

display.camera.x -= 1;
display.camera.y -= 1;

display.drawChars();