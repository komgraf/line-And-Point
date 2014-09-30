/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


window.onload = init;
var scale = 25;
var p1, p2, line1, line2; //input e tlg ditambahi yakk

function init() {
    var canvas = get('myCanvas');
    var grid = new Grid(canvas, scale);
    
    var bt1 = get('buttonTitik1');
    bt1.onclick = function() {
        var inputX = get('inputX1');
        var inputY = get('inputY1');

        var p = new Point(inputX.value, inputY.value, false, "A");
        p.draw(grid);
        p1 = p;
        //arr.push(p);
    };

    //litener untuk menambah titik B
    var bt2 = get('buttonTitik2');
    bt2.onclick = function() {
        var inputX = get('inputX2');
        var inputY = get('inputY2');

        var p = new Point(inputX.value, inputY.value, false, "B");
        p.draw(grid);
        p2 = p;
        //arr.push(p);
    };

    //listener untuk menambah garis
    var b1 = get('buttonGaris');
    b1.onclick = function() {
        if (p1 !== null && p2 !== null) {
            line1 = new Line(p1, p2, false, true);
            line1.draw(grid);
            var label = get('lblPanjang');
            label.innerHTML = "Panjang garis : " + line1.length(grid);
        }
    };

    //listener untuk addition p2+p1
    var b2 = get('buttonAddition');
    b2.onclick = function() {
        if (line1 !== null) {
            grid.lineAddition(line1);
        }
    };

    //listener untuk subtraction p2-p1
    var b3 = get('buttonSubtraction');
    b3.onclick = function() {
        if (line1 !== null) {
            grid.lineSubtraction(line1);
        }
    };

    //listener untuk refleksi garis terhadap sumbu X
    var brXA = get('buttonRefXAxis');
    brXA.onclick = function() {
        if (line1 !== null) {
            grid.reflectionXAxis(line1);
        }
    };

    //listener untuk refleksi garis terhadap sumbu Y
    var brYA = get('buttonRefYAxis');
    brYA.onclick = function() {
        if (line1 !== null) {
            grid.reflectionYAxis(line1);
        }
    };

    //listener untuk refleksi terhadap titik pusat
    var brC = get('buttonRefCenter');
    brC.onclick = function() {
        if (line1 !== null) {
            grid.reflectionCenter(line1);
        }
    };

    //listener untuk refleksi terhadap garis sejajar sumbu Y
    var brX = get('buttonRefX');
    brX.onclick = function() {
        if (line1 !== null) {
            var x = get('inputRefX').value;
            
            var l1 = new Line(new Point(grid.convertX(x), 0, true), 
            new Point(grid.convertX(x), grid.canvas.height, true));
            l1.draw(grid);
            
            grid.reflectionX(line1, get('inputRefX').value);
        }
    };

    //listener untuk refleksi terhadap garis sejajar sumbu X
    var brY = get('buttonRefY');
    brY.onclick = function() {
        if (line1 !== null) {
            var y = get('inputRefY').value;
            
            var l1 = new Line(new Point(0, grid.convertY(y), true), 
            new Point(grid.canvas.width, grid.convertY(y), true));
            l1.draw(grid);
            
            grid.reflectionY(line1, get('inputRefY').value);
        }
    };

    //listener untuk refleksi terhadap titik
    var brXY = get('buttonRefXY');
    brXY.onclick = function() {
        if (line1 !== null) {
            var xy1 = get('inputRefXY1').value;
            var xy2 = get('inputRefXY2').value;
            
            var l1 = new Line(new Point(grid.convertX(xy1), 0, true), 
            new Point(grid.convertX(xy1), grid.canvas.height, true));
            l1.draw(grid);
            
            var l2 = new Line(new Point(0, grid.convertY(xy2), true), 
            new Point(grid.canvas.width, grid.convertY(xy2), true));
            l2.draw(grid);
            
            grid.reflectionXY(line1, xy1, xy2);
        }
    };

    //listener untuk reset
    var br = get('reset');
    br.onclick = function() {
        p1 = null;
        p2 = null;
        line1 = null;
        grid.clear();
     
        var inputgrup = document.getElementById('wrapper');
        var input = inputgrup.getElementsByTagName('input');

        for (var z = 0; z < input.length; z++) {
            input[z].value = "";
        }
    };
}

function get(id) {
    return document.getElementById(id);
}