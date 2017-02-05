var DIRECAO_ESQUERDA = 1;
var DIRECAO_CIMA = 2;
var DIRECAO_DIREITA = 3;
var DIRECAO_BAIXO = 4;

function Panzer (context, teclado, imagem, imgExplosao) {
  this.context = context;
  this.teclado = teclado;
  this.imagem = imagem;
  this.x = 0;
  this.y = 0;
  this.velocidade = 0;
  this.vidasExtras = 3;
  this.acabaramVidas = null;

  this.spritesheet = new Spritesheet(context, imagem, 4, 3);
  this.spritesheet.linha = 1;
  this.spritesheet.intervalo = 3000;
  this.imgExplosao = imgExplosao;

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
  },
  atirar: function () {
    var tiro = new Tiro(this.context, this);
    this.animacao.novoSprite(tiro);
    this.colisor.novoSprite(tiro);
    
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
  retangulosColisao: function () {
    var rets = 
    [ 
      {x: this.x+2, y: this.y+15, largura: 55, altura: 40},
      {x: this.x+55, y: this.y+20, largura: 9, altura: 13}
    ];
    
    var ctx = this.context;    
    for (var i in rets) {
      ctx.save();
      ctx.strokeStyle = 'yellow';
      ctx.strokeRect(rets[i].x, rets[i].y, rets[i].largura, rets[i].altura);
      ctx.restore();
    }  

    return rets;
  },
  colidiuCom: function(outro) {
    if (outro instanceof Inimigo) {
      this.animacao.excluirSprite(this);
      this.animacao.excluirSprite(outro);
      this.colisor.excluirSprite(this);
      this.colisor.excluirSprite(outro);
       
      var exp1 = new Explosao(this.context, this.imgExplosao,
                               this.x, this.y);
      var exp2 = new Explosao(this.context, this.imgExplosao,
                               outro.x, outro.y);
       
      this.animacao.novoSprite(exp1);
      this.animacao.novoSprite(exp2);
       
      var panzer = this;
      exp1.fimDaExplosao = function() {
        panzer.vidasExtras--;
          
        if (panzer.vidasExtras < 1) {
          if (panzer.acabaramVidas) panzer.acabaramVidas();
        }
        else {
          // Recolocar a nave no engine
          panzer.colisor.novoSprite(panzer);
          panzer.animacao.novoSprite(panzer);
          panzer.posicionar();
        }
      }
    }
  },  
  posicionar: function() {
    var canvas = this.context.canvas;
    this.x = 0;
    this.y = 225;
  }
}