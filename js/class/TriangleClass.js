/**
 * Constructor class Triangle
 * @param {Point} pointA
 * @param {Point} pointB
 * @param {Point} pointC
 * @param {string} lineColor Warna garis luar segitiga
 * @param {string} fillColor Warna segitiga. Isi dengan <code>undefined</code>
 * untuk membuat segitiga polos
 */
function Triangle(pointA, pointB, pointC, lineColor, fillColor) {
    this.pointA = pointA;
    this.pointB = pointB;
    this.pointC = pointC;
    Polygon.call(this);
    this.lineColor = (lineColor === undefined) ? "#000" : lineColor;
    this.fillColor = fillColor;
    this.arrPoint = new Array(this.pointA, this.pointB, this.pointC);
}

Triangle.prototype = Object.create(Polygon.prototype);

Triangle.prototype.constructor = Triangle;

Triangle.prototype.draw = Polygon.draw(gridObject);

Triangle.prototype.convertToGridScale = Polygon.convertToGridScale(gridObject);
