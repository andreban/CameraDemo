export default class Matrix2d {
  // prettier-ignore
  static IDENTITY = new Matrix2d([
    1, 0, 0,
    0, 1, 0,
    0, 0, 1,
  ]);

  constructor(matrix) {
    this.matrix = matrix;
  }

  static translation(x, y) {
    // prettier-ignore
    return new Matrix2d([
      1, 0, 0,
      0, 1, 0,
      x, y, 1,
    ]);
  }

  static scaling(scale) {
    // prettier-ignore
    return new Matrix2d([
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
    return new Matrix2d([
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

    return new Matrix2d(result);
  }

  mul_vec(vec) {
    const x =
      vec[0] * this.matrix[0] + vec[1] * this.matrix[3] + this.matrix[6];
    const y =
      vec[0] * this.matrix[1] + vec[1] * this.matrix[4] + this.matrix[7];
    return [x, y];
  }

  clone() {
    return new Matrix2d(structuredClone(this.matrix));
  }
}
