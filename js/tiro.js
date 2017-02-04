var SOM_TIRO = new Audio();
SOM_TIRO.src = "snd/tiro-panzer.wav";
SOM_TIRO.volume = 0.5;
SOM_TIRO.load();

function Tiro (context, panzer) {
  this.context = context;
  this.panzer = panzer;

  this.velocidadeX = 0;
  this.velocidadeY = 0;
  this.largura = 3;
  this.altura = 10;
  this.cor = 'red'
  this.raio = 20;
  SOM_TIRO.currentTime = 0.0;
  SOM_TIRO.play();
}

Tiro.prototype = {
  atualizar: function () {
    this.x += this.velocidadeX;
    this.y += this.velocidadeY;
    // console.log('this.x: '+this.x);
    // console.log('this.y: '+this.y);
    // console.log('this.altura: '+this.altura);
    // console.log('this.largura: '+this.largura);
    // console.log('this.context.canvas.width: '+this.context.canvas.width);
    // console.log('this.context.canvas.height: '+this.context.canvas.height);

    if (this.y < this.altura || this.y > this.context.canvas.height || this.x < this.largura || this.x > this.context.canvas.width) {
      console.log('passa por aqui');
      this.animacao.excluirSprite(this);
      this.colisor.excluirSprite(this);
    }

  },
  desenhar: function () {
    var ctx = this.context;
    ctx.save();
    ctx.fillStyle = this.cor;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.raio, 0, 2*Math.PI, false);
    ctx.fill();
    ctx.restore();
  },
  retangulosColisao: function() {
    return [ {x: this.x, y: this.y, largura: this.largura, altura: this.altura} ];
  },
  colidiuCom: function(outro) {
   
  }
}