export default class Matrix3d {
  // prettier-ignore
  static IDENTITY = new Matrix3d([
    1, 0, 0,
    0, 1, 0,
    0, 0, 1,
  ]);

  constructor(matrix) {
    this.matrix = matrix;
  }

  static translation(x, y) {
    // prettier-ignore
    return new Matrix3d([
      1, 0, 0,
      0, 1, 0,
      x, y, 1,
    ]);
  }

  static scaling2(xScale, yScale) {
    // prettier-ignore
    return new Matrix3d([
      xScale, 0, 0,
      0, yScale, 0,
      0, 0, 1, 
    ]);
  }

  static scaling(scale) {
    // prettier-ignore
    return new Matrix3d([
      scale, 0, 0,
      0, scale, 0,
      0, 0, 1, 
    ]);
  }

  static rotation(deg) {
    const radians = deg * (Math.PI / 180.0);
    const sin = Math.sin(radians);
    const cos = Math.cos(radians);

    // prettier-ignore
    return new Matrix3d([
       cos, -sin, 0,
       sin, cos, 0,
        0,   0,  1,
    ]);
  }

  mul(other) {
    let result = [];
    result[0] =
      this.matrix[0] * other.matrix[0] +
      this.matrix[1] * other.matrix[3] +
      this.matrix[2] * other.matrix[6];

    result[1] =
      this.matrix[0] * other.matrix[1] +
      this.matrix[1] * other.matrix[4] +
      this.matrix[2] * other.matrix[7];

    result[2] =
      this.matrix[0] * other.matrix[2] +
      this.matrix[1] * other.matrix[5] +
      this.matrix[2] * other.matrix[8];

    result[3] =
      this.matrix[3] * other.matrix[0] +
      this.matrix[4] * other.matrix[3] +
      this.matrix[5] * other.matrix[6];

    result[4] =
      this.matrix[3] * other.matrix[1] +
      this.matrix[4] * other.matrix[4] +
      this.matrix[5] * other.matrix[7];

    result[5] =
      this.matrix[3] * other.matrix[2] +
      this.matrix[4] * other.matrix[5] +
      this.matrix[5] * other.matrix[8];

    result[6] =
      this.matrix[6] * other.matrix[0] +
      this.matrix[7] * other.matrix[3] +
      this.matrix[8] * other.matrix[6];

    result[7] =
      this.matrix[6] * other.matrix[1] +
      this.matrix[7] * other.matrix[4] +
      this.matrix[8] * other.matrix[7];

    result[8] =
      this.matrix[6] * other.matrix[2] +
      this.matrix[7] * other.matrix[5] +
      this.matrix[8] * other.matrix[8];

    return new Matrix3d(result);
  }

  mul_vec(vec) {
    const x =
      vec[0] * this.matrix[0] + vec[1] * this.matrix[3] + this.matrix[6];
    const y =
      vec[0] * this.matrix[1] + vec[1] * this.matrix[4] + this.matrix[7];
    return [x, y];
  }

  clone() {
    return new Matrix3d(structuredClone(this.matrix));
  }
}
