/**
 * Constructor class Grid
 * @param {Object} canvasObject
 * @param {Integer} scale
 */
function Grid(canvasObject, scale) {
    this.canvas = canvasObject;
    this.ctx = this.canvas.getContext("2d");
    this.scale = scale;
    this.init();
}

Grid.prototype.init = function() {
    this.x0 = this.canvas.height / 2;
    this.y0 = this.canvas.width / 2;
    this.ctx.font = "13px Georgia";
    this.drawGrid();
    this.drawXY();
};

/**
 * Method untuk menghapus semua isi Grid
 */
Grid.prototype.clear = function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.init();
};

/**
 * Method untuk menggambar Grid ke canvas
 */
Grid.prototype.drawGrid = function() {
    var nilai = (this.canvas.width / this.scale) / 2;

    for (var i = 0; i <= this.canvas.width; i++) {
        if (i % this.scale === 0) {
            var lineX = new Line(new Point(i, 0, true), new Point(i, this.canvas.height, true), false, false);
            lineX.color = "#AAA";
            lineX.draw(this);
            this.drawTextReal((-1) * nilai, i + 2, this.canvas.width / 2 - 3);

            var lineY = new Line(new Point(0, i, true), new Point(this.canvas.width, i, true), false, false);
            lineY.color = "#AAA";
            lineY.draw(this);
            this.drawTextReal(nilai--, this.canvas.height / 2 + 3, i - 3);

        }
    }
};

/**
 * Method untuk menggambar sumbu X dan sumbu Y pada Canvas
 */
Grid.prototype.drawXY = function() {
    var pointA = new Point(0, this.canvas.height / 2, true);
    var pointB = new Point(this.canvas.width, this.canvas.height / 2, true);

    var lineX = new Line(pointA, pointB, false, false, "#000");
    lineX.draw(this);
    lineX.draw(this);

    pointA = new Point(this.canvas.width / 2, 0, true);
    pointB = new Point(this.canvas.width / 2, this.canvas.height, true);

    var lineY = new Line(pointA, pointB, false, false, "#000");
    lineY.draw(this);
    lineY.draw(this);

};

/**
 * Method untuk mengkonversi dari skala Grid ke skala Canvas
 * @param {double} value Nilai yang ingin dikonversi
 * @returns {Integer} Nilai hasil konversi
 */
Grid.prototype.convert = function(value) {
    return (value * this.scale);
};

/**
 * Method untuk mengkonversi dari skala Canvas ke skala Grid
 * @param {double} value Nilai yang ingin dikonversi
 * @returns {Integer} Nilai hasil konversi
 */
Grid.prototype.reconvert = function(value) {
    return (value / this.scale);
};

/**
 * Method untuk mengkonversi nilai skala koordinat X Grid menjadi
 * nilai koordinat X asli Object Canvas
 * @param {double} value Nilai yang ingin dikonversi
 * @returns {double} Nilai hasil konversi
 */
Grid.prototype.convertX = function(value) {
    value *= this.scale;

    return (this.x0 + value);
};

/**
 * Method untuk mengkonversi nilai skala koordinat Y Grid menjadi
 * nilai koordinat Y asli Object Canvas
 * @param {double} value Nilai yang ingin dikonversi
 * @returns {double} Nilai hasil konversi
 */
Grid.prototype.convertY = function(value) {
    value *= this.scale;

    return (this.y0 - value);
};

/**
 * Method untuk mengkonversi dari koordinat X Object Canvas
 * menjadi koordinat X Grid
 * @param {double} value Nilai yang ingin dikonversi
 * @returns {double} Nilai hasil konversi
 */
Grid.prototype.reconvertX = function(value) {
    value -= this.x0;
    return (-1) * (value / this.scale);
};

/**
 * Method untuk mengkonversi dari koordinat Y Object Canvas
 * menjadi koordinat Y Grid
 * @param {double} value Nilai yang ingin dikonversi
 * @returns {double} Nilai hasil konversi
 */
Grid.prototype.reconvertY = function(value) {
    value -= this.y0;
    return (-1) * (value / this.scale);
};

Grid.prototype.degToRad = function(value) {
    var result = parseFloat(value) / 180;
    return result * Math.PI;
};

Grid.prototype.getCoordinateText = function(x, y) {
    return "(" + x + ", " + y + ")";
};

Grid.prototype.getCoordinateTextFromReal = function(realX, realY) {
    var xNew = this.convertX(realX);
    var yNew = this.convertY(realY);
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
    var xNew = this.convertX(x);
    var yNew = this.convertY(y);
    this.drawTextReal(text, xNew, yNew);
};

Grid.prototype.drawTextReal = function(text, realX, realY) {
    this.ctx.fillText(text, realX + 1, realY - 1); // draw text
};

Grid.prototype.lineAddition = function(line) {
    this.lineAddition2(line.pointA, line.pointB);
};

Grid.prototype.lineAddition2 = function(pointA, pointB) {
    this.lineAddition3(pointA.x, pointA.y, pointB.x, pointB.y);
};

//addition. membuat koordinat baru sebagai hasil jumlah 2 koordinat
Grid.prototype.lineAddition3 = function(x1, y1, x2, y2) {
    var ax = parseFloat(x2) + parseFloat(x1);
    var ay = parseFloat(y2) + parseFloat(y1);

    var p = new Point(ax, ay, false, "C");
    p.draw(this);

    var line1 = new Line(new Point(x1, y1, false), p, false, false, "red");
    line1.draw(this);
    var line2 = new Line(new Point(x2, y2, false), p, false, false, "red");
    line2.draw(this);

};

Grid.prototype.lineSubtraction = function(line) {
    this.lineSubtraction2(line.pointA, line.pointB);
};

Grid.prototype.lineSubtraction2 = function(pointA, pointB) {
    this.lineSubtraction3(pointA.x, pointA.y, pointB.x, pointB.y);
};

//subtraction. membuat koordinat baru sebagai hasil kurang 2 koordinat
Grid.prototype.lineSubtraction3 = function(x1, y1, x2, y2) {
    var sx = parseFloat(x2) - parseFloat(x1);
    var sy = parseFloat(y2) - parseFloat(y1);
    var p = new Point(sx, sy, false, "D");
    p.draw(this);

    var l1 = new Line(new Point(x1, y1, false), p, false, false, "red");
    l1.draw(this);
    var l2 = new Line(new Point(x2, y2, false), p, false, false, "red");
    l2.draw(this);
};

Grid.prototype.reflectionXAxis = function(line) {
    this.reflectionY(line, 0);
};

Grid.prototype.reflectionYAxis = function(line) {
    this.reflectionX(line, 0);
};

Grid.prototype.reflectionCenter = function(line) {
    this.reflectionXY(line, 0, 0);
};

//refleksi terhadap garis sejajar sumbu Y. mencari X baru
Grid.prototype.reflectionX = function(line, n) {
    var x1 = 2 * n - parseFloat(line.pointA.x);
    var x2 = 2 * n - parseFloat(line.pointB.x);

    var p1 = new Point(x1, line.pointA.y, false, "A'");
    p1.draw(this);
    var p2 = new Point(x2, line.pointB.y, false, "B'");
    p2.draw(this);
    var l1 = new Line(p1, p2, line.startArrow, line.endArrow, "blue");
    l1.draw(this);
};

//refleksi terhadap garis sejajar sumbu X. mencari Y baru
Grid.prototype.reflectionY = function(line, n) {
    var y1 = 2 * n - parseFloat(line.pointA.y);
    var y2 = 2 * n - parseFloat(line.pointB.y);

    var p1 = new Point(line.pointA.x, y1, false, "A'");
    p1.draw(this);
    var p2 = new Point(line.pointB.x, y2, false, "B'");
    p2.draw(this);
    var l1 = new Line(p1, p2, line.startArrow, line.endArrow, "blue");
    l1.draw(this);

};

//refleksi terhadap titik. mencari X dan Y baru
Grid.prototype.reflectionXY = function(line, x, y) {
    var x1 = 2 * x - parseFloat(line.pointA.x);
    var y1 = 2 * y - parseFloat(line.pointA.y);
    var x2 = 2 * x - parseFloat(line.pointB.x);
    var y2 = 2 * y - parseFloat(line.pointB.y);

    var p1 = new Point(x1, y1, false, "A'");
    p1.draw(this);
    var p2 = new Point(x2, y2, false, "B'");
    p2.draw(this);
    var l1 = new Line(p1, p2, line.startArrow, line.endArrow, "blue");
    l1.draw(this);
};

//mencari nilai x dan y masing-masing garis
Grid.prototype.dotProduct = function(lineA, lineB) {
    var ax = lineA.pointB.x > lineA.pointA.x ? Math.abs(lineA.pointB.x - lineA.pointA.x) : Math.abs(lineA.pointB.x - lineA.pointA.x) * -1;
    var ay = lineA.pointB.y > lineA.pointA.y ? Math.abs(lineA.pointB.y - lineA.pointA.y) : Math.abs(lineA.pointB.y - lineA.pointA.y) * -1;
    var bx = lineB.pointB.x > lineB.pointA.x ? Math.abs(lineB.pointB.x - lineB.pointA.x) : Math.abs(lineB.pointB.x - lineB.pointA.x) * -1;
    var by = lineB.pointB.y > lineB.pointA.y ? Math.abs(lineB.pointB.y - lineB.pointA.y) : Math.abs(lineB.pointB.y - lineB.pointA.y) * -1;
    return this.dotProduct2(ax, ay, bx, by);
};

//menghitung dot product
Grid.prototype.dotProduct2 = function(ax, ay, bx, by) {
    return ax * bx + ay * by;
};

//mencari nilai x dan y masing-masing garis
Grid.prototype.crossProduct = function(lineA, lineB) {
    var ax = lineA.pointB.x > lineA.pointA.x ? Math.abs(lineA.pointB.x - lineA.pointA.x) : Math.abs(lineA.pointB.x - lineA.pointA.x) * -1;
    var ay = lineA.pointB.y > lineA.pointA.y ? Math.abs(lineA.pointB.y - lineA.pointA.y) : Math.abs(lineA.pointB.y - lineA.pointA.y) * -1;
    var bx = lineB.pointB.x > lineB.pointA.x ? Math.abs(lineB.pointB.x - lineB.pointA.x) : Math.abs(lineB.pointB.x - lineB.pointA.x) * -1;
    var by = lineB.pointB.y > lineB.pointA.y ? Math.abs(lineB.pointB.y - lineB.pointA.y) : Math.abs(lineB.pointB.y - lineB.pointA.y) * -1;
    return this.crossProduct2(ax, ay, bx, by);
};

//menghitung cross product
Grid.prototype.crossProduct2 = function(ax, ay, bx, by) {
    return ax * by - ay * bx;
};

Grid.prototype.randomColor = function() {
    var warna = new Array("red", "green", "blue", "yellow", "#8A4B08", "#FA5858", "#00FFFF");
    return warna[Math.floor((Math.random() * warna.length))];
};


