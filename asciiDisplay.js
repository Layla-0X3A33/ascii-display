class AsciiDisplay {

    #width;
    #height;
    #charSize;
    #ctx;
    #displayLayers;

    constructor(width, height, charSize, canvasID) {

        this.#width = width;
        this.#height = height;
        this.chars = new Int32Array(width * height);
        this.#charSize = charSize;
        document.getElementById(canvasID).width = (charSize * 10 / 16) * width;
        document.getElementById(canvasID).height = charSize * height;
        this.#ctx = document.getElementById(canvasID).getContext("2d");
        this.#ctx.font = displayData.#charSize + "px monospace";
        this.#displayLayers = {};

    }

    drawChars() {
        for (let i = 0; i < this.#width; ++i) {
            for (let j = 0; j < this.#height; ++j) {
    
                this.#ctx.fillStyle = "#" +
                    (this.chars[i + j * this.#width] & 0XFFFFFF).toString(16);
    
                this.#ctx.fillText(
                    String.fromCharCode(
                        (this.chars[i + j * this.#width] & 0XFF000000) >>> 24
                    ),
                    i * (this.#charSize * 10 / 16),
                    j * this.#charSize + (this.#charSize * 14 / 16)
                );
            }
        }
    }

    addDisplayLayer(layerName, ){
        this.#displayLayers[layerName] = new DisplayLayer();
    }

    removeDisplayLayer(layerName){

    }
}

class DisplayLayer{
    constructor(){
        
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

            if (chars1[i - x1 + (j - x1) * width1] !== 0)
                chars2[i - x2 + (j - y2) * width2] =
                    chars1[i - x2 + (j - y2) * width2];

        }
    }
}