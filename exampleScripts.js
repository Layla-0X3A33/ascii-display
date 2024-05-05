const display = new AsciiDisplay(
    config.canvas.width,
    config.canvas.height,
    config.canvas.charSize,
    config.canvas.id
);

const layer1 = display.addDisplayLayer("layer1");
const object1 = layer1.addAsciiObject(0, 0, 2, 1, "object1", [0X3AFFFFFF, 0X33FFFFFF]);

display.camera.x -= 1;
display.camera.y -= 1;

display.drawChars();