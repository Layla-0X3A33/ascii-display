# ascii projects:
## [asciiDisplay](/asciiDisplay.js)
### what the file does:
This file contains the code for an ascii based display system that runs on JS and HTML.
The display works by displaying a matrix of ascii characters of given colors of a specified size onto a canvas.
**Characters are stored in Int32Arrays, the most significant byte stores the ascii code, the next 3 bytes store the color**
### how to use it:
1. create a display:
    - make a canvas in HTML and give it an ID, when you make an instance of AsciiDisplay, you must pass the ID of that canvas as canvasID
    - make a new instance of the AsciiDisplay class. **width and height in are measured in characters, not pixels. charSize, however is measured in pixels.**
    - for example `const display = new AsciiDisplay(16, 10, 16, "canvas")`
2. create display layers:
    - call the addDisplayLayer method of your instance of AsciiDisplay
    - for example `const layer1 = display.addDisplayLayer("layer1)`
3. create asciiObjects in the display layer:
    - call the addAsciiObject method of the displayLayer
    - for example `const object1 = layer1.addAsciiObject(0, 0, 2, 1, "object1", [0X3AFFFFFF, 0X33FFFFFF]);`
4. display the ascii on the canvas by calling the drawChars method of your instance of AsciiDisplay `display.drawChars();`
5. adding shaders:
    - shaders are functions that take an array that represents the characters of one specific thing ( AsciiDisplays, DisplayLayers, and AsciiObjects ) and return an new array of the same size
    - shaders can be added by `example.shader = shaderFunction;`
