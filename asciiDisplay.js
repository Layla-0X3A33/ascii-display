const displayData = {
    canvas: {
        width: undefined,
        height: undefined,
        charSize: undefined,
        canvasID: undefined,
        chars: undefined//stores the characters that will be displayed and their color values
    }
}

function setUpCanvas(width, height, charSize, canvasID) {

    if (document.getElementById(canvasID) !== null &&
        displayData.canvas.canvasID === undefined) {

        displayData.canvas.width = width;
        displayData.canvas.height = height;
        displayData.canvas.chars = new Int32Array(width * height);
        displayData.canvas.charSize = charSize;
        displayData.canvas.canvasID = canvasID;
        document.getElementById(canvasID).width = (charSize * 10 / 16) * width;
        document.getElementById(canvasID).height = charSize * height;

    }

}

function transferCharData(x1, y1, width1, height1, chars1, x2, y2, width2, height2, chars2) {
    //this function takes 2 arrays of characters with color data that exist in 2d space,
    //and transfers data from the first to the second where they intersect, however it 
    //does not copy the value 0

    const minX = ((x1 < x2) ? x2 : x1);
    const minY = ((y1 < y2) ? y2 : y1);
    const maxX = (x1 + width1 < x2 + width2) ? x1 + width1 : x2 + width2;
    const maxY = (y1 + height1 < y2 + height2) ? y1 + height1 : y2 + height2;

    for (let i = minX; i < maxX; ++i) {
        for (let j = minY; j < maxY; ++j) {

            alert(i - x2 + (j - y2) * width2);

            if (chars1[i - x1 + (j - x1) * width1] !== 0)
                chars2[i - x2 + (j - y2) * width2] =
                    chars1[i - x2 + (j - y2) * width2];

        }
    }
}