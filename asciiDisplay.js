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

    if(document.getElementById(canvasID) !== null &&
        displayData.canvas.canvasID === undefined){

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
    //and transfers data from the first to the second where they intersect

    
}
