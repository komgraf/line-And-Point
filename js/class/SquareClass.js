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
    
    if(this.fillColor !== undefined) {
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
    
    var pA = new Point(this.pointA.x + xt, this.pointA.y + yt, this.pointA.isReal);
    var pB = new Point(this.pointB.x + xt, this.pointB.y + yt, this.pointB.isReal);
    var pC = new Point(this.pointC.x + xt, this.pointC.y + yt, this.pointC.isReal);
    var pD = new Point(this.pointD.x + xt, this.pointD.y + yt, this.pointD.isReal);
    
    var sq = new Square(pA, pB, pC, pD, this.lineColor, this.fillColor);
    
    sq.draw(gridObject);
};