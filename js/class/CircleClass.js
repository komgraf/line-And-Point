/**
 * Constructor class Circle
 * @param {double} x Koordinat sumbu X pusat lingkaran
 * @param {double} y Koordinat sumbu Y pusat lingkaran
 * @param {double} radius Jari-jari lingkaran
 * @param {double} sAngle Sudut awal, dalam radian (nilai 0 radian berada pada arah jam 3 lingkaran)
 * @param {double} eAngle Sudut akhir, dalam radian. Bisa ditulis (2 * Math.PI) untuk membuat lingkaran penuh
 * @param {boolean} isReal True, nilai x dan y merupakan koordinat canvas <br>
 * False, Nilai x dan y merupakan koordinat Grid
 * @param {string} lineColor Warna garis luar lingkaran
 * @param {string} fillColor Warna lingkaran. Isi dengan <code>undefined</code>
 * untuk membuat lingkaran polos
 * @param {boolean} counterClock Optional. Specifies whether the drawing should be counterclockwise or clockwise. 
 * False is default, and indicates clockwise, while true indicates counter-clockwise.
 * @returns {Circle}
 */
function Circle(x, y, radius, sAngle, eAngle, isReal, lineColor, fillColor, counterClock) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.sAngle = sAngle;
    this.eAngle = eAngle;
    this.isReal = isReal;
    this.lineColor = (lineColor === undefined) ? "#000" : lineColor;
    this.fillColor = fillColor;
    this.counterClock = (counterClock === undefined) ? false : counterClock;
}

/**
 * Method untuk menggambar lingkaran
 * @param {Grid} gridObject
 */
Circle.prototype.draw = function(gridObject) {
    var ctx = gridObject.ctx;
    ctx.strokeStyle = this.lineColor;
    
    var center = new Point(this.x, this.y, this.isReal);
    center.draw(gridObject);
    
    if(this.isReal) {
        var x = this.x;
        var y = this.y;
        var radius = this.radius;
    } else {
        var x = gridObject.convertX(this.x);
        var y = gridObject.convertY(this.y);
        var radius = gridObject.convert(this.radius);
    }
    
    ctx.beginPath();
    ctx.arc(x, y, radius, this.sAngle, this.eAngle, this.counterClock);
    ctx.stroke();
    
    if(this.fillColor !== undefined) {
        ctx.fillStyle = this.fillColor;
        ctx.fill();
    }
};

/**
 * Method untuk menghitung luas lingkaran
 * @param {Grid} gridObject
 * @returns {double} Luas lingkaran
 */
Circle.prototype.wide = function(gridObject) { 
    var radius = (this.isReal) ? gridObject.reconvert(this.radius) : this.radius;
    
    return (Math.PI * radius * radius);
};

/**
 * Method untuk melakukan translasi pasa lingkaran
 * @param {double} xt
 * @param {double} yt
 * @param {Grid} gridObject
 */
Circle.prototype.translate = function(xt, yt, gridObject) {
    var c = new Circle(this.x+xt, this.y+yt, this.radius, this.sAngle, 
    this.eAngle, this.isReal, this.lineColor, this.fillColor, this.counterClock);
    
    c.draw(gridObject);
};
