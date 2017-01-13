var SETA_ESQUERDA = 37;
var SETA_CIMA = 38;
var SETA_DIREITA = 39;
var SETA_BAIXO = 40;
var ESPACO = 32;
var ENTER = 13;

function Teclado (elemento) {
  this.elemento = elemento;
  this.pressionadas = [];
  this.disparadas = [];
  this.funcoesDisparo = [];

  var teclado = this;

  elemento.addEventListener('keydown', function (evento) {
    var tecla = evento.keyCode;
    teclado.pressionadas[tecla] = true;
    if (teclado.funcoesDisparo[tecla] && !teclado.disparadas[tecla] ) {
      teclado.disparadas[tecla] = true;
      teclado.funcoesDisparo[tecla] ();
    }
  });

  elemento.addEventListener('keyup', function (evento) {
    var tecla = evento.keyCode;
    teclado.pressionadas[tecla] = false;
    teclado.disparadas[tecla] = false;
  });

}

Teclado.prototype = {
  pressionada: function (tecla) {
    return this.pressionadas[tecla];
  },
  disparou: function (tecla, callback) {
    this.funcoesDisparo[tecla] = callback;
  }
}