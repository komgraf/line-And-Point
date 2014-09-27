// =========== CLASS GRID ====================
function Grid() {
//    this.canvas = canvasObject;
    this.canvas = get("myCanvas");;
    this.ctx = this.canvas.getContext("2d");
    this.convert = 25;
    this.init();
}

Grid.prototype.init = function() {
    this.x0 = this.canvas.height / 2;
    this.y0 = this.canvas.width / 2;
    this.ctx.font = "13px Georgia";
    this.drawGrid();
    this.drawXY();
};

Grid.prototype.clear = function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.init();
};
Grid.prototype.drawGrid = function() {
    var nilai = (this.canvas.width / this.convert) / 2;

    for (var i = 0; i <= this.canvas.width; i++) {
        if (i % this.convert === 0) {
            var lineX = new Line(new Point(i, 0), new Point(i, this.canvas.height), false, true);
            lineX.setColor("#AAA");
            this.drawLine(lineX);
            this.drawTextReal((-1) * nilai, i + 2, this.canvas.width / 2 - 3);

            var lineY = new Line(new Point(0, i), new Point(this.canvas.width, i), false, true);
            lineY.setColor("#AAA");
            this.drawLine(lineY);
            this.drawTextReal(nilai--, this.canvas.height / 2 + 3, i - 3);
        }
    }
};
Grid.prototype.drawXY = function() {
    var pointA = new Point(0, this.canvas.height / 2, true);
    var pointB = new Point(this.canvas.width, this.canvas.height / 2, true);
    var lineX = new Line(pointA, pointB, false, true);
//    var lineX = new Line(0, this.canvas.height/2, this.canvas.width, this.canvas.height/2, this.ctx);
    lineX.setColor("#000");
    this.drawLine(lineX);
    this.drawLine(lineX);

    pointA = new Point(this.canvas.width / 2, 0, true);
    pointB = new Point(this.canvas.width / 2, this.canvas.height, true);
    var lineY = new Line(pointA, pointB, false, true);
//    var lineX = new Line(0, this.canvas.height/2, this.canvas.width, this.canvas.height/2, this.ctx);
    lineY.setColor("#000");
    this.drawLine(lineY);
    this.drawLine(lineY);

};
Grid.prototype.drawLine = function(line) {
    if (line.isReal === true) {
        this.drawLineReal(line.pointA.x, line.pointA.y, line.pointB.x, line.pointB.y, line.color, line.arrowHead);
    } else {
        this.drawLine2(line.pointA, line.pointB, line.color, line.arrowHead);
    }
};
Grid.prototype.drawLineReal = function(realX1, realY1, realX2, realY2, color, arrowHead) {
    this.ctx.strokeStyle = color;
//    this.drawPointReal(realX1, realY1, "#000");
//    this.drawPointReal(realX2, realY2, "#000");

//    gambar garis
    this.ctx.beginPath();
    this.ctx.moveTo(realX1, realY1);
    this.ctx.lineTo(realX2, realY2);
    this.ctx.stroke();

    if (arrowHead === true) {
// this block of code is a credit to http://stackoverflow.com/questions/16025326/html-5-canvas-complete-arrowhead
        var endRadians = Math.atan((realY2 - realY1) / (realX2 - realX1));
        endRadians += ((realX2 > realX1) ? 90 : -90) * Math.PI / 180;
        this.drawArrowHead(realX2, realY2, endRadians);
// end of credit       
    }
};

Grid.prototype.drawArrowHead = function(x, y, radians) {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.translate(x, y);
    this.ctx.rotate(radians);
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(5, 20);
    this.ctx.lineTo(-5, 20);
    this.ctx.closePath();
    this.ctx.restore();
    this.ctx.fill();
};

Grid.prototype.drawLine2 = function(pointA, pointB, color, arrowHead) {
    this.drawLine3(pointA.x, pointA.y, pointB.x, pointB.y, color, arrowHead);
};

Grid.prototype.drawLine3 = function(x1, y1, x2, y2, color, arrowHead) {

    x1 = this.convertX(x1);
    y1 = this.convertY(y1);
    x2 = this.convertX(x2);
    y2 = this.convertY(y2);

    this.drawLineReal(x1, y1, x2, y2, color, arrowHead);
};
Grid.prototype.convertX = function(value) {
    value *= this.convert;

    return (this.x0 + value);
};

// realY = (value * convert) 
Grid.prototype.convertY = function(value) {
    value *= this.convert;

    return (this.y0 - value);
};

// x = (realX - x0) / convert
Grid.prototype.reconvertX = function(value) {
    value -= this.x0;
    return (-1) * (value / this.convert);
};

Grid.prototype.reconvertY = function(value) {
    value -= this.y0;
    return (-1) * (value / this.convert);
};

Grid.prototype.getCoordinateText = function(x, y) {
    return "(" + x + ", " + y + ")";
};

Grid.prototype.getCoordinateTextFromReal = function(realX, realY) {
    xNew = this.convertX(x);
    yNew = this.convertY(y);
    return this.getCoordinateText(xNew, yNew);
};
Grid.prototype.drawText = function(text, point) {
    if (point.isReal === true) {
        this.drawTextReal(text, point.x, point.y);
    } else {
        this.drawText2(text, point.x, point.y);
    }
};

Grid.prototype.drawText2 = function(text, x, y) {
    xNew = this.convertX(x);
    yNew = this.convertY(y);
    this.drawTextReal(text, xNew, yNew);
};

Grid.prototype.drawTextReal = function(text, realX, realY) {
    this.ctx.fillText(text, realX + 1, realY - 1); // draw text
};

function get(id) {
    return document.getElementById(id);
}
// ============= END OF GRID CLASS ===============