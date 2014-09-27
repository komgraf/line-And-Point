// =========== CLASS Transformasi Extends Grid====================//
function Transformasi() {
}
Transformasi.prototype = new Grid(); //jika ternyata ada yang ambil dari lineDraw tinggal ganti disini new lineDraw()
Transformasi.prototype.constructor = Transformasi;
Transformasi.prototype.newmethodname=function (){
    //kode untuk class transformasi
};

$(function (){
    var transformasi = new Transformasi();
    
    //kode untuk handle listener2 mulai disini
});


