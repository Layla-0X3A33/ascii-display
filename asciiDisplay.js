const displayData = {
    canvas: {
        width: undefined,
        height: undefined,
        charSize: undefined,
        canvasID: undefined
    }
}

function setUpCanvas(width, height, charSize, canvasID) {

    if(document.getElementById(canvasID) !== null &&
        displayData.canvas.canvasID === undefined){

        displayData.canvas.width = width;
        displayData.canvas.height = height;
        displayData.canvas.charSize = charSize;
        displayData.canvas.canvasID = canvasID;
        document.getElementById(canvasID).width = (charSize * 10 / 16) * width;
        document.getElementById(canvasID).height = charSize * height;   
    
    }

}

