window.onload = init;
var scale = 25;
var p1, p2, p3, p4, line1, line2, segi4, segi3, lingkaran;

function init() {
    var canvas = get('myCanvas');
    var grid = new Grid(canvas, scale);
    
//    Mouse listener canvas
//    canvas.addEventListener("mousedown", function(event) {
//        var rect = event.target.getBoundingClientRect();
//        var x = (event.clientX-rect.left)/(rect.right-rect.left)*event.target.width;
//        var y = (event.clientY-rect.top)/(rect.bottom-rect.top)*event.target.height;
////        alert('x = ' + x + "\ny = " + y);
//        var po = new Point(x, y, true);
//        po.draw(grid);
//    }, false);
    
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
    var bt12 = get('buttonTitik12');
    bt12.onclick = function() {
        var inputX = get('input2X1');
        var inputY = get('input2Y1');

        var p = new Point(inputX.value, inputY.value, false, "C");
        p.draw(grid);
        p3 = p;
        //arr.push(p);
    };

    //litener untuk menambah titik B
    var bt22 = get('buttonTitik22');
    bt22.onclick = function() {
        var inputX = get('input2X2');
        var inputY = get('input2Y2');

        var p = new Point(inputX.value, inputY.value, false, "D");
        p.draw(grid);
        p4 = p;
        //arr.push(p);
    };

    //listener untuk menambah garis
    var bG2 = get('buttonGaris2');
    bG2.onclick = function() {
        if (p3 !== null && p4 !== null) {
            line2 = new Line(p3, p4, false, true);
            line2.draw(grid);
            var label = get('lblPanjang');
            label.innerHTML = "Panjang garis : " + line2.length(grid);
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
                    new Point(grid.convertX(x), grid.canvas.height, true), false, false, "blue");
            l1.draw(grid);

            grid.reflectionX(line1, x);
        }
    };

    //listener untuk refleksi terhadap garis sejajar sumbu X
    var brY = get('buttonRefY');
    brY.onclick = function() {
        if (line1 !== null) {
            var y = get('inputRefY').value;

            var l1 = new Line(new Point(0, grid.convertY(y), true),
                    new Point(grid.canvas.width, grid.convertY(y), true), false, false, "blue");
            l1.draw(grid);

            grid.reflectionY(line1, y);
        }
    };

    //listener untuk refleksi terhadap titik
    var brXY = get('buttonRefXY');
    brXY.onclick = function() {
        if (line1 !== null) {
            var xy1 = get('inputRefXY1').value;
            var xy2 = get('inputRefXY2').value;

            var l1 = new Line(new Point(grid.convertX(xy1), 0, true),
                    new Point(grid.convertX(xy1), grid.canvas.height, true), false, false, "blue");
            l1.draw(grid);

            var l2 = new Line(new Point(0, grid.convertY(xy2), true),
                    new Point(grid.canvas.width, grid.convertY(xy2), true), false, false, "blue");
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
        segi4 = null;
        segi3 = null;
        lingkaran = null;
        grid.clear();

        var inputgrup = document.getElementById('wrapper');
        var input = inputgrup.getElementsByTagName('input');

        for (var z = 0; z < input.length; z++) {
            input[z].value = "";
        }
    };

    //listener untuk melakukan dotproduct
    var dot = get('buttonDotProduct');
    dot.onclick = function() {
        var nilaiDot = grid.dotProduct(line1, line2);
        var label = get('hasilDotProduct');
        label.value = "Hasil Dot : " + nilaiDot;
    };

    //listener untuk melakukan crossproduct
    var cross = get('buttonCrossProduct');
    cross.onclick = function() {
        var nilaiCross = grid.crossProduct(line1, line2);
        var label = get('hasilCrossProduct');
        label.value = "Hasil Cross : " + nilaiCross;
    };

    //listener untuk membuat segi Empat
    var kotak = get('buttonkotak');
    kotak.onclick = function() {
        var inputKotakX1 = get('inputKotakX1').value;
        var inputKotakX2 = get('inputKotakX2').value;
        var inputKotakX3 = get('inputKotakX3').value;
        var inputKotakX4 = get('inputKotakX4').value;
        var inputKotakY1 = get('inputKotakY1').value;
        var inputKotakY2 = get('inputKotakY2').value;
        var inputKotakY3 = get('inputKotakY3').value;
        var inputKotakY4 = get('inputKotakY4').value;

        var pointA = new Point(inputKotakX1, inputKotakY1, false, "A");
        var pointB = new Point(inputKotakX2, inputKotakY2, false, "B");
        var pointC = new Point(inputKotakX3, inputKotakY3, false, "C");
        var pointD = new Point(inputKotakX4, inputKotakY4, false, "D");

        var segiEmpat = new Square(pointA, pointB, pointC, pointD, undefined, undefined);
        segiEmpat.draw(grid);
        segi4 = segiEmpat;
    };

    //listener untuk translasi kotak
    var transKotak = get('buttontranslasikotak');
    transKotak.onclick = function() {
        var inputTransXt = get('inputTranslasiXt').value;
        var inputTransYt = get('inputTranslasiYt').value;

        segi4.translate(inputTransXt, inputTransYt, grid);
    };

    //listener untuk scale kotak (direfensial)
    var scaleKotak = get('buttonScalekotak');
    scaleKotak.onclick = function() {
        var inputScaleXt = get('inputScaleXt').value;
        var inputScaleYt = get('inputScaleYt').value;

        segi4.scale(inputScaleXt, inputScaleYt, grid);
    };
    
    //listener untuk scale kotak (uniform)
    var scaleKotakU = get('buttonScalekotakU');
    scaleKotakU.onclick = function() {
        var inputScaleT = get('inputScaleT').value;
        
        segi4.scaleUniform(inputScaleT, grid);
    };

    //listener untuk shear kotak
    var shearXKotak = get('buttonShearXkotak');
    shearXKotak.onclick = function() {
        var inputShearX1 = get('inputShearX1').value;
        var inputShearYRef = get('inputShearYRef').value;

        segi4.shearX(inputShearX1, inputShearYRef, grid);
    };
    var shearYKotak = get('buttonShearYkotak');
    shearYKotak.onclick = function() {
        var inputShearY1 = get('inputShearY1').value;
        var inputShearXRef = get('inputShearXRef').value;

        segi4.shearY(inputShearY1, inputShearXRef, grid);
    };

    var segitiga = get('buttonsegitiga');
    segitiga.onclick = function() {
        var inputSegitigaX1 = get('inputSegitigaX1').value;
        var inputSegitigaX2 = get('inputSegitigaX2').value;
        var inputSegitigaX3 = get('inputSegitigaX3').value;
        var inputSegitigaY1 = get('inputSegitigaY1').value;
        var inputSegitigaY2 = get('inputSegitigaY2').value;
        var inputSegitigaY3 = get('inputSegitigaY3').value;

        var pointA = new Point(inputSegitigaX1, inputSegitigaY1, false, "A");
        var pointB = new Point(inputSegitigaX2, inputSegitigaY2, false, "B");
        var pointC = new Point(inputSegitigaX3, inputSegitigaY3, false, "C");

        var segiTiga = new Triangle(pointA, pointB, pointC, undefined, undefined);
        segiTiga.draw(grid);
        segi3 = segiTiga;
    };

    //listener untuk translasi segitiga
    var transSegitiga = get('buttontranslasiSegitiga');
    transSegitiga.onclick = function() {
        var inputTransXt = get('inputTranslasiSegitigaXt').value;
        var inputTransYt = get('inputTranslasiSegitigaYt').value;

        segi3.translate(inputTransXt, inputTransYt, grid);
    };

    //listener untuk scale segitiga (diferensial)
    var scaleSegitiga = get('buttonscaleSegitiga');
    scaleSegitiga.onclick = function() {
        var inputScaleXt = get('inputScaleSegitigaXt').value;
        var inputScaleYt = get('inputScaleSegitigaYt').value;

        segi3.scale(inputScaleXt, inputScaleYt, grid);
    };
    
     //listener untuk scale segitiga (uniform)
    var scaleSegitigaU = get('buttonScaleSegitigaU');
    scaleSegitigaU.onclick = function () {
        var inputScaleT = get('inputScaleSegitigaT').value;
        
        segi3.scaleUniform(inputScaleT, grid);
    };

    //listener untuk shear segitiga
    var shearXSegitiga = get('buttonShearXSegitiga');
    shearXSegitiga.onclick = function() {
        var inputShearX1 = get('inputShearSegitigaX1').value;
        var inputShearYRef = get('inputShearYRefSegitiga').value;

        segi3.shearX(inputShearX1, inputShearYRef, grid);
    };
    var shearYSegitiga = get('buttonShearYSegitiga');
    shearYSegitiga.onclick = function() {
        var inputShearY1 = get('inputShearSegitigaY1').value;
        var inputShearXRef = get('inputShearXRefSegitiga').value;

        segi3.shearY(inputShearY1, inputShearXRef, grid);
    };

    var lingkaranButton = get('buttonlingkaran');
    lingkaranButton.onclick = function() {
        var inputlingkaranX1 = get('inputlingkaranX1').value;
        var inputlingkaranY1 = get('inputlingkaranY1').value;
        var inputlingkaranradius = get('inputlingkaranradius').value;

        var shape = new Circle(inputlingkaranX1, inputlingkaranY1, inputlingkaranradius, 0, 360, false);
        shape.draw(grid);
        lingkaran = shape;
    };
    
    //listener untuk refleksi persegi terhadap sumbu X
    var brXASquare = get('buttonRefXAxisSquare');
    brXASquare.onclick = function() {
        if (segi4 !== null) {
            segi4.reflectionXAxis(grid);
        }
    };

    //listener untuk refleksi persegi terhadap sumbu Y
    var brYASquare = get('buttonRefYAxisSquare');
    brYASquare.onclick = function() {
        if (segi4 !== null) {
            segi4.reflectionYAxis(grid);
        }
    };

    //listener untuk refleksi persegi terhadap titik pusat
    var brCSquare = get('buttonRefCenterSquare');
    brCSquare.onclick = function() {
        if (segi4 !== null) {
            segi4.reflectionCenter(grid);
        }
    };

    //listener untuk refleksi persegi terhadap garis sejajar sumbu Y
    var brXSquare = get('buttonRefXSquare');
    brXSquare.onclick = function() {
        if (segi4 !== null) {
            var x = get('inputRefXSquare').value;

            var l1 = new Line(new Point(grid.convertX(x), 0, true),
                    new Point(grid.convertX(x), grid.canvas.height, true), false, false, "blue");
            l1.draw(grid);

            segi4.reflectionX(x, grid);
        }
    };

    //listener untuk refleksi persegi terhadap garis sejajar sumbu X
    var brYSquare = get('buttonRefYSquare');
    brYSquare.onclick = function() {
        if (segi4 !== null) {
            var y = get('inputRefYSquare').value;

            var l1 = new Line(new Point(0, grid.convertY(y), true),
                    new Point(grid.canvas.width, grid.convertY(y), true), false, false, "blue");
            l1.draw(grid);

            segi4.reflectionY(y, grid);
        }
    };

    //listener untuk refleksi persegi terhadap titik
    var brXYSquare = get('buttonRefXYSquare');
    brXYSquare.onclick = function() {
        if (segi4 !== null) {
            var xy1 = get('inputRefXY1Square').value;
            var xy2 = get('inputRefXY2Square').value;

            var l1 = new Line(new Point(grid.convertX(xy1), 0, true),
                    new Point(grid.convertX(xy1), grid.canvas.height, true), false, false, "blue");
            l1.draw(grid);

            var l2 = new Line(new Point(0, grid.convertY(xy2), true),
                    new Point(grid.canvas.width, grid.convertY(xy2), true), false, false, "blue");
            l2.draw(grid);

            segi4.reflectionXY(xy1, xy2, grid);
        }
    };
    
    //listener untuk refleksi segitiga terhadap sumbu X
    var brXATriangle = get('buttonRefXAxisTriangle');
    brXATriangle.onclick = function() {
        if (segi3 !== null) {
            segi3.reflectionXAxis(grid);
        }
    };

    //listener untuk refleksi segitiga terhadap sumbu Y
    var brYATriangle = get('buttonRefYAxisTriangle');
    brYATriangle.onclick = function() {
        if (segi3 !== null) {
            segi3.reflectionYAxis(grid);
        }
    };

    //listener untuk refleksi segitiga terhadap titik pusat
    var brCTriangle = get('buttonRefCenterTriangle');
    brCTriangle.onclick = function() {
        if (segi3 !== null) {
            segi3.reflectionCenter(grid);
        }
    };

    //listener untuk refleksi segitiga terhadap garis sejajar sumbu Y
    var brXTriangle = get('buttonRefXTriangle');
    brXTriangle.onclick = function() {
        if (segi3 !== null) {
            var x = get('inputRefXTriangle').value;

            var l1 = new Line(new Point(grid.convertX(x), 0, true),
                    new Point(grid.convertX(x), grid.canvas.height, true), false, false, "blue");
            l1.draw(grid);

            segi3.reflectionX(x, grid);
        }
    };

    //listener untuk refleksi segitiga terhadap garis sejajar sumbu X
    var brYTriangle = get('buttonRefYTriangle');
    brYTriangle.onclick = function() {
        if (segi3 !== null) {
            var y = get('inputRefYTriangle').value;

            var l1 = new Line(new Point(0, grid.convertY(y), true),
                    new Point(grid.canvas.width, grid.convertY(y), true), false, false, "blue");
            l1.draw(grid);

            segi3.reflectionY(y, grid);
        }
    };

    //listener untuk refleksi segitiga terhadap titik
    var brXYTriangle = get('buttonRefXYTriangle');
    brXYTriangle.onclick = function() {
        if (segi3 !== null) {
            var xy1 = get('inputRefXY1Triangle').value;
            var xy2 = get('inputRefXY2Triangle').value;

            var l1 = new Line(new Point(grid.convertX(xy1), 0, true),
                    new Point(grid.convertX(xy1), grid.canvas.height, true), false, false, "blue");
            l1.draw(grid);

            var l2 = new Line(new Point(0, grid.convertY(xy2), true),
                    new Point(grid.canvas.width, grid.convertY(xy2), true), false, false, "blue");
            l2.draw(grid);

            segi3.reflectionXY(xy1, xy2, grid);
        }
    };
    
    var rotateTriangle = get('buttonRotateTriangle');
    rotateTriangle.onclick = function() {
        if(segi3 !== null) {
            var xr = get('inputRotateTriangleXr').value;
            var yr = get('inputRotateTriangleYr').value;
            var deg = get('inputRotateTriangleDeg').value;
            
            var pR = new Point(xr, yr, false, 'p', 'red');
            pR.draw(grid);
            
            segi3.rotate(xr, yr, deg, grid);
        }
    };
    
    var rotateSquare = get('buttonRotateSquare');
    rotateSquare.onclick = function() {
        if(segi4 !== null) {
            var xr = get('inputRotateSquareXr').value;
            var yr = get('inputRotateSquareYr').value;
            var deg = get('inputRotateSquareDeg').value;
            
            var pR = new Point(xr, yr, false, 'p', 'red');
            pR.draw(grid);
            
            segi4.rotate(xr, yr, deg, grid);
        }
    };
    
}

function get(id) {
    return document.getElementById(id);
}