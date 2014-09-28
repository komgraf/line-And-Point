/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

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
    this.lineColor = (lineColor === undefined) ? "#000" : lineColor;
    this.fillColor = fillColor;
}

/**
 * Method untuk menggambar segitiga di canvas
 * @param {Grid} gridObject
 */
Triangle.prototype.draw = function(gridObject) {
    
    var x1 = (this.pointA.isReal) ? this.pointA.x : gridObject.convertX(this.pointA.x);
    var y1 = (this.pointA.isReal) ? this.pointA.y : gridObject.convertY(this.pointA.y);
    var x2 = (this.pointB.isReal) ? this.pointB.x : gridObject.convertX(this.pointB.x);
    var y2 = (this.pointB.isReal) ? this.pointB.y : gridObject.convertY(this.pointB.y);
    var x3 = (this.pointC.isReal) ? this.pointC.x : gridObject.convertX(this.pointC.x);
    var y3 = (this.pointC.isReal) ? this.pointC.y : gridObject.convertY(this.pointC.y);
    
    var ctx = gridObject.ctx;
    ctx.strokeStyle = this.lineColor;
    
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.closePath();
    ctx.stroke();
    
    if(this.fillColor !== undefined) {
        ctx.fillStyle = this.fillColor;
        ctx.fill();
    }
    
};

/**
 * Method untuk melakukan translasi pada segitiga
 * @param {double} xt
 * @param {double} yt
 * @param {Grid} gridObject
 */
Triangle.prototype.translate = function(xt, yt, gridObject) {

    var pA = new Point(this.pointA.x + xt, this.pointA.y + yt, this.pointA.isReal, this.pointA.name, this.pointA.color);
    var pB = new Point(this.pointB.x + xt, this.pointB.y + yt, this.pointB.isReal, this.pointB.name, this.pointB.color);
    var pC = new Point(this.pointC.x + xt, this.pointC.y + yt, this.pointC.isReal, this.pointC.name, this.pointC.color);
    
    var tri = new Triangle(pA, pB, pC, this.lineColor, this.fillColor);
    tri.draw(gridObject);
};