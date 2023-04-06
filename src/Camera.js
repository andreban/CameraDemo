import Matrix3d from "./Matrix3d";

export default class Camera {
  constructor(screenWidth, screenHeight) {
    this.bounds = { left: 0, top: 0, right: screenWidth, bottom: screenHeight };
    this.translation = [0, 0];
    this.rotation = 0;
    this.zoom = 1;
  }

  translate(xAmount, yAmount) {
    // We need to rotate movement according to the camera rotation, So, first we calculate the
    // magnitude.
    const magnitude = Math.sqrt(Math.pow(xAmount, 2) + Math.pow(yAmount, 2));

    // Then normalized x and y.
    const normalizedX = xAmount / magnitude;
    const normalizedY = yAmount / magnitude;

    // Then calculate the resulting angle for the movement.
    const ang = Math.atan2(normalizedY, normalizedX) * 180 / Math.PI;
  
    // The final rotation is the camera rotationi + the rotation for the movement.
    const movementAngle = this.rotation + ang;

    // Tranform the rotatation to radians and calculate the new x and y from that rotation.
    const radians = movementAngle * (Math.PI / 180.0);
    const sin = Math.sin(radians);
    const cos = Math.cos(radians);

    let x = cos * magnitude;
    let y = sin * magnitude;

    this.translation[0] += x;
    this.translation[1] += y;
  }

  rotate(deg) {
    this.rotation += deg;
  }

  zoomlevel(zoom) {
    this.zoom = zoom;
  }

  // The projection matrix is used to convert from screen coordinates to world coordinates.
  createProjectionMatrix() {
    let a = 2 / (this.bounds.right - this.bounds.left);
    let b = 2 / (this.bounds.bottom - this.bounds.top);
    let c = -(
      (this.bounds.right + this.bounds.left) /
      (this.bounds.right - this.bounds.left)
    );
    let d = -(
      (this.bounds.bottom + this.bounds.top) /
      (this.bounds.bottom - this.bounds.top)
    );
    // prettier-ignore
    return new Matrix3d([
      a, 0, 0,
      0, b, 0,
      c, d, 1,
    ]);
  }

  /// The unprojection matrix is the inverse of the projection matrix. Used to convert from world
  /// cordinates to screen cordinates.
  createUnprojectionMatrix() {
    let a = (this.bounds.right - this.bounds.left) / 2;
    let b = (this.bounds.bottom - this.bounds.top) / 2;
    let c = (this.bounds.right + this.bounds.left) / 2;
    let d = (this.bounds.bottom + this.bounds.top) / 2;

    // prettier-ignore
    return new Matrix3d([
      a, 0, 0,
      0, b, 0,
      c, d, 1,
    ]);
  }

  createViewProjection() {
    const projectionMatrix = this.createUnprojectionMatrix();

    return Matrix3d.IDENTITY.clone()
      .mul(Matrix3d.translation(-this.translation[0], -this.translation[1]))
      .mul(Matrix3d.scaling(this.zoom))
      .mul(Matrix3d.rotation(this.rotation))
      .mul(projectionMatrix)      
  }
}
