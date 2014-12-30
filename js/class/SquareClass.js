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
    xt = Math.abs(xt);
    yt = Math.abs(yt);
    var dx = this.pointA.x * parseFloat(xt) - this.pointA.x;
    var dy = this.pointA.y * parseFloat(yt) - this.pointA.y;
    var pA = new Point(this.pointA.x * parseFloat(xt)-dx, this.pointA.y * parseFloat(yt)-dy, this.pointA.isReal, this.pointA.name+"'");
    var pB = new Point(this.pointB.x * parseFloat(xt)-dx, this.pointB.y * parseFloat(yt)-dy, this.pointB.isReal, this.pointB.name+"'");
    var pC = new Point(this.pointC.x * parseFloat(xt)-dx, this.pointC.y * parseFloat(yt)-dy, this.pointC.isReal, this.pointC.name+"'");
    var pD = new Point(this.pointD.x * parseFloat(xt)-dx, this.pointD.y * parseFloat(yt)-dy, this.pointD.isReal, this.pointD.name+"'");

    var sq = new Square(pA, pB, pC, pD, this.lineColor, this.fillColor);

    sq.draw(gridObject);
};

/**
 * Method untuk melakukan scale pada segiempat (uniform)
 * @param {double} t
 * @param {Grid} gridObject
 */
Square.prototype.scaleUniform = function(t, gridObject) {
    t = Math.abs(t);
    var dx = this.pointA.x * parseFloat(t) - this.pointA.x;
    var dy = this.pointA.y * parseFloat(t) - this.pointA.y;
    var pA = new Point(this.pointA.x * parseFloat(t)-dx, this.pointA.y * parseFloat(t)-dy, this.pointA.isReal, this.pointA.name+"'");
    var pB = new Point(this.pointB.x * parseFloat(t)-dx, this.pointB.y * parseFloat(t)-dy, this.pointB.isReal, this.pointB.name+"'");
    var pC = new Point(this.pointC.x * parseFloat(t)-dx, this.pointC.y * parseFloat(t)-dy, this.pointC.isReal, this.pointC.name+"'");
    var pD = new Point(this.pointD.x * parseFloat(t)-dx, this.pointD.y * parseFloat(t)-dy, this.pointD.isReal, this.pointD.name+"'");

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

/**
 * Method refleksi bidang terhadap sumbu X (y = 0)
 * @param {Grid} gridObject
 * @description melakukan refleksi bidang terhadap sumbu X, dengan memanggil method reflectionY() karena refleksi sumbu X sama dengan refleksi terhadap garis y=0
 */
Square.prototype.reflectionXAxis = function( gridObject ) {
    this.reflectionY( 0, gridObject );
};

/**
 * Method refleksi bidang terhadap sumbu Y (x = 0)
 * @param {Grid} gridObject
 * @description melakukan refleksi bidang terhadap sumbu Y, dengan memanggil method reflectionX() karena refleksi sumbu Y sama dengan refleksi terhadap garis x=0
 */
Square.prototype.reflectionYAxis = function( gridObject ) {
    this.reflectionX( 0, gridObject );
};

/**
 * Method refleksi bidang terhadap koordinat pusat (0,0)
 * @param {Grid} gridObject
 * @description melakuka refleksi bidang terhadap titik (0,0), dengan memanggil method reflectionXY() dengan parameter koordinat (0,0)
 */
Square.prototype.reflectionCenter = function( gridObject ) {
    this.reflectionXY( 0, 0, gridObject );
};

/**
 * Method refleksi bidang terhadap garis x = n
 * @param {float} n
 * @param {Grid} gridObject
 * @description melakukan refleksi bidang terhadap garis x=n, di mana hanya absis masing-masing point bidang yang berubah. ax' = n + (n - ax) = 2n - ax
 */
Square.prototype.reflectionX = function( n, gridObject ) {
    var xA = 2 * n - parseFloat(this.pointA.x);
    var xB = 2 * n - parseFloat(this.pointB.x);
    var xC = 2 * n - parseFloat(this.pointC.x);
    var xD = 2 * n - parseFloat(this.pointD.x);
    
    var pA = new Point( xA, this.pointA.y, false, "A'", "blue" );
    var pB = new Point( xB, this.pointB.y, false, "B'", "blue" );
    var pC = new Point( xC, this.pointC.y, false, "C'", "blue" );
    var pD = new Point( xD, this.pointD.y, false, "D'", "blue" );
    
    var squareR = new Square( pA, pB, pC, pD, gridObject.randomColor() );
    squareR.draw( gridObject );
};

/**
 * Method refleksi bidang terhadap garis y = n
 * @param {float} n
 * @param {Grid} gridObject
 * @description melakukan refleksi bidang terhadap garis y=n, di mana hanya ordinat masing-masing point bidang yang berubah. ay' = n + (n - ay) = 2n - ay
 */
Square.prototype.reflectionY = function( n, gridObject ) {
    var yA = 2 * n - parseFloat(this.pointA.y);
    var yB = 2 * n - parseFloat(this.pointB.y);
    var yC = 2 * n - parseFloat(this.pointC.y);
    var yD = 2 * n - parseFloat(this.pointD.y);
    
    var pA = new Point( this.pointA.x, yA, false, "A'", "blue" );
    var pB = new Point( this.pointB.x, yB, false, "B'", "blue" );
    var pC = new Point( this.pointC.x, yC, false, "C'", "blue" );
    var pD = new Point( this.pointD.x, yD, false, "D'", "blue" );
    
    var squareR = new Square( pA, pB, pC, pD, gridObject.randomColor() );
    squareR.draw( gridObject );
};

/**
 * Method refleksi bidang terhadap titik x,y
 * @param {float} x
 * @param {float} y
 * @param {Grid} gridObject
 * @description melakukan refleksi bidang terhadap titik (x,y), di mana koordinat masing-masing point bidang berubah. ax' = n + (n - ax) = 2n - ax dan ay' = n + (n - ay) = 2n - ay
 */
Square.prototype.reflectionXY = function( x, y, gridObject ) {
    var xA = 2 * x - parseFloat(this.pointA.x);
    var xB = 2 * x - parseFloat(this.pointB.x);
    var xC = 2 * x - parseFloat(this.pointC.x);
    var xD = 2 * x - parseFloat(this.pointD.x);
    var yA = 2 * y - parseFloat(this.pointA.y);
    var yB = 2 * y - parseFloat(this.pointB.y);
    var yC = 2 * y - parseFloat(this.pointC.y);
    var yD = 2 * y - parseFloat(this.pointD.y);
    
    var pA = new Point( xA, yA, false, "A'", "blue" );
    var pB = new Point( xB, yB, false, "B'", "blue" );
    var pC = new Point( xC, yC, false, "C'", "blue" );
    var pD = new Point( xD, yD, false, "D'", "blue" );
    
    var squareR = new Square( pA, pB, pC, pD, gridObject.randomColor() );
    squareR.draw( gridObject );
};

/**
 * Method untuk melakukan rotasi pada segiempat dengan pusat (rx, ry) dan 
 * rotasi sebesar rDeg
 * @param {double} xr
 * @param {double} yr
 * @param {radian} rDeg Derajat rotasi segiempat
 * @param {Grid} gridObject
 * @returns {undefined}
 */
Square.prototype.rotate = function(xr, yr, rDeg, gridObject) {
    
    rDeg = gridObject.degToRad(rDeg);
    
    var xA = this.rotateX(this.pointA.x, this.pointA.y, xr, yr, rDeg);
    var yA = this.rotateY(this.pointA.x, this.pointA.y, xr, yr, rDeg);
    var xB = this.rotateX(this.pointB.x, this.pointB.y, xr, yr, rDeg);
    var yB = this.rotateY(this.pointB.x, this.pointB.y, xr, yr, rDeg);
    var xC = this.rotateX(this.pointC.x, this.pointC.y, xr, yr, rDeg);
    var yC = this.rotateY(this.pointC.x, this.pointC.y, xr, yr, rDeg);
    var xD = this.rotateX(this.pointD.x, this.pointD.y, xr, yr, rDeg);
    var yD = this.rotateY(this.pointD.x, this.pointD.y, xr, yr, rDeg);
    
    var pA = new Point( xA, yA, false, "A'" );
    var pB = new Point( xB, yB, false, "B'" );
    var pC = new Point( xC, yC, false, "C'" );
    var pD = new Point( xD, yD, false, "D'" );
    
    var squareR = new Square( pA, pB, pC, pD, gridObject.randomColor() );
    squareR.draw( gridObject );
    
};

Square.prototype.convertToGridScale = Polygon.convertToGridScale(gridObject);