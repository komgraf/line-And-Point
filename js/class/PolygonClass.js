/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Polygon(arrPoint, lineColor, fillColor) {
    this.arrPoint = arrPoint;
    this.lineColor = (lineColor === undefined) ? "#000" : lineColor;
    this.fillColor = fillColor;
    Shape.call(this);
}

Polygon.prototype = Object.create(Shape.prototype);

Polygon.prototype.constructor = Polygon;

Polygon.prototype.draw = function(gridObject) {

    var canvasContext = gridObject.ctx;

    for (var i = 0; i < this.arrPoint.length; i++) {
        var pointObject = this.arrPoint[i];
        pointObject.owner = "Polygon";
        pointObject.draw(gridObject);
    }

    canvasContext.strokeStyle = this.lineColor;
    canvasContext.beginPath();

    for (var i = 0; i < this.arrPoint.length; i++) {
        var pointObject = this.arrPoint[i];
        var x = (pointObject.isReal) ? pointObject.x : gridObject.convertX(pointObject.x);
        var y = (pointObject.isReal) ? pointObject.y : gridObject.convertY(pointObject.y);

        if (i === 0) {
            canvasContext.moveTo(x, y);
        } else {
            canvasContext.lineTo(x, y);
        }
    }

    canvasContext.closePath();
    canvasContext.stroke();

    if (this.fillColor !== undefined) {
        canvasContext.fillStyle = this.fillColor;
        canvasContext.fill();
    }

    if (!gridObject.isObjectExistInArray(this, gridObject.arrObject)) {
        gridObject.arrObject.push(this);
    }

};

Polygon.prototype.translate = function(xt, yt, gridObject) {

    var arrPoint = new Array();

    for (var i = this.arrPoint.length - 1; i >= 0; i--) {
        var oldPoint = this.arrPoint[i];
        var p = new Point(oldPoint.x + parseFloat(xt), oldPoint.y + parseFloat(yt), oldPoint.isReal);
        arrPoint.push(p);
    }
    ;

    var polygon = new Polygon(arrPoint, this.lineColor, this.fillColor);

    polygon.draw(gridObject);
};

Polygon.prototype.convertToGridScale = function(gridObject) {
    for (var i = 0; i < this.arrPoint.length; i++) {
        var pointObject = this.arrPoint[i];
        if (pointObject.isReal === true) {
            pointObject.x = gridObject.reconvertX(pointObject.x);
            pointObject.y = gridObject.reconvertY(pointObject.y);
            pointObject.isReal = false;
        }
        this.arrPoint[i] = pointObject;
    }
};

Polygon.prototype.rotate = function(xr, yr, rDeg, gridObject) {
    rDeg = gridObject.degToRad(rDeg);

    for (var i = 0; i < this.arrPoint.length; i++) {
        var x = this.rotateX(this.arrPoint[i].x, this.arrPoint[i].y, xr, yr, rDeg);
        var y = this.rotateY(this.arrPoint[i].x, this.arrPoint[i].y, xr, yr, rDeg);
        this.arrPoint[i].x = x;
        this.arrPoint[i].y = y;
    }

    this.lineColor = gridObject.randomColor();
    this.draw(gridObject);
};

Polygon.prototype.scaleUniform = function(t, gridObject) {
    this.scale(t, t, gridObject);
};

/**
 * Method untuk melakukan scaling pada objek Polygon
 * @param {float} xt
 * @param {float} yt
 * @param {Grid} gridObject
 */
Polygon.prototype.scale = function(xt, yt, gridObject) {
    xt = Math.abs(xt);
    yt = Math.abs(yt);

    var dx = this.arrPoint[0].x * parseFloat(xt) - this.arrPoint[0].x;
    var dy = this.arrPoint[0].y * parseFloat(yt) - this.arrPoint[0].y;

    for (var i = 0; i < this.arrPoint.length; i++) {
        this.arrPoint[i] = new Point(this.arrPoint[i].x * parseFloat(xt) - dx, this.arrPoint[i].y * parseFloat(yt) - dy,
                this.arrPoint[i].isReal, this.arrPoint[i].name + "'");
    }
    this.lineColor = gridObject.randomColor();
    this.draw(gridObject);

};

/**
 * Method Untuk melakukan Shear/penggeseran pada Polygon tehadap sumbu x
 * @param {double} shx
 * @param {double} yref
 * @param {Grid} gridObject
 * @description rumusnya : X’ = x + shx(y – yref), Y’ = Y
 * @author Umam
 */
Polygon.prototype.shearX = function(shx, yref, gridObject) {
    for (var i = 0; i < this.arrPoint.length; i++) {
        this.arrPoint[i] = new Point(this.arrPoint[i].x + (shx * (this.arrPoint[i].y - yref)), this.arrPoint[i].y, this.arrPoint[i].isReal);
    }

    this.draw(gridObject);
};

/**
 * Method Untuk melakukan Shear/penggeseran pada Polygon tehadap sumbu y
 * @param {double} shy
 * @param {double} xref
 * @param {Grid} gridObject
 * @description rumusnya : X’ = X, Y’ = shy(X – Xref) + Y
 * @author Umam
 */
Polygon.prototype.shearY = function(shy, xref, gridObject) {
    for (var i = 0; i < this.arrPoint.length; i++) {
        this.arrPoint[i] = new Point(this.arrPoint[i].x, this.arrPoint[i].y + (shy * (this.arrPoint[i].x - xref)), this.arrPoint[i].isReal);
    }

    this.draw(gridObject);
};

Polygon.prototype.reflectionXAxis = function(gridObject) {
    this.reflectionY(0, gridObject);
};

/**
 * Method refleksi bidang terhadap sumbu Y (x = 0)
 * @param {Grid} gridObject
 * @description melakukan refleksi bidang terhadap sumbu Y, dengan memanggil method reflectionX() karena refleksi sumbu Y sama dengan refleksi terhadap garis x=0
 */
Polygon.prototype.reflectionYAxis = function(gridObject) {
    this.reflectionX(0, gridObject);
};

/**
 * Method refleksi bidang terhadap koordinat pusat (0,0)
 * @param {Grid} gridObject
 * @description melakuka refleksi bidang terhadap titik (0,0), dengan memanggil method reflectionXY() dengan parameter koordinat (0,0)
 */
Polygon.prototype.reflectionCenter = function(gridObject) {
    this.reflectionXY(0, 0, gridObject);
};

/**
 * Method refleksi bidang terhadap garis x = n
 * @param {float} n
 * @param {Grid} gridObject
 * @description melakukan refleksi bidang terhadap garis x=n, di mana hanya absis masing-masing point bidang yang berubah. ax' = n + (n - ax) = 2n - ax
 */
Polygon.prototype.reflectionX = function(n, gridObject) {

    for (var i = 0; i < this.arrPoint.length; i++) {
        this.arrPoint[i].x = 2 * parseFloat(n) - parseFloat(this.arrPoint[i].x);
    }

    this.lineColor = gridObject.randomColor();
    this.fillColor = gridObject.randomColor();
    this.draw(gridObject);

};

/**
 * Method refleksi bidang terhadap garis y = n
 * @param {float} n
 * @param {Grid} gridObject
 * @description melakukan refleksi bidang terhadap garis y=n, di mana hanya ordinat masing-masing point bidang yang berubah. ay' = n + (n - ay) = 2n - ay
 */
Polygon.prototype.reflectionY = function(n, gridObject) {

    for (var i = 0; i < this.arrPoint.length; i++) {
        this.arrPoint[i].y = 2 * parseFloat(n) - parseFloat(this.arrPoint[i].y);
    }

    this.lineColor = gridObject.randomColor();
    this.fillColor = gridObject.randomColor();
    this.draw(gridObject);

};

/**
 * Method refleksi bidang terhadap titik x,y
 * @param {float} x
 * @param {float} y
 * @param {Grid} gridObject
 * @description melakukan refleksi bidang terhadap titik (x,y), di mana koordinat masing-masing point bidang berubah. ax' = n + (n - ax) = 2n - ax dan ay' = n + (n - ay) = 2n - ay
 */
Polygon.prototype.reflectionXY = function(x, y, gridObject) {

    for (var i = 0; i < this.arrPoint.length; i++) {
        this.arrPoint[i].x = 2 * parseFloat(x) - parseFloat(this.arrPoint[i].x);
        this.arrPoint[i].y = 2 * parseFloat(y) - parseFloat(this.arrPoint[i].y);
    }

    this.lineColor = gridObject.randomColor();
    this.fillColor = gridObject.randomColor();
    this.draw(gridObject);

};

Polygon.prototype.isEqual = function(polygonObject) {
    if (this.arrPoint.length !== polygonObject.arrPoint.length) {
        return false;
    } else {
        for (var i = 0; i > this.arrPoint.length; i++) {
            if (!this.arrPoint[i].isEqual(polygonObject.arrPoint[i])) {
                return false;
            }
        }
    }
    return true;
};
