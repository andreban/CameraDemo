import Matrix2d from "./Matrix2d";

export default class Camera {
  constructor(screenWidth, screenHeight) {
    this.bounds = { left: 0, top: 0, right: screenWidth, bottom: screenHeight };
    this.translation = [0, 0];
    this.rotation = 0;
    this.zoom = 1;
  }

  translate(xAmount, yAmount) {
    this.translation[0] += xAmount;
    this.translation[1] += yAmount;
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
    return new Matrix2d([
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
    return new Matrix2d([
      a, 0, 0,
      0, b, 0,
      c, d, 1,
    ]);
  }

  createViewProjection() {
    const projectionMatrix = this.createUnprojectionMatrix();
    const t = Matrix2d.rotation(this.rotation).mul_vec(this.translation);

    return Matrix2d.IDENTITY.clone()
      .mul(Matrix2d.translation(-this.translation[0], -this.translation[1]))
      // .mul(Matrix2d.translation(-t[0], -t[1]))
      .mul(Matrix2d.scaling(this.zoom))
      .mul(Matrix2d.rotation(this.rotation))
      .mul(projectionMatrix)
      
  }
}
