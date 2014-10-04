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

/**
 * Method refleksi bidang terhadap sumbu X (y = 0)
 * @param {Grid} gridObject
 * @description melakukan refleksi bidang terhadap sumbu X, dengan memanggil method reflectionY() karena refleksi sumbu X sama dengan refleksi terhadap garis y=0
 */
Circle.prototype.reflectionXAxis = function( gridObject ) {
    this.reflectionY( 0, gridObject );
};

/**
 * Method refleksi bidang terhadap sumbu Y (x = 0)
 * @param {Grid} gridObject
 * @description melakukan refleksi bidang terhadap sumbu Y, dengan memanggil method reflectionX() karena refleksi sumbu Y sama dengan refleksi terhadap garis x=0
 */
Circle.prototype.reflectionYAxis = function( gridObject ) {
    this.reflectionX( 0, gridObject );
};

/**
 * Method refleksi bidang terhadap koordinat pusat (0,0)
 * @param {Grid} gridObject
 * @description melakuka refleksi bidang terhadap titik (0,0), dengan memanggil method reflectionXY() dengan parameter koordinat (0,0)
 */
Circle.prototype.reflectionCenter = function( gridObject ) {
    this.reflectionXY( 0, 0, gridObject );
};

/**
 * Method refleksi bidang terhadap garis x = n
 * @param {float} n
 * @param {Grid} gridObject
 * @description melakukan refleksi bidang terhadap garis x=n, di mana hanya absis masing-masing point bidang yang berubah. ax' = n + (n - ax) = 2n - ax
 */
Circle.prototype.reflectionX = function( n, gridObject ) {
    var x2 = 2 * n - parseFloat(this.x);
    
    var circleR = new Circle( x2, this.y, this.radius, this.sAngle, this.eAngle, false, "blue", this.fillColor );
    circleR.draw( gridObject );
};

/**
 * Method refleksi bidang terhadap garis y = n
 * @param {float} n
 * @param {Grid} gridObject
 * @description melakukan refleksi bidang terhadap garis y=n, di mana hanya ordinat masing-masing point bidang yang berubah. ay' = n + (n - ay) = 2n - ay
 */
Circle.prototype.reflectionY = function( n, gridObject ) {
    var y2 = 2 * n - parseFloat(this.y);
    
    var circleR = new Circle( this.x, y2, this.radius, this.sAngle, this.eAngle, false, "blue", this.fillColor );
    circleR.draw( gridObject );
};

/**
 * Method refleksi bidang terhadap titik x,y
 * @param {float} x
 * @param {float} y
 * @param {Grid} gridObject
 * @description melakukan refleksi bidang terhadap titik (x,y), di mana koordinat masing-masing point bidang berubah. ax' = n + (n - ax) = 2n - ax dan ay' = n + (n - ay) = 2n - y
 */
Circle.prototype.reflectionXY = function( x, y, gridObject ) {
    var x2 = 2 * x - parseFloat(this.x);
    var y2 = 2 * y - parseFloat(this.y);
    
    var circleR = new Circle( x2, y2, this.radius, this.sAngle, this.eAngle, false, "blue", this.fillColor );
    circleR.draw( gridObject );
};