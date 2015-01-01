/**
 * Constructor class Point
 * @param {double} x
 * @param {double} y
 * @param {boolean} isReal True, nilai x dan y merupakan koordinat canvas <br>
 * False, Nilai x dan y merupakan koordinat Grid
 * @param {string} name
 * @param {string} color
 */
function Point(x, y, isReal, name, color) {
    this.x = parseFloat(x);
    this.y = parseFloat(y);
    this.isReal = isReal;
    this.name = (name === undefined) ? '' : name;
    this.color = (color === undefined) ? "#000" : color;
    this.owner = undefined;
}

/**
 * Method untuk menggambar titik
 * @param {Grid} gridObject
 */
Point.prototype.draw = function(gridObject) {
    var ctx = gridObject.ctx;
    ctx.fillStyle = this.color;

    var x = (this.isReal) ? this.x : gridObject.convertX(this.x);
    var y = (this.isReal) ? this.y : gridObject.convertY(this.y);

    ctx.beginPath();
    ctx.arc(x, y, 2, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    x = (this.isReal) ? gridObject.reconvertX(this.x) : this.x;
    y = (this.isReal) ? gridObject.reconvertY(this.y) : this.y;

    var text = gridObject.getCoordinateText(x.toFixed(2), y.toFixed(2));
    gridObject.drawText(this.name + text, this);

    if (!gridObject.isObjectExistInArray(this, gridObject.arrObject) && this.owner === undefined) {
        gridObject.arrObject.push(this);
    }

};

Point.prototype.translate = function(xt, yt, gridObject) {
    var newPoint = new Point(parseFloat(this.x) + parseFloat(xt), parseFloat(this.y) + parseFloat(yt), this.isReal);
    newPoint.draw(gridObject);
};

Point.prototype.rotate = function(xr, yr, rDeg, gridObject) {
    rDeg = gridObject.degToRad(rDeg);

    var xNew = Shape.prototype.rotateX(this.x, this.y, xr, yr, rDeg);
    var yNew = Shape.prototype.rotateY(this.x, this.y, xr, yr, rDeg);
    this.x = xNew;
    this.y = yNew;

    this.draw(gridObject);
};

Point.prototype.isEqual = function(object) {
    if (object instanceof Point) {
        if (object.x.toFixed(2) === this.x.toFixed(2) && object.y.toFixed(2) === this.y.toFixed(2)) {
            return true;
        }
    }
    return false;
};