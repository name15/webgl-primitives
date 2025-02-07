namespace Math3D {
  export function multiplyPoint(matrix: number[], point: number[]): number[] {
    let x = point[0],
      y = point[1],
      z = point[2],
      w = point[3];

    let c1r1 = matrix[0],
      c2r1 = matrix[1],
      c3r1 = matrix[2],
      c4r1 = matrix[3],
      c1r2 = matrix[4],
      c2r2 = matrix[5],
      c3r2 = matrix[6],
      c4r2 = matrix[7],
      c1r3 = matrix[8],
      c2r3 = matrix[9],
      c3r3 = matrix[10],
      c4r3 = matrix[11],
      c1r4 = matrix[12],
      c2r4 = matrix[13],
      c3r4 = matrix[14],
      c4r4 = matrix[15];

    return [
      x * c1r1 + y * c1r2 + z * c1r3 + w * c1r4,
      x * c2r1 + y * c2r2 + z * c2r3 + w * c2r4,
      x * c3r1 + y * c3r2 + z * c3r3 + w * c3r4,
      x * c4r1 + y * c4r2 + z * c4r3 + w * c4r4,
    ];
  }

  export function multiplyMatrices(a: number[], b: number[]): number[] {
    // TODO - Simplify for explanation
    // currently taken from https://github.com/toji/gl-matrix/blob/master/src/gl-matrix/mat4.js#L306-L337

    let result = [];

    let a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3],
      a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7],
      a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11],
      a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];

    // Cache only the current line of the second matrix
    let b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3];
    result[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    result[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    result[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    result[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = b[4];
    b1 = b[5];
    b2 = b[6];
    b3 = b[7];
    result[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    result[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    result[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    result[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = b[8];
    b1 = b[9];
    b2 = b[10];
    b3 = b[11];
    result[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    result[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    result[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    result[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = b[12];
    b1 = b[13];
    b2 = b[14];
    b3 = b[15];
    result[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    result[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    result[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    result[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    return result;
  }

  export function multiplyArrayOfMatrices(matrices: number[][]): number[] {
    let inputMatrix = matrices[0];

    for (let i = 1; i < matrices.length; i++) {
      inputMatrix = Math3D.multiplyMatrices(inputMatrix, matrices[i]);
    }

    return inputMatrix;
  }

  export function identityMatrix(): number[] {
    return [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
      ]; // prettier-ignore
  }

  export function rotateXMatrix(a: number): number[] {
    let cos = Math.cos;
    let sin = Math.sin;

    return [
        1, 0, 0, 0,
        0, cos(a), -sin(a), 0,
        0, sin(a), cos(a), 0,
        0, 0, 0, 1
      ]; // prettier-ignore
  }

  export function rotateYMatrix(a: number): number[] {
    let cos = Math.cos;
    let sin = Math.sin;

    return [
        cos(a), 0, sin(a), 0,
        0, 1, 0, 0,
        -sin(a), 0, cos(a), 0,
        0, 0, 0, 1
      ]; // prettier-ignore
  }

  export function rotateZMatrix(a: number): number[] {
    let cos = Math.cos;
    let sin = Math.sin;

    return [
        cos(a), -sin(a), 0, 0,
        sin(a), cos(a), 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
      ]; // prettier-ignore
  }

  export function translateMatrix(x: number, y: number, z: number): number[] {
    return [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        x, y, z, 1
      ]; // prettier-ignore
  }

  export function scaleMatrix(w: number, h: number, d: number): number[] {
    return [
        w, 0, 0, 0,
        0, h, 0, 0,
        0, 0, d, 0,
        0, 0, 0, 1
      ]; // prettier-ignore
  }

  export function perspectiveMatrix(
    fieldOfView: number,
    aspectRatio: number,
    near: number,
    far: number
  ): number[] {
    // Construct a perspective matrix

    /*
             Field of view - the angle in radians of what's in view along the Y axis
             Aspect Ratio - the ratio of the canvas, typically canvas.width / canvas.height
             Near - Anything before this point in the Z direction gets clipped (outside of the clip space)
             Far - Anything after this point in the Z direction gets clipped (outside of the clip space)
          */

    let f = 1.0 / Math.tan(fieldOfView / 2);
    let rangeInv = 1 / (near - far);

    return [
        f / aspectRatio, 0, 0, 0,
        0, f, 0, 0,
        0, 0, (near + far) * rangeInv, -1,
        0, 0, near * far * rangeInv * 2, 0,
      ]; // prettier-ignore
  }

  export function orthographicMatrix(
    left: number,
    right: number,
    bottom: number,
    top: number,
    near: number,
    far: number
  ): number[] {
    // Each of the parameters represents the plane of the bounding box

    let lr = 1 / (left - right);
    let bt = 1 / (bottom - top);
    let nf = 1 / (near - far);

    let row4col1 = (left + right) * lr;
    let row4col2 = (top + bottom) * bt;
    let row4col3 = (far + near) * nf;

    return [
        -2 * lr, 0, 0, 0,
        0, -2 * bt, 0, 0,
        0, 0, 2 * nf, 0,
        row4col1, row4col2, row4col3, 1,
      ]; // prettier-ignore
  }

  export function sphericalToCartesian(r: number, lat: number, long: number) {
    return [
      r * Math.sin(lat) * Math.cos(long),
      r * Math.sin(lat) * Math.sin(long),
      r * Math.cos(lat),
    ];
  }
}
