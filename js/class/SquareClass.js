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
    this.lineColor = (lineColor === undefined) ? "#000" : lineColor;
    this.fillColor = fillColor;
}

/**
 * Method untuk menggambar garis di canvas
 * @param {Grid} gridObject
 */
Square.prototype.draw = function(gridObject) {

    this.pointA.draw(gridObject);
    this.pointB.draw(gridObject);
    this.pointC.draw(gridObject);
    this.pointD.draw(gridObject);

    var x1 = (this.pointA.isReal) ? this.pointA.x : gridObject.convertX(this.pointA.x);
    var y1 = (this.pointA.isReal) ? this.pointA.y : gridObject.convertY(this.pointA.y);
    var x2 = (this.pointB.isReal) ? this.pointB.x : gridObject.convertX(this.pointB.x);
    var y2 = (this.pointB.isReal) ? this.pointB.y : gridObject.convertY(this.pointB.y);
    var x3 = (this.pointC.isReal) ? this.pointC.x : gridObject.convertX(this.pointC.x);
    var y3 = (this.pointC.isReal) ? this.pointC.y : gridObject.convertY(this.pointC.y);
    var x4 = (this.pointD.isReal) ? this.pointD.x : gridObject.convertX(this.pointD.x);
    var y4 = (this.pointD.isReal) ? this.pointD.y : gridObject.convertY(this.pointD.y);

    var ctx = gridObject.ctx;
    ctx.lineColor = this.lineColor;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.lineTo(x4, y4);
    ctx.closePath();
    ctx.stroke();

    if (this.fillColor !== undefined) {
        ctx.fillStyle = this.fillColor;
        ctx.fill();
    }

};

/**
 * Method untuk melakukan translasi pada segiempat
 * @param {double} xt
 * @param {double} yt
 * @param {Grid} gridObject
 */
Square.prototype.translate = function(xt, yt, gridObject) {

    var pA = new Point(this.pointA.x + parseFloat(xt), this.pointA.y + parseFloat(yt), this.pointA.isReal);
    var pB = new Point(this.pointB.x + parseFloat(xt), this.pointB.y + parseFloat(yt), this.pointB.isReal);
    var pC = new Point(this.pointC.x + parseFloat(xt), this.pointC.y + parseFloat(yt), this.pointC.isReal);
    var pD = new Point(this.pointD.x + parseFloat(xt), this.pointD.y + parseFloat(yt), this.pointD.isReal);

    var sq = new Square(pA, pB, pC, pD, this.lineColor, this.fillColor);

    sq.draw(gridObject);
};

/**
 * Method untuk melakukan scale pada segiempat (diferensial)
 * @param {double} xt
 * @param {double} yt
 * @param {Grid} gridObject
 */
Square.prototype.scale = function(xt, yt, gridObject) {

    var pA = new Point(this.pointA.x * parseFloat(xt), this.pointA.y * parseFloat(yt), this.pointA.isReal);
    var pB = new Point(this.pointB.x * parseFloat(xt), this.pointB.y * parseFloat(yt), this.pointB.isReal);
    var pC = new Point(this.pointC.x * parseFloat(xt), this.pointC.y * parseFloat(yt), this.pointC.isReal);
    var pD = new Point(this.pointD.x * parseFloat(xt), this.pointD.y * parseFloat(yt), this.pointD.isReal);

    var sq = new Square(pA, pB, pC, pD, this.lineColor, this.fillColor);

    sq.draw(gridObject);
};

/**
 * Method untuk melakukan scale pada segiempat (uniform)
 * @param {double} t
 * @param {Grid} gridObject
 */
Square.prototype.scaleUniform = function(t, gridObject) {
    var pA = new Point(this.pointA.x * parseFloat(t), this.pointA.y * parseFloat(t), this.pointA.isReal);
    var pB = new Point(this.pointB.x * parseFloat(t), this.pointB.y * parseFloat(t), this.pointB.isReal);
    var pC = new Point(this.pointC.x * parseFloat(t), this.pointC.y * parseFloat(t), this.pointC.isReal);
    var pD = new Point(this.pointD.x * parseFloat(t), this.pointD.y * parseFloat(t), this.pointD.isReal);

    var sq = new Square(pA, pB, pC, pD, this.lineColor, this.fillColor);

    sq.draw(gridObject);
};

/**
 * Method Untuk melakukan Shear/penggeseran pada segiempat tehadap sumbu x
 * @param {double} shx
 * @param {double} yref
 * @param {Grid} gridObject
 * @description rumusnya : X’ = x + shx(y – yref), Y’ = Y
 * @author Umam
 */
Square.prototype.shearX = function(shx, yref, gridObject) {
    var pA = new Point(this.pointA.x + (shx * (this.pointA.y-yref)), this.pointA.y, this.pointA.isReal);
    var pB = new Point(this.pointB.x + (shx * (this.pointB.y-yref)), this.pointB.y, this.pointB.isReal);
    var pC = new Point(this.pointC.x + (shx * (this.pointC.y-yref)), this.pointC.y, this.pointC.isReal);
    var pD = new Point(this.pointD.x + (shx * (this.pointD.y-yref)), this.pointD.y, this.pointD.isReal);

    var sq = new Square(pA, pB, pC, pD, this.lineColor, this.fillColor);

    sq.draw(gridObject);
};

/**
 * Method Untuk melakukan Shear/penggeseran pada segiempat tehadap sumbu y
 * @param {double} shy
 * @param {double} xref
 * @param {Grid} gridObject
 * @description rumusnya : X’ = X, Y’ = shy(X – Xref) + Y
 * @author Umam
 */
Square.prototype.shearY = function(shy, xref, gridObject) {
    var pA = new Point(this.pointA.x, this.pointA.y + (shy * (this.pointA.x-xref)), this.pointA.isReal);
    var pB = new Point(this.pointB.x, this.pointB.y + (shy * (this.pointB.x-xref)), this.pointB.isReal);
    var pC = new Point(this.pointC.x, this.pointC.y + (shy * (this.pointC.x-xref)), this.pointC.isReal);
    var pD = new Point(this.pointD.x, this.pointD.y + (shy * (this.pointD.x-xref)), this.pointD.isReal);

    var sq = new Square(pA, pB, pC, pD, this.lineColor, this.fillColor);

    sq.draw(gridObject);
};