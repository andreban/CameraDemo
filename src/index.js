import Camera from "./Camera.js";
import Input from "./Input.js";
import Triangle from "./triangle.js";

const CAMERA_TRANSLATION_SPEED = 5.0;
const CAMERA_ROTATION_SPEED = 120;
const CAMERA_ZOOM_SPEED = 1.01;

let clock = {
  previousFrame: 0,
  currentFrame: 0,
  elapsed: 0,
  elapsedSeconds: 0,
};

class App {
  constructor(canvas) {
    this.input = new Input(document);
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.camera = new Camera(800, 600);
    this.blackTriangle = new Triangle(0, 0, 1, "#000000");
    this.redTriangle = new Triangle(-1.5, 0, 0.5, "#FF0000");
  }

  update(clock) {
    this.redTriangle.rotate(30 * clock.elapsedSeconds);
    this.blackTriangle.rotate(-60 * clock.elapsedSeconds);

    if (this.input.inputState.left) {
      this.camera.translate(-CAMERA_TRANSLATION_SPEED * clock.elapsedSeconds, 0);
    }

    if (this.input.inputState.right) {
      this.camera.translate(CAMERA_TRANSLATION_SPEED * clock.elapsedSeconds, 0);
    }

    if (this.input.inputState.up) {
      this.camera.translate(0, -CAMERA_TRANSLATION_SPEED * clock.elapsedSeconds);
    }

    if (this.input.inputState.down) {
      this.camera.translate(0, CAMERA_TRANSLATION_SPEED * clock.elapsedSeconds);
    }

    if (this.input.inputState.rotateCw) {
      this.camera.rotate(CAMERA_ROTATION_SPEED * clock.elapsedSeconds);
    }

    if (this.input.inputState.rotateCcw) {
      this.camera.rotate(-CAMERA_ROTATION_SPEED * clock.elapsedSeconds);
    }

    if (this.input.inputState.zoomIn) {
      this.camera.zoomlevel(this.camera.zoom * CAMERA_ZOOM_SPEED);
    }

    if (this.input.inputState.zoomOut) {
      this.camera.zoomlevel(this.camera.zoom / CAMERA_ZOOM_SPEED);
    }
  }

  draw() {
    this.context.color = "#CCCCCC";
    this.context.fillStyle = "#CCCCCC";
    this.context.fillRect(0, 0, 800, 600);

    const viewProjection = this.camera.createViewProjection();
    this.blackTriangle.draw(this.context, viewProjection);
    this.redTriangle.draw(this.context, viewProjection);
  }
}

const canvas = document.querySelector("#canvas");
const app = new App(canvas);


const updateApp = (time) => {
  // Calculate frame timing.
  clock.previousFrame = clock.currentFrame;
  clock.currentFrame = time;
  clock.elapsed = clock.currentFrame - clock.previousFrame;
  clock.elapsedSeconds = clock.elapsed / 1000.0;

  app.update(clock);
  app.draw();
  requestAnimationFrame(updateApp);
};
updateApp(0);
