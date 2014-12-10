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

    for(var i = 0; i<this.arrPoint.length; i++) {
        var pointObject = this.arrPoint[i];
        pointObject.draw(gridObject);
    }

    canvasContext.strokeStyle = this.lineColor;
    canvasContext.beginPath();
    
    for(var i = 0; i<this.arrPoint.length; i++) {
        var pointObject = this.arrPoint[i];
        var x = (pointObject.isReal) ? pointObject.x : gridObject.convertX(pointObject.x);
        var y = (pointObject.isReal) ? pointObject.y : gridObject.convertY(pointObject.y);
        
        if(i === 0) {
            canvasContext.moveTo(x,y);
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
    
    gridObject.arrObject.push(this);
    
};

Polygon.prototype.translate = function(xt, yt, gridObject) {

    var arrPoint = new Array();

    for (var i = this.arrPoint.length - 1; i >= 0; i--) {
        var oldPoint = this.arrPoint[i];
        var p = new Point(oldPoint.x + parseFloat(xt), oldPoint.y + parseFloat(yt), oldPoint.isReal);
        arrPoint.push(p);
    };

    var polygon = new Polygon(arrPoint, this.lineColor, this.fillColor);

    polygon.draw(gridObject);
};

Polygon.prototype.convertToGridScale = function(gridObject) {
    for(var i = 0; i<this.arrPoint.length; i++) {
        var pointObject = this.arrPoint[i];
        if(pointObject.isReal == true) {
            pointObject.x = gridObject.reconvertX(pointObject.x);
            pointObject.y = gridObject.reconvertY(pointObject.y);
            pointObject.isReal = false;
        }
        this.arrPoint[i] = pointObject;
    }
};

