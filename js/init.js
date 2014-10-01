window.onload = init;
var scale = 25;
var p1, p2, p3, p4, line1, line2, k1, k2, k3, k4, segi4, segi3, lingkaran;

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

//        alert(inputTransYt);

        segi4.translate(inputTransXt, inputTransYt, grid);
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
}

function get(id) {
    return document.getElementById(id);
}