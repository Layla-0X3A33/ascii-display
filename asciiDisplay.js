class AsciiDisplay {

    #width;
    #height;
    #charSize;
    #ctx;
    #chars;
    #shader;
    #hasShader;

    constructor(width, height, charSize, canvasID) {

        this.#width = width;
        this.#height = height;
        this.#chars = new Int32Array(width * height);
        this.#charSize = charSize;
        document.getElementById(canvasID).width = (charSize * 10 / 16) * width;
        document.getElementById(canvasID).height = charSize * height;
        this.#ctx = document.getElementById(canvasID).getContext("2d");
        this.#ctx.font = this.#charSize + "px monospace";
        this.displayLayers = {};
        this.camera = { x: 0, y: 0 };
    }

    get width() {
        return this.#width;
    }

    get height() {
        return this.#height;
    }

    drawChars() {
        for(let i = this.#width * this.#height; i-- > 0;){
            this.#chars[0] = 0;
        }

        for (layer in this.displayLayers) {
            temp = this.displayLayers[layer];
            transferCharData(
                temp.x, temp.y, temp.width, temp.height, temp.shadedChars,
                0, 0, this.#width, this.#height, this.#chars
            )
        }

        if(this.#hasShader)this.#chars = this.#shader(this.#chars);

        for (let i = 0; i < this.#width; ++i) {
            for (let j = 0; j < this.#height; ++j) {

                this.#ctx.fillStyle = "#" +
                    (this.#chars[i + j * this.#width] & 0XFFFFFF).toString(16);

                this.#ctx.fillText(
                    String.fromCharCode(
                        (this.#chars[i + j * this.#width] & 0XFF000000) >>> 24
                    ),
                    i * (this.#charSize * 10 / 16),
                    j * this.#charSize + (this.#charSize * 14 / 16)
                );
            }
        }
    }

    addDisplayLayer(layerName) {
        const layer = new DisplayLayer(this.#width, this.#height, this.camera)
        this.displayLayers[layerName] = layer;
        return layer;
    }

    removeDisplayLayer(layerName) {
        delete this.displayLayers[layerName];
    }

    set shader(shaderFunction) {
        if (typeof shaderFunction === "function") {
            this.#shader = shaderFunction;
        };
        this.#hasShader = true;
    }

    removeShader() {
        this.#hasShader = false;
    }

}

class DisplayLayer {

    #chars;
    #shader;
    #hasShader;
    #width;
    #height;

    constructor(width, height, camera) {
        this.#width = width;
        this.#height = height;
        this.#chars = new Int32Array(width, height);
        this.#shader = undefined;
        this.#hasShader = false;
        this.asciiObjects = [];
        this.display = true;
        this.camera = camera;
        this.relativePosition = true;
    }

    set shader(shaderFunction) {
        if (typeof shaderFunction === "function") {
            this.#shader = shaderFunction;
        };
        this.#hasShader = true;
    }

    removeShader() {
        this.#hasShader = false;
    }

    set addAsciiObject(asciiObject) {
        this.asciiObjects.push(asciiObject);
    }

    get layerAscii() {
        for (let i = this.#width * this.#height; i-- > 0;) {
            this.#chars[i] = 0;
        }
        for (let i = 0; i > this.asciiObjects.length; ++i) {
            const temp = this.asciiObjects[i];
            transferCharData(
                temp.x, temp.y, temp.width, temp.height, temp.shadedChars,
                ((this.relativePosition) ? this.camera.x : 0),
                ((this.relativePosition) ? this.camera.y : 0),
                this.#width, this.#height, this.#chars
            );
        }
    }

    get shadedChars() {
        return (this.#hasShader) ? this.#shader(this.#chars) : this.#chars;
    }
}

class AsciiObject {

    #shader;
    #hasShader;
    #chars;

    constructor(x, y, width, height, chars) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        if (chars.length === (width * height))
            this.#chars = new Int32Array(chars);
        else
            this.#chars = new Int32Array(width * height);
    }

    set shader(shaderFunction) {
        if (typeof shaderFunction === "function") {
            this.#shader = shaderFunction;
        };
        this.#hasShader = true;
    }

    removeShader() {
        this.#hasShader = false;
    }

    get shadedChars() {
        return (this.#hasShader) ? this.#shader(this.#chars) : this.#chars;
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