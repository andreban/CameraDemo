import Camera from "./Camera.js";
import Input from "./Input.js";
import Triangle from "./triangle.js";

const TRANSLATE_SPEED = 0.01;

class App {
  constructor(canvas) {
    this.input = new Input(document);
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.camera = new Camera(800, 600);
    this.blackTriangle = new Triangle(0, 0, 1, "#000000");
    this.redTriangle = new Triangle(-1.5, 0, 0.5, "#FF0000");
  }

  update() {
    this.redTriangle.rotate(1);
    this.blackTriangle.rotate(-0.5);

    if (this.input.inputState.left) {
      this.camera.translate(-TRANSLATE_SPEED, 0);
    }

    if (this.input.inputState.right) {
      this.camera.translate(TRANSLATE_SPEED, 0);
    }

    if (this.input.inputState.up) {
      this.camera.translate(0, -TRANSLATE_SPEED);
    }

    if (this.input.inputState.down) {
      this.camera.translate(0, TRANSLATE_SPEED);
    }

    if (this.input.inputState.rotateCw) {
      this.camera.rotate(1);
    }

    if (this.input.inputState.rotateCcw) {
      this.camera.rotate(-1);
    }

    if (this.input.inputState.zoomIn) {
      this.camera.zoomlevel(this.camera.zoom * 1.01);
    }

    if (this.input.inputState.zoomOut) {
      this.camera.zoomlevel(this.camera.zoom / 1.01);
    }
  }

  draw() {
    this.context.color = "#CCCCCC";
    this.context.fillStyle = "#CCCCCC";
    this.context.fillRect(0, 0, 800, 600);

    // const viewProjection = this.camera.createProjectionMatrix();
    // console.log(viewProjection);
    const viewTransform = this.camera.createViewProjection();
    this.blackTriangle.draw(this.context, viewTransform);
    this.redTriangle.draw(this.context, viewTransform);
  }
}

const canvas = document.querySelector("#canvas");
const app = new App(canvas);

const updateApp = () => {
  app.update();
  app.draw();
  requestAnimationFrame(updateApp);
};
updateApp();
