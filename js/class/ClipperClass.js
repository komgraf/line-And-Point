/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function Clipper(xMin, yMin, xMax, yMax, isReal) {
    this.xMin = xMin;
    this.xMax = xMax;
    this.yMin = yMin;
    this.yMax = yMax;
    this.isReal = isReal;

    Shape.call(this);
}

Clipper.prototype = Object.create(Shape.prototype);

Clipper.prototype.constructor = Clipper;

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

Clipper.prototype.clip = function(gridObject) {

    var arrObject = gridObject.arrObject;
    console.log(arrObject);
    var arrVisibleObject = new Array();

    for (var i = 0; i < arrObject.length; i++) {
        var obj = arrObject[i];

        /*  LOGGING
        console.log(obj);
        console.log('i : ' + i);
        */

        if (obj instanceof Point) {

            if (this.clipPoint(obj)) {
                arrVisibleObject.push(obj);
            }
        }
        if (obj instanceof Line) {
            var objRet = this.clipLine(obj);
            if (objRet !== null) {
                arrVisibleObject.push(objRet);
            }
        }

        if(obj instanceof Polygon) {
            obj.convertToGridScale(gridObject);
            var arrPoint = new Array();

            for(var k = 0; k<obj.arrPoint.length; k++) {
                if((k+1) < obj.arrPoint.length) {
                    var p1 = obj.arrPoint[k];
                    var p2 = obj.arrPoint[k+1];
                } else {
                    var p1 = obj.arrPoint[k];
                    var p2 = obj.arrPoint[0];
                }

                /* LOGGING
                console.log('p1');
                console.log(p1);
                console.log('p2');
                console.log(p2);
                */

                var line = new Line(p1, p2);

                /* LOGGING
                console.log(line);
                */

                var objRet = this.clipLine(line);
                if(objRet !== null) {
                    if(!this.isPointExistInArray(objRet.pointA, arrPoint)) {
                        arrPoint.push(objRet.pointA);
                    }
                    if(!this.isPointExistInArray(objRet.pointB, arrPoint)) {
                        arrPoint.push(objRet.pointB);
                    }    
                }
            }

            if(arrPoint.length > 0) {
                var polygon = new Polygon(arrPoint, obj.lineColor, obj.fillColor);
                arrVisibleObject.push(polygon);
            }
            

        }
        
    }

    gridObject.clear();

    this.draw(gridObject);

    for (var i = 0; i < arrVisibleObject.length; i++) {
        var obj = arrVisibleObject[i];
        obj.draw(gridObject);
    }

};


Clipper.prototype.clipLine = function(lineObject) {

    var xStart = parseFloat(lineObject.pointA.x);
    var yStart = parseFloat(lineObject.pointA.y);
    var xEnd = parseFloat(lineObject.pointB.x);
    var yEnd = parseFloat(lineObject.pointB.y);

    var gradien = parseFloat(yEnd) - parseFloat(yStart);
    gradien = parseFloat(gradien) / (parseFloat(xEnd) - parseFloat(xStart));

    var resultLine = new Line();

    var LRBTStart = this.getLRBT(xStart, yStart);
    var LRBTEnd = this.getLRBT(xEnd, yEnd);
    
    // console.log('LRBTStart : '+LRBTStart[0]+LRBTStart[1]+LRBTStart[2]+LRBTStart[3]);
    // console.log('LRBTEnd : '+LRBTEnd[0]+LRBTEnd[1]+LRBTEnd[2]+LRBTEnd[3]);

    if (this.isLineVisible(LRBTStart, LRBTEnd)) {

        if (this.getLRBTValue(LRBTStart) === 0 && this.getLRBTValue(LRBTEnd) === 0) {
            return lineObject;
        }

        if (this.getLRBTValue(LRBTStart) !== 0) {
            resultLine.pointA = this.getLinePoint(LRBTStart, lineObject.pointA, gradien);
            // console.log(pointA);
        } else {
            resultLine.pointA = lineObject.pointA;
            resultLine.startArrow = lineObject.startArrow;
        }

        if (this.getLRBTValue(LRBTEnd) !== 0) {
            resultLine.pointB = this.getLinePoint(LRBTEnd, lineObject.pointB, gradien);
            // console.log(pointB);
        } else {
            resultLine.pointB = lineObject.pointB;
            resultLine.endArrow = lineObject.endArrow;
        }
    }
    // console.log('pointA : ' + resultLine.pointA.x+", "+resultLine.pointA.y);
    // console.log('pointB : ' + resultLine.pointB.x+", "+resultLine.pointB.y);
    resultLine.color = lineObject.color;

    if(resultLine.pointA === undefined || resultLine.pointB === undefined) {
        return null;
    } else {
        return resultLine;
    }

};

Clipper.prototype.validX = function(x) {
    x = (parseFloat(x) > parseFloat(this.xMax)) ? this.xMax : x;
    x = (parseFloat(x) < parseFloat(this.xMin)) ? this.xMin : x;
    
    return x;
};

Clipper.prototype.validY = function(y) {
    y = (parseFloat(y) > parseFloat(this.yMax)) ? this.yMax : y;
    y = (parseFloat(y) < parseFloat(this.yMin)) ? this.yMin : y;

    return y;
};

Clipper.prototype.getLRBT = function(x, y) {
    var arrLRBT = new Array();

    if (x >= this.xMin) {
        arrLRBT.push(0);
    } else {
        arrLRBT.push(1);
    }
    if (x <= this.xMax) {
        arrLRBT.push(0);
    } else {
        arrLRBT.push(1);
    }

    if (y >= this.yMin) {
        arrLRBT.push(0);
    } else {
        arrLRBT.push(1);
    }
    if (y <= this.yMax) {
        arrLRBT.push(0);
    } else {
        arrLRBT.push(1);
    }
    return arrLRBT;
};

Clipper.prototype.getLRBTValue = function(arrLRBT) {
    var hasil = 0;
    for (var i = 0; i < arrLRBT.length; i++) {
        hasil += parseInt(arrLRBT[i]);
    }
    return hasil;
};

Clipper.prototype.getLinePoint = function(LRBTValue, replacedPointObject, gradien) {

    var xBatas = parseFloat(replacedPointObject.x);
    var yBatas = parseFloat(replacedPointObject.y);

    // console.log("Batas : "+xBatas+", "+yBatas);

    var resultPoint = new Point();
    resultPoint.isReal = replacedPointObject.isReal;
    resultPoint.color = replacedPointObject.color;

    if (LRBTValue[0] === 1) {
        var yp1 = parseFloat(yBatas) + (parseFloat(gradien) * (parseFloat(this.xMin) - parseFloat(xBatas)));
        resultPoint.y = (parseFloat(this.validY(yp1)));
        resultPoint.x = (isNaN(resultPoint.x)) ? parseFloat(this.xMin) : parseFloat(resultPoint.x);
        // console.log('start yp1 : ' + yp1);
    } 
    if (LRBTValue[1] === 1) {
        var yp2 = parseFloat(yBatas) + (parseFloat(gradien) * (parseFloat(this.xMax) - parseFloat(xBatas)));
        resultPoint.y = parseFloat(this.validY(yp2));
        resultPoint.x = (isNaN(resultPoint.x)) ? parseFloat(this.xMax) : parseFloat(resultPoint.x);
        // console.log('start yp2 : ' + yp2);
    } 
    if (LRBTValue[2] === 1) {
        var xp1 = parseFloat(xBatas) + ((parseFloat(this.yMin) - parseFloat(yBatas)) / parseFloat(gradien));
        resultPoint.x = parseFloat(this.validX(xp1));
        resultPoint.y = (isNaN(resultPoint.y)) ? parseFloat(this.yMin) : parseFloat(resultPoint.y);
        // console.log('start xp1 : ' + xp1);
    }
    if (LRBTValue[3] === 1) {
        var xp2 = parseFloat(xBatas) + ((parseFloat(this.yMax) - parseFloat(yBatas)) / parseFloat(gradien));
        resultPoint.x = parseFloat(this.validX(xp2));
        resultPoint.y = (isNaN(resultPoint.y)) ? parseFloat(this.yMax) : parseFloat(resultPoint.y);
        // console.log('start xp2 : ' + xp2);
    }

    // console.log('resultPoint: '+resultPoint.x+", "+resultPoint.y);

    return resultPoint;
};

Clipper.prototype.isLineVisible = function(LRBTStart, LRBTEnd) {
    for (var i = 0; i < LRBTStart.length; i++) {
        if (LRBTStart[i] && LRBTEnd[i]) {
            return false;
        }
    }
    return true;
};

Clipper.prototype.clipPoint = function(pointObject) {

    var x = pointObject.x;
    var y = pointObject.y;

    if (x < this.xMin || x > this.xMax || y < this.yMin || y > this.yMax) {
        return false;
    }

    return true;

};

Clipper.prototype.translate = function(xt, yt, gridObject) {

    var arrObj = gridObject.arrObject;

    for (var i = arrObj.length - 1; i >= 0; i--) {
        arrObj[i].translate(xt, yt, gridObject);
    };
    
    xMin = parseFloat(this.xMin) + parseFloat(xt);
    xMax = parseFloat(this.xMax) + parseFloat(xt);
    yMin = parseFloat(this.yMin) + parseFloat(yt);
    yMax = parseFloat(this.yMax) + parseFloat(yt);

    // console.log('xMin : '+xMin);
    // console.log('xMax : '+xMax);
    // console.log('yMin : '+yMin);
    // console.log('yMax : '+yMax);

    var newClip = new Clipper(xMin, yMin, xMax, yMax, this.isReal);
    newClip.draw(gridObject);


};

Clipper.prototype.rotate

Clipper.prototype.isPointExistInArray = function(objPoint, arrPoint) {
    for (var i = arrPoint.length - 1; i >= 0; i--) {
        if(objPoint.isEqual(arrPoint[i])) {
            return true;
        }
    };
    return false;
};
