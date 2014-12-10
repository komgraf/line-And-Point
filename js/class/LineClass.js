/**
 * Constructor class Line
 * @param {Point} pointA
 * @param {Point} pointB
 * @param {boolean} startArrow True, terdapat panah pada awal garis <br>
 * False, tidak terdapat panah pada awal garis
 * @param {boolean} endArrow True, terdapat panah pada akhir garis <br>
 * False, tidak terdapat panah pada akhir garis
 * @param {String} color
 */
function Line(pointA, pointB, startArrow, endArrow, color) {
    this.pointA = pointA;
    this.pointB = pointB;
    this.startArrow = (startArrow === undefined) ? false : startArrow;
    this.endArrow = (endArrow === undefined) ? false : endArrow;
    this.color = (color === undefined) ? "#000" : color;
}

/**
 * Method untuk menghitung panjang garis
 * @param {Grid} gridObject
 * @returns {double} Panjang garis 
 */
Line.prototype.length = function(gridObject) {
    var x1 = (this.pointA.isReal) ? gridObject.reconvertX(this.pointA.x) : this.pointA.x;
    var y1 = (this.pointA.isReal) ? gridObject.reconvertY(this.pointA.y) : this.pointA.y;
    var x2 = (this.pointB.isReal) ? gridObject.reconvertX(this.pointB.x) : this.pointB.x;
    var y2 = (this.pointB.isReal) ? gridObject.reconvertY(this.pointB.y) : this.pointB.y;
    
    var result = Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2);
    result = Math.sqrt(result);

    return result.toFixed(4);
};

/**
 * Method untuk menggambar garis
 * @param {Grid} gridObject
 */
Line.prototype.draw = function(gridObject) {
    var ctx = gridObject.ctx;
    ctx.strokeStyle = this.color;
    
    var x1 = (this.pointA.isReal) ? this.pointA.x : gridObject.convertX(this.pointA.x);
    var y1 = (this.pointA.isReal) ? this.pointA.y : gridObject.convertY(this.pointA.y);
    var x2 = (this.pointB.isReal) ? this.pointB.x : gridObject.convertX(this.pointB.x);
    var y2 = (this.pointB.isReal) ? this.pointB.y : gridObject.convertY(this.pointB.y);
    
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    
    this.drawArrow(ctx, x1, y1, x2, y2);
    gridObject.arrObject.push(this);
    
};

Line.prototype.drawArrow = function(ctx, x1, y1, x2, y2) {
    if(this.startArrow === true) {
// this block of code is a credit to http://stackoverflow.com/questions/16025326/html-5-canvas-complete-arrowhead
        var startRadians=Math.atan((y2-y1)/(x2-x1));
        startRadians+=((x2>=x1)?-90:90)*Math.PI/180;
        this.drawArrowHead(ctx, x1, y1, startRadians);
// end of credit
    }
    
    if (this.endArrow === true) {
// this block of code is a credit to http://stackoverflow.com/questions/16025326/html-5-canvas-complete-arrowhead
        var endRadians = Math.atan((y2 - y1) / (x2 - x1));
        endRadians += ((x2 >= x1) ? 90 : -90) * Math.PI / 180;
        this.drawArrowHead(ctx, x2, y2, endRadians);
// end of credit       
    }
};

Line.prototype.drawArrowHead = function(ctx, x, y, radians) {
    ctx.save();
    ctx.beginPath();
    ctx.translate(x, y);
    ctx.rotate(radians);
    ctx.moveTo(0, 0);
    ctx.lineTo(5, 20);
    ctx.lineTo(-5, 20);
    ctx.closePath();
    ctx.restore();
    ctx.fill();
};

Line.prototype.translate = function(xt, yt, gridObject) {

    var newPointA = new Point(this.pointA.x + parseFloat(xt), this.pointA.y + parseFloat(yt), this.pointA.isReal);
    var newPointB = new Point(this.pointB.x + parseFloat(xt), this.pointB.y + parseFloat(yt), this.pointB.isReal);

    var newLine = new Line(newPointA, newPointB, this.startArrow, this.endArrow, this.color);
    newLine.draw(gridObject);
}