/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Shape() {
    
}

Shape.prototype.rotateX = function(x, y, xr, yr, rDeg) {
    x = parseFloat(x);
    y = parseFloat(y);
    xr = parseFloat(xr);
    yr = parseFloat(yr);
    rDeg = parseFloat(rDeg);
    
    var result = xr + ((x - xr) * Math.cos(rDeg).toFixed(2)) - ((y-yr) * Math.sin(rDeg).toFixed(2));
    return result;
};

Shape.prototype.rotateY = function (x, y, xr, yr, rDeg) {
    x = parseFloat(x);
    y = parseFloat(y);
    xr = parseFloat(xr);
    yr = parseFloat(yr);
    rDeg = parseFloat(rDeg);
    
    var result = yr + ((x - xr) * Math.sin(rDeg).toFixed(2)) + ((y-yr) * Math.cos(rDeg).toFixed(2));
    return result;
};