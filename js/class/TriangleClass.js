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
    Shape.call(this);
}

Triangle.prototype = Object.create(Shape.prototype);

Triangle.prototype.constructor = Triangle;

/**
 * Method untuk menggambar segitiga di canvas
 * @param {Grid} gridObject
 */
Triangle.prototype.draw = function(gridObject) {
    this.pointA.draw(gridObject);
    this.pointB.draw(gridObject);
    this.pointC.draw(gridObject);
    
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

    if (this.fillColor !== undefined) {
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

    var pA = new Point(this.pointA.x + parseFloat(xt), this.pointA.y + parseFloat(yt), this.pointA.isReal, this.pointA.name, this.pointA.color);
    var pB = new Point(this.pointB.x + parseFloat(xt), this.pointB.y + parseFloat(yt), this.pointB.isReal, this.pointB.name, this.pointB.color);
    var pC = new Point(this.pointC.x + parseFloat(xt), this.pointC.y + parseFloat(yt), this.pointC.isReal, this.pointC.name, this.pointC.color);

    var tri = new Triangle(pA, pB, pC, this.lineColor, this.fillColor);
    tri.draw(gridObject);
};

/**
 * Method untuk melakukan scalling pada segitiga (diferensial)
 * @param {double} xt
 * @param {double} yt
 * @param {Grid} gridObject
 */
Triangle.prototype.scale = function(xt, yt, gridObject) {
    xt = Math.abs(xt);
    yt = Math.abs(yt);
    var dx = this.pointA.x * parseFloat(xt) - this.pointA.x;
    var dy = this.pointA.y * parseFloat(yt) - this.pointA.y;
    var pA = new Point(this.pointA.x * parseFloat(xt)-dx, this.pointA.y * parseFloat(yt)-dy, this.pointA.isReal, this.pointA.name+"'", this.pointA.color);
    var pB = new Point(this.pointB.x * parseFloat(xt)-dx, this.pointB.y * parseFloat(yt)-dy, this.pointB.isReal, this.pointB.name+"'", this.pointB.color);
    var pC = new Point(this.pointC.x * parseFloat(xt)-dx, this.pointC.y * parseFloat(yt)-dy, this.pointC.isReal, this.pointC.name+"'", this.pointC.color);

    var tri = new Triangle(pA, pB, pC, this.lineColor, this.fillColor);
    tri.draw(gridObject);
};

/**
 * Method untuk melakukan scaling pada segitiga (uniform)
 * @param {double} t
 * @param {Grid} gridObject
 */
Triangle.prototype.scaleUniform = function(t, gridObject) {
    t = Math.abs(t);
    var dx = this.pointA.x * parseFloat(t) - this.pointA.x;
    var dy = this.pointA.y * parseFloat(t) - this.pointA.y;
    var pA = new Point(this.pointA.x * parseFloat(t)-dx, this.pointA.y * parseFloat(t)-dy, this.pointA.isReal, this.pointA.name+"'", this.pointA.color);
    var pB = new Point(this.pointB.x * parseFloat(t)-dx, this.pointB.y * parseFloat(t)-dy, this.pointB.isReal, this.pointB.name+"'", this.pointB.color);
    var pC = new Point(this.pointC.x * parseFloat(t)-dx, this.pointC.y * parseFloat(t)-dy, this.pointC.isReal, this.pointC.name+"'", this.pointC.color);

    var tri = new Triangle(pA, pB, pC, this.lineColor, this.fillColor);
    tri.draw(gridObject);
    
};

/**
 * Method untuk melakukan shear pada segitiga terhadap sumbu x
 * @param {double} shx
 * @param {double} yref
 * @param {Grid} gridObject
 * @description rumusnya : X’ = x + shx(y – yref), Y’ = Y
 * @author Umam
 */
Triangle.prototype.shearX = function(shx, yref, gridObject) {

    var pA = new Point(this.pointA.x + (shx * (this.pointA.y - yref)), this.pointA.y, this.pointA.isReal, this.pointA.name, this.pointA.color);
    var pB = new Point(this.pointB.x + (shx * (this.pointB.y - yref)), this.pointB.y, this.pointB.isReal, this.pointB.name, this.pointB.color);
    var pC = new Point(this.pointC.x + (shx * (this.pointC.y - yref)), this.pointC.y, this.pointC.isReal, this.pointC.name, this.pointC.color);

    var tri = new Triangle(pA, pB, pC, this.lineColor, this.fillColor);
    tri.draw(gridObject);
};

/**
 * Method untuk melakukan shear pada segitiga terhadap sumbu y
 * @param {double} shy
 * @param {double} xref
 * @param {Grid} gridObject
 * @description rumusnya : X’ = X, Y’ = shy(X – Xref) + Y
 * @author Umam
 */
Triangle.prototype.shearY = function(shy, xref, gridObject) {

    var pA = new Point(this.pointA.x, this.pointA.y + (shy * (this.pointA.x - xref)), this.pointA.isReal, this.pointA.name, this.pointA.color);
    var pB = new Point(this.pointB.x, this.pointB.y + (shy * (this.pointB.x - xref)), this.pointB.isReal, this.pointB.name, this.pointB.color);
    var pC = new Point(this.pointC.x, this.pointC.y + (shy * (this.pointC.x - xref)), this.pointC.isReal, this.pointC.name, this.pointC.color);

    var tri = new Triangle(pA, pB, pC, this.lineColor, this.fillColor);
    tri.draw(gridObject);
};

/**
 * Method refleksi bidang terhadap sumbu X (y = 0)
 * @param {Grid} gridObject
 * @description melakukan refleksi bidang terhadap sumbu X, dengan memanggil method reflectionY() karena refleksi sumbu X sama dengan refleksi terhadap garis y=0
 */
Triangle.prototype.reflectionXAxis = function( gridObject ) {
    this.reflectionY( 0, gridObject );
};

/**
 * Method refleksi bidang terhadap sumbu Y (x = 0)
 * @param {Grid} gridObject
 * @description melakukan refleksi bidang terhadap sumbu Y, dengan memanggil method reflectionX() karena refleksi sumbu Y sama dengan refleksi terhadap garis x=0
 */
Triangle.prototype.reflectionYAxis = function( gridObject ) {
    this.reflectionX( 0, gridObject );
};

/**
 * Method refleksi bidang terhadap koordinat pusat (0,0)
 * @param {Grid} gridObject
 * @description melakuka refleksi bidang terhadap titik (0,0), dengan memanggil method reflectionXY() dengan parameter koordinat (0,0)
 */
Triangle.prototype.reflectionCenter = function( gridObject ) {
    this.reflectionXY( 0, 0, gridObject );
};

/**
 * Method refleksi bidang terhadap garis x = n
 * @param {float} n
 * @param {Grid} gridObject
 * @description melakukan refleksi bidang terhadap garis x=n, di mana hanya absis masing-masing point bidang yang berubah. ax' = n + (n - ax) = 2n - ax
 */
Triangle.prototype.reflectionX = function( n, gridObject ) {
    var xA = 2 * n - parseFloat(this.pointA.x);
    var xB = 2 * n - parseFloat(this.pointB.x);
    var xC = 2 * n - parseFloat(this.pointC.x);
    
    var pA = new Point( xA, this.pointA.y, false, "A'" );
    var pB = new Point( xB, this.pointB.y, false, "B'" );
    var pC = new Point( xC, this.pointC.y, false, "C'" );
    
    var triangleR = new Triangle( pA, pB, pC, gridObject.randomColor(), this.fillColor );
    triangleR.draw( gridObject );
};

/**
 * Method refleksi bidang terhadap garis y = n
 * @param {float} n
 * @param {Grid} gridObject
 * @description melakukan refleksi bidang terhadap garis y=n, di mana hanya ordinat masing-masing point bidang yang berubah. ay' = n + (n - ay) = 2n - ay
 */
Triangle.prototype.reflectionY = function( n, gridObject ) {
    var yA = 2 * n - parseFloat(this.pointA.y);
    var yB = 2 * n - parseFloat(this.pointB.y);
    var yC = 2 * n - parseFloat(this.pointC.y);
    
    var pA = new Point( this.pointA.x, yA, false, "A'" );
    var pB = new Point( this.pointB.x, yB, false, "B'" );
    var pC = new Point( this.pointC.x, yC, false, "C'" );
    
    var triangleR = new Triangle( pA, pB, pC, gridObject.randomColor(), this.fillColor );
    triangleR.draw( gridObject );
};

/**
 * Method refleksi bidang terhadap titik x,y
 * @param {float} x
 * @param {float} y
 * @param {Grid} gridObject
 * @description melakukan refleksi bidang terhadap titik (x,y), di mana koordinat masing-masing point bidang berubah. ax' = n + (n - ax) = 2n - ax dan ay' = n + (n - ay) = 2n - ay
 */
Triangle.prototype.reflectionXY = function( x, y, gridObject ) {
    var xA = 2 * x - parseFloat(this.pointA.x);
    var xB = 2 * x - parseFloat(this.pointB.x);
    var xC = 2 * x - parseFloat(this.pointC.x);
    var yA = 2 * y - parseFloat(this.pointA.y);
    var yB = 2 * y - parseFloat(this.pointB.y);
    var yC = 2 * y - parseFloat(this.pointC.y);
    
    var pA = new Point( xA, yA, false, "A'" );
    var pB = new Point( xB, yB, false, "B'" );
    var pC = new Point( xC, yC, false, "C'" );
    
    var triangleR = new Triangle( pA, pB, pC, gridObject.randomColor(), this.fillColor );
    triangleR.draw( gridObject );
};

/**
 * Method untuk melakukan rotasi pada segitiga dengan pusat (rx, ry) dan 
 * rotasi sebesar rDeg
 * @param {double} xr
 * @param {double} yr
 * @param {radian} rDeg Derajat rotasi segitiga
 * @param {Grid} gridObject
 * @returns {undefined}
 */
Triangle.prototype.rotate = function(xr, yr, rDeg, gridObject) {
    
    rDeg = gridObject.degToRad(rDeg);

    var xA = this.rotateX(this.pointA.x, this.pointA.y, xr, yr, rDeg);
    var yA = this.rotateY(this.pointA.x, this.pointA.y, xr, yr, rDeg);
    var xB = this.rotateX(this.pointB.x, this.pointB.y, xr, yr, rDeg);
    var yB = this.rotateY(this.pointB.x, this.pointB.y, xr, yr, rDeg);
    var xC = this.rotateX(this.pointC.x, this.pointC.y, xr, yr, rDeg);
    var yC = this.rotateY(this.pointC.x, this.pointC.y, xr, yr, rDeg);
    
    var pA = new Point( xA, yA, false, "A'" );
    var pB = new Point( xB, yB, false, "B'" );
    var pC = new Point( xC, yC, false, "C'" );
    
    var triangleR = new Triangle( pA, pB, pC, gridObject.randomColor(), this.fillColor );
    triangleR.draw( gridObject );
    
};

Triangle.prototype.rotateX = function (x, y, xr, yr, rDeg) {
    x = parseFloat(x);
    y = parseFloat(y);
    xr = parseFloat(xr);
    yr = parseFloat(yr);
    rDeg = parseFloat(rDeg);
    var result = xr + ((x - xr) * Math.cos(rDeg).toFixed(2)) - ((y-yr) * Math.sin(rDeg).toFixed(2));
    return result;
};

Triangle.prototype.rotateY = function (x, y, xr, yr, rDeg) {
    x = parseFloat(x);
    y = parseFloat(y);
    xr = parseFloat(xr);
    yr = parseFloat(yr);
    rDeg = parseFloat(rDeg);
    var result = yr + ((x - xr) * Math.sin(rDeg).toFixed(2)) + ((y-yr) * Math.cos(rDeg).toFixed(2));
    return result;
};