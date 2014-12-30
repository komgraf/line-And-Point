
/**
 * Constructor class Clipper
 * @param {float} xMin Batas x bawah clipping area
 * @param {float} yMin Batas y bawah clipping area
 * @param {float} xMax Batas x atas clipping area
 * @param {float} yMax Batas y atas clipping area
 * @param {boolean} isReal Menunjukkan apakah koordinat x dan y merupakan 
 * koordinat asli canvas atau bukan
 * @returns {Clipper}
 */
function Clipper(xMin, yMin, xMax, yMax, isReal) {
    this.xMin = xMin;
    this.yMin = yMin;
    this.xMax = xMax;
    this.yMax = yMax;
    this.isReal = isReal;
    this.arrObject = new Array();
    Shape.call(this);
}

Clipper.prototype = Object.create(Shape.prototype);

Clipper.prototype.constructor = Clipper;

/**
 * Method untuk menggambar area clipping di canvas
 * @param {Grid} gridObject Objek grid yang mewakili canvas
 */
Clipper.prototype.draw = function(gridObject) {

    var xMin = (this.isReal) ? this.xMin : gridObject.convertX(this.xMin);
    var yMin = (this.isReal) ? this.yMin : gridObject.convertY(this.yMin);
    var xMax = (this.isReal) ? this.xMax : gridObject.convertX(this.xMax);
    var yMax = (this.isReal) ? this.yMax : gridObject.convertY(this.yMax);

    var ctx = gridObject.ctx;
    ctx.strokeStyle = "#000";
    ctx.beginPath();
    ctx.moveTo(xMin, yMin);
    ctx.lineTo(xMin, yMax);
    ctx.lineTo(xMax, yMax);
    ctx.lineTo(xMax, yMin);
    ctx.closePath();
    ctx.stroke();

};

/**
 * Method untuk melakukan clipping objek
 * @param {Grid} gridObject Objek grid yang mewakili canvas
 */
Clipper.prototype.clip = function(gridObject) {

    var arrObj = gridObject.arrObject;

    for (var i = arrObj.length - 1; i >= 0; i--) {
        var obj = this.clipObject(arrObj[i]);
        if (obj !== null) {
            this.arrObj.push(obj);
        }
    }
    
    gridObject.clear();
    gridObject.arrObject = this.arrObject;

    for (var i = this.arrObject.length - 1; i >= 0; i--) {
        this.arrObject[i].draw(gridObject);
    }

    this.draw(gridObject);

};

/**
 * Method untuk melakukan clipping objek. Pada method ini objek akan diclip berdasarkan tipe objeknya.
 * @param {Point|Line|Polygon} obj Instance atau turunan class Point, class Line, atau class Polygon
 * @returns {null|Point|Line|Polygon} Mengembalikan objek sesuai dengan tipe variabel <code>obj</code>, 
 * Mengembalikan <code>null</code> jika <code>obj</code> sama dengan <code>null</code>
 */
Clipper.prototype.clipObject = function(obj) {
    if (obj instanceof Point) {
        return this.clipPoint(obj);
    } else if (obj instanceof Line) {
        return this.clipLine(obj);
    } else if (obj instanceof Polygon) {
        return this.clipPolygon(obj);
    } else {
        return null;
    }
};

/**
 * Method untuk melakukan clipping pada objek Point.
 * Pada method ini dilakukan pengecekan apakah objek <code>pointObject</code>
 * berada di dalam area clipping atau tidak.
 * @param {Point} pointObject Objek dari class Point
 * @returns {Point|null} Mengembalikan objek dari class Point atau <code>null</code>
 * jika objek <code>pointObject</code> berada di luar area clipping
 */
Clipper.prototype.clipPoint = function(pointObject) {
    
    var arrLRBT = this.getPointLRBT(pointObject);
    return ((this.calculateLRBTValue(arrLRBT)) === 0) ? pointObject : null;

};

/**
 * Method untuk melakukan clipping pada objek Line.
 * Pada method ini akan dilakukan pengecekan terhadap posisi garis.
 * Jika seluruh garis tidak berada pada area clipping, maka akan mengembalikan null
 * Jika seluruh garis berada pada area clipping, maka akan mengembalikan objek <code>lineObject</code>
 * Jika sebagian garis berada pada area clipping, maka garis akan diclip dan
 * method akan mengembalikan bagian garis yang berada pada area clipping
 * @param {Line} lineObject Objek dari class Line
 * @returns {Line|null} Mengembalikan objek Line jika objek <code>lineObject</code>
 * sebagian atau seluruhnya berada di dalam area clipping.
 * Mengembalikan <code>null</code> jika objek <code>lineObject</code> seluruhnya
 * tidak berada di dalam area clipping
 */
Clipper.prototype.clipLine = function(lineObject) {
    var arrLRBTStart = this.getPointLRBT(lineObject.pointA);
    var arrLRBTEnd = this.getPointLRBT(lineObject.pointB);

    if (!this.calculateLineVisible(arrLRBTStart, arrLRBTEnd)) {
        return null;
    } else if (this.isLineFullyVisible(arrLRBTStart, arrLRBTEnd)) {
        return lineObject;
    } else {
        return this.clipLinePartial(lineObject);
    }
};

/**
 * Method untuk melakukan clipping pada objek Line yang sebagian berada
 * pada area clipping dan sebagian di luar area clipping
 * @param {Line} lineObject Objek dari class Line
 * @returns {Line} Objek dari class Line yang berada di dalam area clipping
 */
Clipper.prototype.clipLinePartial = function(lineObject) {
    var arrLRBTStart = this.getPointLRBT(lineObject.pointA);
    var arrLRBTEnd = this.getPointLRBT(lineObject.pointB);
    var gradien = this.calculateLineGradien(lineObject);

    var resultLine = new Line();

    if (this.calculateLRBTValue(arrLRBTStart) === 0) {
        resultLine.pointA = lineObject.pointA;
        resultLine.startArrow = lineObject.startArrow;
    } else {
        resultLine.pointA = this.getIntersectionPoint(lineObject.pointA, arrLRBTStart, gradien);
    }

    if (this.calculateLRBTValue(arrLRBTEnd) === 0) {
        resultLine.pointB = lineObject.pointB;
        resultLine.endArrow = lineObject.endArrow;
    } else {
        resultLine.pointB = this.getIntersectionPoint(lineObject.pointB, arrLRBTEnd, gradien);
    }

    return resultLine;
};

/**
 * Method untuk menghitung titik potong antara garis dengan batas area clipping 
 * @param {Point} replacedPointObject Objek dari class Point
 * @param {Array} LRBTValue Array yang berisi nilai LRBT
 * @param {float} gradien Gradien garis
 * @returns {Point} Objek dari class Point yang merupakan titik potong garis dengan batas area clipping
 */
Clipper.prototype.getIntersectionPoint = function(replacedPointObject, LRBTValue, gradien) {

    var resultPoint = new Point();

    if (LRBTValue[0] === 1) {
        var yp1 = this.calcYonXMinIntersection(replacedPointObject, gradien);

        resultPoint.y = (parseFloat(this.validY(yp1)));
        resultPoint.x = (isNaN(resultPoint.x)) ? parseFloat(this.xMin) : parseFloat(resultPoint.x);
        // console.log('start yp1 : ' + yp1);
    }
    if (LRBTValue[1] === 1) {
        var yp2 = this.calcYonXMaxIntersection(replacedPointObject, gradien);

        resultPoint.y = parseFloat(this.validY(yp2));
        resultPoint.x = (isNaN(resultPoint.x)) ? parseFloat(this.xMax) : parseFloat(resultPoint.x);
        // console.log('start yp2 : ' + yp2);
    }
    if (LRBTValue[2] === 1) {
        var xp1 = this.calcXonYMinIntersection(replacedPointObject, gradien);

        resultPoint.x = parseFloat(this.validX(xp1));
        resultPoint.y = (isNaN(resultPoint.y)) ? parseFloat(this.yMin) : parseFloat(resultPoint.y);
        // console.log('start xp1 : ' + xp1);
    }
    if (LRBTValue[3] === 1) {
        var xp2 = this.calcXonYMaxIntersection(replacedPointObject, gradien);

        resultPoint.x = parseFloat(this.validX(xp2));
        resultPoint.y = (isNaN(resultPoint.y)) ? parseFloat(this.yMax) : parseFloat(resultPoint.y);
        // console.log('start xp2 : ' + xp2);
    }

    // console.log('resultPoint: '+resultPoint.x+", "+resultPoint.y);

    return resultPoint;

};

/**
 * Method untuk menghitung nilai Y pada perpotongan antara objek Line dengan batas sisi kiri area clipping
 * @param {Point} pointObject Objek dari class Point
 * @param {float} gradien Gradien garis yang dicari titik potongnya
 * @returns {float} Nilai sumbu Y pada perpotongan garis
 */
Clipper.prototype.calcYonXMinIntersection = function(pointObject, gradien) {

    var result = parseFloat(pointObject.y) + (parseFloat(gradien) * (parseFloat(this.xMin) - parseFloat(pointObject.x)));

    return result;
};

/**
 * Method untuk menghitung nilai Y pada perpotongan antara objek Line dengan batas sisi kanan area clipping
 * @param {Point} pointObject Objek dari class Point
 * @param {float} gradien Gradien garis yang dicari titik potongnya
 * @returns {float} Nilai sumbu Y pada perpotongan garis
 */
Clipper.prototype.calcYonXMaxIntersection = function(pointObject, gradien) {

    var result = parseFloat(pointObject.y) + (parseFloat(gradien) * (parseFloat(this.xMax) - parseFloat(pointObject.x)));

    return result;
};

/**
 * Method untuk menghitung nilai X pada perpotongan antara objek Line dengan batas sisi bawah area clipping
 * @param {Point} pointObject Objek dari class Point
 * @param {float} gradien Gradien garis yang dicari titik potongnya
 * @returns {float} Nilai sumbu X pada perpotongan garis
 */
Clipper.prototype.calcXonYMinIntersection = function(pointObject, gradien) {

    var result = parseFloat(pointObject.x) + ((parseFloat(this.yMin) - parseFloat(pointObject.y)) / parseFloat(gradien));

    return result;
};

/**
 * Method untuk menghitung nilai X pada perpotongan antara objek Line dengan batas sisi atas area clipping
 * @param {Point} pointObject Objek dari class Point
 * @param {float} gradien Gradien garis yang dicari titik potongnya
 * @returns {float} Nilai sumbu X pada perpotongan garis
 */
Clipper.prototype.calcXonYMaxIntersection = function(pointObject, gradien) {

    var result = parseFloat(pointObject.x) + ((parseFloat(this.yMax) - parseFloat(pointObject.y)) / parseFloat(gradien));

    return result;
};

/**
 * Method untuk melakukan clipping pada objek Polygon
 * @param {Polygon} polygonObject Objek dari class Polygon atau subclassnya
 * @returns {Polygon|null} Objek class Polygon, jika <code>polygonObject</code> 
 * sebagian atau seluruhnya berada di dalam area Clipping <br>
 * <code>null</code>, jika <code>polygonObject</code> seluruhnya berada di luar area clipping
 */
Clipper.prototype.clipPolygon = function(polygonObject) {
    var arrPoint = polygonObject.arrPoint;
    var arrPolygonLine = this.arrPointToArrLine(arrPoint);
    polygonObject.arrPoint = this.clipPartPolygon(arrPolygonLine);
    return (polygonObject.arrPoint.length === 0) ? null : polygonObject;
};

/**
 * Method untuk melakukan clipping pada objek Polygon.
 * Pada method ini objek Polygon dipecah-pecah menjadi garis dan kemudian
 * diclip menggunakan method <code>clipLine()</code>
 * @param {Array} arrPolygonLine Array yang berisi garis yang menyusun objek Polygon
 * @returns {Array} Array yang berisi objek Point yang menyusun objek Polygon<br>
 * Mengembalikan Array kosong jika objek Polygon seluruhnya berada diluar area clipping
 */
Clipper.prototype.clipPartPolygon = function(arrPolygonLine) {
    var arrResultPoint = new Array();
    for (var i = arrPolygonLine.length - 1; i >= 0; i--) {
        var line = this.clipLine(arrPolygonLine[i]);
        if (line !== null) {
            if (!this.isPointExistInArray(line.pointA, arrResultPoint)) {
                arrResultPoint.push(line.pointA);
            }
            if (!this.isPointExistInArray(line.pointB, arrResultPoint)) {
                arrResultPoint.push(line.pointB);
            }
        }
    }
    return arrResultPoint;
};

/**
 * Method untuk menghitung nilai LRBT(Left, Right, Bottom, Top) dari <code>pointObject</code> 
 * @param {Point} pointObject Objek dari class Point
 * @returns {Array} Array yang berisi nilai LRBT
 */
Clipper.prototype.getPointLRBT = function(pointObject) {
    return this.getLRBT(pointObject.x, pointObject.y);
};

/**
 * Method untuk menghitung nilai LRBT(Left, Right, Bottom, Top) dari koordinat x dan y.
 * Nilai LRBT direpresentasikan dengan nilai 0 atau 1. <br>
 * Nilai 0 berarti
 * koordinat berada di dalam area clipping, dan nilai 1 berarti koordinat berada
 * di luar area clipping. <br>
 * Contoh nilai Left adalah 0 jika nilai X >= nilai <code>xMin</code>
 * Nilai Top adalah 1 jika nilai Y > nilai <code>yMax</code> 
 * @param {float} x Nilai koordinat X
 * @param {float} y Nilai korrdinat Y
 * @returns {Array} Array yang berisi nilai LRBT dengan ketentuan : <br>
 * Array[0] = Left <br>
 * Array[1] = Right <br>
 * Array[2] = Bottom <br>
 * Array[3] = Top
 */
Clipper.prototype.getLRBT = function(x, y) {
    var arrLRBT = new Array();
    arrLRBT.push((x >= this.xMin) ? 0 : 1);
    arrLRBT.push((x <= this.xMax) ? 0 : 1);
    arrLRBT.push((y >= this.yMin) ? 0 : 1);
    arrLRBT.push((y <= this.yMax) ? 0 : 1);

    return arrLRBT;
};

/**
 * Method untuk menghitung hasil jumlah dari nilai LRBT
 * @param {Array} arrLRBT Array yang berisi nilai LRBT
 * @returns {integer} Hasil jumlah nilai LRBT
 */
Clipper.prototype.calculateLRBTValue = function(arrLRBT) {
    var hasil = 0;
    for (var i = 0; i < arrLRBT.length; i++) {
        hasil += parseInt(arrLRBT[i]);
    }
    return hasil;
};

/**
 * Method untuk menghitung nilai gradien objek <code>lineObject</code>
 * @param {Line} lineObject Objek dari class Line
 * @returns {float} Nilai gradien garis
 */
Clipper.prototype.calculateLineGradien = function(lineObject) {
    var xStart = parseFloat(lineObject.pointA.x);
    var yStart = parseFloat(lineObject.pointA.y);
    var xEnd = parseFloat(lineObject.pointB.x);
    var yEnd = parseFloat(lineObject.pointB.y);

    var gradien = parseFloat(yEnd) - parseFloat(yStart);
    gradien = parseFloat(gradien) / (parseFloat(xEnd) - parseFloat(xStart));

    return gradien;
};

/**
 * Method untuk mengecek apakah objek <code>lineObject</code>
 * sebagian atau seluruhnya di dalam area clipping atau tidak
 * @param {Line} lineObject Objek dari class Line
 * @returns {boolean} True, jika sebagian atau seluruh objek <code>lineObject</code>
 * berada di dalam area clipping <br>
 * False, jika seluruh objek <code>lineObject</code> berada di luar area clipping
 */
Clipper.prototype.isLineVisible = function(lineObject) {
    var arrLRBTStart = getPointLRBT(lineObject.pointA);
    var arrLRBTEnd = getPointLRBT(lineObject.pointB);

    return this.calculateLineVisible(arrLRBTStart, arrLRBTEnd);
};

/**
 * Method untuk menghitung apakah objek Line berada di dalam area clipping atau tidak
 * @param {Array} arrLRBTStart Array berisi nilai LRBT titik awal garis
 * @param {type} arrLRBTEnd Array berisi nilai LRBT titik akhir garis
 * @returns {Boolean} True, Jika sebagian atau seluruh bagian objek Line berada 
 * di dalam area clipping <br>
 * False, jika seluruh bagian objek Line berada di luar area clipping
 */
Clipper.prototype.calculateLineVisible = function(arrLRBTStart, arrLRBTEnd) {
    for (var i = 0; i < arrLRBTStart.length; i++) {
        if (arrLRBTStart[i] && arrLRBTEnd[i]) {
            return false;
        }
    }
    return true;
};

/**
 * Method untuk mengecek apakah seluruh bagian objek Line berada 
 * di dalam area clipping atau tidak
 * @param {Array} arrLRBTStart Array berisi nilai LRBT titik awal garis
 * @param {type} arrLRBTEnd Array berisi nilai LRBT titik akhir garis
 * @returns {Boolean} True, jika seluruh bagian objek Line berada 
 * di dalam area clipping <br>
 * False, jika tidak semua bagian objek Line berada di dalam area clipping
 */
Clipper.prototype.isLineFullyVisible = function(arrLRBTStart, arrLRBTEnd) {

    if (this.calculateLRBTValue(arrLRBTStart) === 0 && this.calculateLRBTValue(arrLRBTEnd) === 0) {
        return true;
    }

    return false;
};

/**
 * Method untuk memastikan nilai X agar tidak berada di luar area clipping.
 * Method ini dipanggil oleh method <code>getIntersectionPoint()</code>
 * @param {float} x Nilai koordinat sumbu X
 * @returns {float} Nilai koordinat sumbu X setelah divalidasi
 */
Clipper.prototype.validX = function(x) {
    x = (parseFloat(x) > parseFloat(this.xMax)) ? this.xMax : x;
    x = (parseFloat(x) < parseFloat(this.xMin)) ? this.xMin : x;

    return x;
};

/**
 * Method untuk memastikan nilai Y agar tidak berada di luar area clipping.
 * Method ini dipanggil oleh method <code>getIntersectionPoint()</code>
 * @param {float} y Nilai koordinat sumbu Y
 * @returns {float} Nilai koordinat sumbu Y setelah divalidasi
 */
Clipper.prototype.validY = function(y) {
    y = (parseFloat(y) > parseFloat(this.yMax)) ? this.yMax : y;
    y = (parseFloat(y) < parseFloat(this.yMin)) ? this.yMin : y;

    return y;
};

/**
 * Method untuk mengecek apakah suatu objek Point berada di dalam Array
 * @param {Point} objPoint Objek dari class Point
 * @param {Array} arrPoint Array yang dicek
 * @returns {Boolean} True, jika objek <code>objPoint</code> berada di dalam array <code>arrPoint</code><br>
 * False, jika objek <code>objPoint</code> tidak berada di dalam array <code>arrPoint</code>
 */
Clipper.prototype.isPointExistInArray = function(objPoint, arrPoint) {
    for (var i = arrPoint.length - 1; i >= 0; i--) {
        if (objPoint.isEqual(arrPoint[i])) {
            return true;
        }
    }
    
    return false;
};

/**
 * Method untuk mengkonversi array of Point menjadi array of Line
 * @param {Array} arrPoint Array yang berisi objek Point
 * @returns {Array} Array yang berisi objek Line
 */
Clipper.prototype.arrPointToArrLine = function(arrPoint) {
    var arrLine = new Array();
    for (var i = arrPoint.length - 1; i >= 0; i--) {
        if (i === 0) {
            var pointA = arrPoint[0];
            var pointB = arrPoint[arrPoint.length - 1];
        } else {
            var pointA = arrPoint[i];
            var pointB = arrPoint[i - 1];
        }
        var line = new Line(pointA, pointB);
        arrLine.push(line);
    }

    return arrLine;
};

//======================== CLIPPER TRANSFORMATION ===============================

/**
 * Method untuk mentranslasi area clipping.
 * Method ini juga memastikan bahwa objek didalam area clipping ikut di translasikan
 * @param {float} xt Nilai translasi pada sumbu x
 * @param {float} yt Nilai translasi pada sumbu y
 * @param {Grid} gridObject Objek dari class Grid
 */
Clipper.prototype.translate = function(xt, yt, gridObject) {

    xMin = parseFloat(this.xMin) + parseFloat(xt);
    xMax = parseFloat(this.xMax) + parseFloat(xt);
    yMin = parseFloat(this.yMin) + parseFloat(yt);
    yMax = parseFloat(this.yMax) + parseFloat(yt);

    var oldClipperSize = new Array(this.xMin, this.xMax, this.yMin, this.yMax);

    var newClip = new Clipper(xMin, yMin, xMax, yMax, this.isReal);
    newClip.arrObject = this.arrObject;
    newClip.draw(gridObject);
    newClip.drawObject(oldClipperSize, gridObject);
};

/**
 * Method untuk merotasi area clipping. Method ini juga memastikan bahwa 
 * objek di dalam area clipping ikut dirotasi
 * @param {float} xr Nilai koordinat sumbu X titik pusat rotasi
 * @param {float} yr Nilai koordinat sumbu Y titik pusat rotasi
 * @param {float} rDeg Besar rotasi yang dilakukan dalam satuan derajat
 * @param {Grid} gridObject Objek dari class Grid
 */
Clipper.prototype.rotate = function(xr, yr, rDeg, gridObject) {
    rDeg = gridObject.degToRad(rDeg);

    var xMin = this.rotateX(xMin, yMin, xr, yr, rDeg);
    var yMin = this.rotateY(xMin, yMin, xr, yr, rDeg);
    var xMax = this.rotateX(xMax, yMax, xr, yr, rDeg);
    var yMax = this.rotateY(xMax, yMax, xr, yr, rDeg);

    var oldClipperSize = new Array(this.xMin, this.xMax, this.yMin, this.yMax);

    var newClip = new Clipper(xMin, yMin, xMax, yMax, this.isReal);
    newClip.arrObject = this.arrObject;
    newClip.draw(gridObject);
    newClip.drawObject(oldClipperSize, gridObject);
};

/**
 * Method untuk melakukan penskalaan pada area clipping. 
 * Method ini juga memastikan bahwa objek di dalam area clipping ikut dirotasi.
 * @param {float} t Besar penskalaan pada area clipping
 * @param {Grid} gridObject Objek dari class Grid
 */
Clipper.prototype.scale = function(t, gridObject) {

    t = Math.abs(t);
    var dx = parseFloat(this.xMin) * parseFloat(t) - parseFloat(this.xMin);
    var dy = parseFloat(this.yMin) * parseFloat(t) - parseFloat(this.yMin);

    var xMin = parseFloat(this.xMin) * parseFloat(t) - dx;
    var xMax = parseFloat(this.xMax) * parseFloat(t) - dx;
    var yMin = parseFloat(this.yMin) * parseFloat(t) - dy;
    var yMax = parseFloat(this.yMax) * parseFloat(t) - dy;

    var oldClipperSize = new Array(this.xMin, this.xMax, this.yMin, this.yMax);

    var newClip = new Clipper(xMin, yMin, xMax, yMax, this.isReal);
    newClip.arrObject = this.arrObject;
    newClip.draw(gridObject);
    newClip.drawObject(oldClipperSize, gridObject);

};

/**
 * Method untuk menggambar objek di dalam area clipping
 * @param {Array} oldClipperSize Array yang berisi nilai xMn, xMax, yMin, yMax 
 * objek clipper sebelum ditransformasi
 * @param {Grid} gridObject Objek dari class Grid
 */
Clipper.prototype.drawObject = function(oldClipperSize, gridObject) {
    var arrNewObject = new Array();

    for (var i = this.arrObject.length - 1; i >= 0; i--) {
        var obj = this.arrObject[i];
        if (obj instanceof Point) {
            var retPoint = this.calculateNewPointPosition(obj, oldClipperSize);
            arrNewObject.push(retPoint);
        } else if (obj instanceof Line) {
            var retLine = this.calculateNewLinePosition(obj, oldClipperSize);
            arrNewObject.push(retLine);
        } else if (obj instanceof Polgon) {
            var retPolygon = this.calculateNewPolygonPosition(obj, oldClipperSize);
            arrNewObject.push(retPolygon);
        }
    }
    
    for (var i = arrNewObject.length - 1; i >= 0; i--) {
        arrNewObject[i].draw(gridObject);
    }
    
};

/**
 * Method untuk menghitung posisi objek <code>objPoint</code> setelah area 
 * clipping di transformasi
 * @param {float} objPoint Objek dari class Point
 * @param {Array} oldClipperSize Array yang berisi nilai xMn, xMax, yMin, yMax 
 * objek clipper sebelum ditransformasi
 * @returns {Point} Objek dari class Point
 */
Clipper.prototype.calculateNewPointPosition = function(objPoint, oldClipperSize) {
    var wX = parseFloat(objPoint.x);
    var wY = parseFloat(objPoint.y);
    var wX1 = parseFloat(oldClipperSize[0]);
    var wX2 = parseFloat(oldClipperSize[1]);
    var wY1 = parseFloat(oldClipperSize[2]);
    var wY2 = parseFloat(oldClipperSize[3]);
    var vX1 = parseFloat(this.xMin);
    var vX2 = parseFloat(this.xMax);
    var vY1 = parseFloat(this.yMin);
    var vY2 = parseFloat(this.yMax);

    objPoint.x = vX1 + ((wX - wX1) * (vX2 - vX1) / (wX2 - wX1));
    objPoint.y = vY1 + ((wY - wY1) * (vY2 - vY1) / (wY2 - wY1));
    return objPoint;
};

/**
 * Method untuk menghitung posisi baru objek <code>lineObject</code>
 * setelah area clipping di transformasi
 * @param {Line} lineObject Objek dari class Line
 * @param {Array} oldClipperSize Array yang berisi nilai xMn, xMax, yMin, yMax 
 * objek clipper sebelum ditransformasi
 * @returns {Line} Objek dari class Line
 */
Clipper.prototype.calculateNewLinePosition = function(lineObject, oldClipperSize) {
    lineObject.pointA = this.calculateNewPointPosition(lineObject.pointA, oldClipperSize);
    lineObject.pointB = this.calculateNewPointPosition(lineObject.pointB, oldClipperSize);
    return lineObject;
};

/**
 * Method untuk menghitung posisi baru objek <code>polygonObject</code>
 * setelah area clipping ditransformasi
 * @param {Polygon} polygonObject Objek dari class Polygon
 * @param {Array} oldClipperSize Array yang berisi nilai xMn, xMax, yMin, yMax 
 * objek clipper sebelum ditransformasi
 * @returns {Polygon} Objek dari class Polygon
 */
Clipper.prototype.calculateNewPolygonPosition = function(polygonObject, oldClipperSize) {
    var arrPoint = polygonObject.arrPoint;
    var arrNewPoint = new Array();
    for (var i = arrPoint.length - 1; i >= 0; i--) {
        var retPoint = this.calculateNewPoint(arrPoint[i], oldClipperSize);
        arrNewPoint.push(retPoint);
    }
    
    polygonObject.arrPoint = arrNewPoint;
    return polygonObject;
};

