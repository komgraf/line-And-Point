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
}

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
        console.log(obj);
        console.log('i : ' + i);
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
            for(var k = 0; k<obj.arrPoint.length; k++) {
                if((k+1) < obj.arrPoint.length) {
                    var p1 = obj.arrPoint[k];
                    var p2 = obj.arrPoint[k+1];
                } else {
                    var p1 = obj.arrPoint[k];
                    var p2 = obj.arrPoint[0];
                }

                console.log('p1');
                console.log(p1);
                console.log('p2');
                console.log(p2);
                
                var line = new Line(p1, p2);
                console.log(line);
                var objRet = this.clipLine(line);
                if (objRet !== null) {
                    arrVisibleObject.push(objRet);
                }
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
            var pointA = new Point();
            pointA.isReal = lineObject.pointA.isReal;
            
            if (LRBTStart[0] === 1) {
                var yp1 = parseFloat(yStart) + (parseFloat(gradien) * (parseFloat(this.xMin) - parseFloat(xStart)));
                pointA.y = (parseFloat(this.validY(yp1)));
                pointA.x = (isNaN(pointA.x)) ? parseFloat(this.xMin) : parseFloat(pointA.x);
                // console.log('start yp1 : ' + yp1);
            } 
            if (LRBTStart[1] === 1) {
                var yp2 = parseFloat(yStart) + (parseFloat(gradien) * (parseFloat(this.xMax) - parseFloat(xStart)));
                pointA.y = parseFloat(this.validY(yp2));
                pointA.x = (isNaN(pointA.x)) ? parseFloat(this.xMax) : parseFloat(pointA.x);
                // console.log('start yp2 : ' + yp2);
            } 
            if (LRBTStart[2] === 1) {
                var xp1 = parseFloat(xStart) + ((parseFloat(this.yMin) - parseFloat(yStart)) / parseFloat(gradien));
                pointA.x = this.validX(xp1);
                pointA.y = (isNaN(pointA.y)) ? parseFloat(this.yMin) : parseFloat(pointA.y);
                // console.log('start xp1 : ' + xp1);
            }
            if (LRBTStart[3] === 1) {
                var xp2 = parseFloat(xStart) + ((parseFloat(this.yMax) - parseFloat(yStart)) / parseFloat(gradien));
                pointA.x = parseFloat(this.validX(xp2));
                pointA.y = (isNaN(pointA.y)) ? parseFloat(this.yMax) : parseFloat(pointA.y);
                // console.log('start xp2 : ' + xp2);
            }

            resultLine.pointA = pointA;
            // console.log(pointA);

        } else {
            resultLine.pointA = lineObject.pointA;
            resultLine.startArrow = lineObject.startArrow;
        }

        if (this.getLRBTValue(LRBTEnd) !== 0) {
            var pointB = new Point();
            pointB.isReal = lineObject.pointB.isReal;
            // console.log(pointB);

            if (LRBTEnd[0] === 1) {
                var yp1 = yEnd + (gradien * (this.xMin - xEnd));
                pointB.y = parseFloat(this.validY(yp1));
                pointB.x = (isNaN(pointB.x)) ? parseFloat(this.xMin) : parseFloat(pointB.x);
                // console.log('yp1 : ' + yp1);
            }
            if (LRBTEnd[1] === 1) {
                var yp2 = yEnd + (gradien * (this.xMax - xEnd));
                pointB.y = parseFloat(this.validY(yp2));
                pointB.x = (isNaN(pointB.x)) ? parseFloat(this.xMax) : parseFloat(pointB.x);
                // console.log('yp2 : ' + yp2);
            }
            if (LRBTEnd[2] === 1) {
                var xp1 = xEnd + ((this.yMin - yEnd) / gradien);
                pointB.x = parseFloat(this.validX(xp1));
                pointB.y = (isNaN(pointB.y)) ? parseFloat(this.yMin) : parseFloat(pointB.y);
                // console.log('xp1 : ' + xp1);
            }
            if (LRBTEnd[3] === 1) {
                var xp2 = xEnd + ((this.yMax - yEnd) / gradien);
                pointB.x = parseFloat(this.validX(xp2));
                pointB.y = (isNaN(pointB.y)) ? parseFloat(this.yMax) : parseFloat(pointB.y);
                // console.log('xp2 : ' + xp2);
            }

            resultLine.pointB = pointB;
            // console.log(pointB);

        } else {
            resultLine.pointB = lineObject.pointB;
            resultLine.endArrow = lineObject.endArrow;
        }
    }

    // console.log('pointA' + resultLine.pointA);
    // console.log('pointB' + resultLine.pointB);

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