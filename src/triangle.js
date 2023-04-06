import Matrix2d from "./Matrix2d";

export default class Triangle {
  constructor(x, y, scale, color) {
    this.x = x;
    this.y = y;
    this.scale = scale;
    this.rotation = 0;
    this.color = color;
    this.vertices = [
      [-0.5, -0.5],
      [0, 0.5],
      [0.5, -0.5]
    ];
  }

  translate(xAmount, yAmount) {
    this.x += xAmount;
    this.y += yAmount;
  }

  rotate(deg) {
    this.rotation += deg;
  }

  zoom(scale) {
    this.scale = scale;
  }

  draw(context, viewProjection) {
    const modelMatrix = Matrix2d.IDENTITY.mul(Matrix2d.scaling(this.scale))
      .mul(Matrix2d.rotation(this.rotation))
      .mul(Matrix2d.translation(this.x, this.y));
    const modelViewMatrix = modelMatrix.mul(viewProjection);

    context.beginPath();
    let start = modelViewMatrix.mul_vec(this.vertices[0]);
    context.moveTo(start[0], start[1]);
    for (let vertice of this.vertices) {
      let v = modelViewMatrix.mul_vec(vertice);
      // console.log(`${vertice} => ${v}`);
      context.lineTo(v[0], v[1]);
    }
    context.closePath();
    context.fillStyle = this.color;
    context.fill();
  }
}
