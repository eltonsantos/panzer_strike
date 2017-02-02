var DIRECAO_ESQUERDA = 1;
var DIRECAO_CIMA = 2;
var DIRECAO_DIREITA = 3;
var DIRECAO_BAIXO = 4;

function Panzer (context, teclado, imagem) {
  this.context = context;
  this.teclado = teclado;
  this.imagem = imagem;
  this.x = 0;
  this.y = 0;
  this.velocidade = 0;

  this.spritesheet = new Spritesheet(context, imagem, 4, 3);
  this.spritesheet.linha = 1;
  this.spritesheet.intervalo = 3000;

  this.andando = false;
  this.direcao = DIRECAO_DIREITA;
}

Panzer.prototype = {
  atualizar: function () {
    //var incremento = this.velocidade * this.animacao.decorrido / 1000;
    if (this.teclado.pressionada(SETA_ESQUERDA) && this.x > 0) {
      this.direcao = DIRECAO_ESQUERDA;
      this.x -= 3;
      this.spritesheet.linha = 2;
      this.spritesheet.coluna = 0;

    }
    else if (this.teclado.pressionada(SETA_CIMA) && this.y > 0) {
      this.direcao = DIRECAO_CIMA;
      this.y -= 3;
      this.spritesheet.linha = 3;
      this.spritesheet.coluna = 0;
    }
    else if (this.teclado.pressionada(SETA_DIREITA) && this.x < this.context.canvas.width - 60) {
      this.direcao = DIRECAO_DIREITA;
      this.x += 3;
      this.spritesheet.linha = 1;
      this.spritesheet.coluna = 0;
    }
    else if (this.teclado.pressionada(SETA_BAIXO) && this.y < this.context.canvas.height - 60) {
      this.direcao = DIRECAO_BAIXO;
      this.y += 3;
      this.spritesheet.linha = 0;
      this.spritesheet.coluna = 1;
    }
  },
  desenhar: function () {
    this.spritesheet.desenhar(this.x, this.y);
    this.spritesheet.proximoQuadro();
    // this.context.fillRect(this.x, this.y, 60, 30);
    // this.context.fillStyle = 'black';
  },
  atirar: function () {
    var tiro = new Tiro(this.context, this);
    this.animacao.novoSprite(tiro);
    tiro.x = this.x + 30;
    tiro.y = this.y + 30;
    tiro.raio = 5;
    tiro.cor = 'yellow';

    if (this.direcao == DIRECAO_ESQUERDA) {
      tiro.velocidadeX = -20;
    }
    else if (this.direcao == DIRECAO_CIMA) {
      tiro.velocidadeY = -20;
    }
    else if (this.direcao == DIRECAO_DIREITA) {
      tiro.velocidadeX = 20;
    }
    else if (this.direcao == DIRECAO_BAIXO) {
      tiro.velocidadeY = 20;
    }
  },
  posicionar: function () {
    var canvas = this.context.canvas;
    this.x = 0;
    this.y = 225;
  }
}