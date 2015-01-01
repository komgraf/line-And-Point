/**
 * Constructor class Square
 * @param {Point} pointA
 * @param {Point} pointB
 * @param {Point} pointC
 * @param {Point} pointD
 * @param {string} lineColor Warna garis luar segiempat
 * @param {string} fillColor Warna segiempat. Isi dengan <code>undefined</code>
 * untuk membuat segiempat polos
 */
function Square(pointA, pointB, pointC, pointD, lineColor, fillColor) {
    this.pointA = pointA;
    this.pointB = pointB;
    this.pointC = pointC;
    this.pointD = pointD;
    Polygon.call(this);
    this.lineColor = (lineColor === undefined) ? "#000" : lineColor;
    this.fillColor = fillColor;
    this.arrPoint = new Array(this.pointA, this.pointB, this.pointC, this.pointD);
}

Square.prototype = Object.create(Polygon.prototype);

Square.prototype.constructor = Square;

Square.prototype.draw = Polygon.draw(gridObject);

Square.prototype.convertToGridScale = Polygon.convertToGridScale(gridObject);