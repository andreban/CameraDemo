export default class Input {
  constructor(document) {
    this.inputState = {
      left: false,
      right: false,
      up: false,
      down: false,
      rotateCw: false,
      rotateCcw: false,
      zoomIn: false,
      zoomOut: false
    };

    document.addEventListener("keydown", (ev) => {
      switch (ev.code) {
        case "KeyA":
          this.inputState.left = true;
          break;
        case "KeyD":
          this.inputState.right = true;
          break;
        case "KeyW":
          this.inputState.up = true;
          break;
        case "KeyS":
          this.inputState.down = true;
          break;
        case "KeyQ":
          this.inputState.rotateCcw = true;
          break;
        case "KeyE":
          this.inputState.rotateCw = true;
          break;
        case "KeyZ":
          this.inputState.zoomOut = true;
          break;
        case "KeyC":
          this.inputState.zoomIn = true;
          break;
        default:
          break;
      }
    });

    document.addEventListener("keyup", (ev) => {
      switch (ev.code) {
        case "KeyA":
          this.inputState.left = false;
          break;
        case "KeyD":
          this.inputState.right = false;
          break;
        case "KeyW":
          this.inputState.up = false;
          break;
        case "KeyS":
          this.inputState.down = false;
          break;
        case "KeyQ":
          this.inputState.rotateCcw = false;
          break;
        case "KeyE":
          this.inputState.rotateCw = false;
          break;
        case "KeyZ":
          this.inputState.zoomOut = false;
          break;
        case "KeyC":
          this.inputState.zoomIn = false;
          break;
        default:
          break;
      }
    });
  }
}
