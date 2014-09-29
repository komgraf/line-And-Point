/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Constructor class Square
 * @param {double} x Koordinat sumbu X titik pojok kiri atas segiempat
 * @param {double} y Koordinat sumbu Y titik pojok kiri atas segiempat
 * @param {double} width Lebar segiempat
 * @param {double} height Tinggi segiempat
 * @param {boolean} isReal True, nilai x dan y merupakan koordinat canvas <br>
 * False, Nilai x dan y merupakan koordinat Grid
 * @param {string} lineColor Warna garis luar segiempat
 * @param {string} fillColor Warna segiempat. Isi dengan <code>undefined</code>
 * untuk membuat segiempat polos
 */
function Square(x, y, width, height, isReal, lineColor, fillColor) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.isReal = isReal;
    this.lineColor = (lineColor === undefined) ? "#000" : lineColor;
    this.fillColor = fillColor;
}

/**
 * Method untuk menggambar garis di canvas
 * @param {Grid} gridObject
 */
Square.prototype.draw = function(gridObject) {
    var ctx = gridObject.ctx;

    if (this.isReal) {
        var x = this.x;
        var y = this.y;
        var width = this.width;
        var height = this.height;
    } else {
        var x = gridObject.convertX(this.x);
        var y = gridObject.convertY(this.y);
        var width = gridObject.convert(this.width);
        var height = gridObject.convert(this.height);
    }

    ctx.beginPath();
    ctx.strokeStyle = this.lineColor;
    ctx.rect(x, y, width, height);
    ctx.stroke();
    
    if(this.fillColor !== undefined) {
        ctx.fillStyle = this.fillColor;
        ctx.fill();
    }
    
};

/**
 * Method untuk menghitung luas segiempat
 * @param {Grid} gridObject
 * @returns {double} Luas segiempat
 */
Square.prototype.wide = function(gridObject) {
    if (this.isReal) {
        var width = gridObject.convert(this.width);
        var height = gridObject.convert(this.height);        
    } else {
        var width = this.width;
        var height = this.height;
    }
    
    return (width * height);
};

/**
 * Method untuk melakukan translasi pada segiempat
 * @param {double} xt
 * @param {double} yt
 * @param {Grid} gridObject
 */
Square.prototype.translate = function(xt, yt, gridObject) {
    
    var sq = new Square(this.x + xt, this.y + yt, this.width, this.height,
    this.isReal, this.lineColor, this.fillColor);
    
    sq.draw(gridObject);
};