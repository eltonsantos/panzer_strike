function Inimigo (context, imagem, imgExplosao) {
  this.context = context;
  this.imagem = imagem;
  this.x = 0;
  this.y = 0;
  this.velocidade = 0;
  this.imgExplosao = imgExplosao;

  this.spritesheet = new Spritesheet(context, imagem, 4, 6);
  this.spritesheet.linha = 1;
  this.spritesheet.coluna = 3;
  this.spritesheet.intervalo = 3000;

}

Inimigo.prototype = {
  atualizar: function () {
    this.x += -this.velocidade * this.animacao.decorrido / 2000;
    //console.log("this.context.canvas.width "+this.context.canvas.width);
    //console.log("this.x: "+this.x);
    if (this.x <= 0) {
      this.animacao.excluirSprite(this);
      this.colisor.excluirSprite(this);
    }
    
  },
  desenhar: function () {
    // Desenhar imagem estática
    // var ctx = this.context;
    // var img = this.imagem;
    this.spritesheet.desenhar(this.x, this.y);
    this.spritesheet.proximoQuadro();
  },
  retangulosColisao: function() {
    // Estes valores vão sendo ajustados aos poucos
    var rets = 
    [ 
      {x: this.x+8, y: this.y+3, largura: 53, altura: 45},
      {x: this.x+1, y: this.y+10, largura: 9, altura: 15}
    ];
    
    // Desenhando os retângulos para visualização
    // var ctx = this.context;   
    // for (var i in rets) {
    //   ctx.save();
    //   ctx.strokeStyle = 'yellow';
    //   ctx.strokeRect(rets[i].x, rets[i].y, rets[i].largura, rets[i].altura);
    //   ctx.restore();
    // }

    return rets;
  },
  colidiuCom: function(outro) {
    if (outro instanceof Tiro) {
      this.animacao.excluirSprite(this);
      this.colisor.excluirSprite(this);
      this.animacao.excluirSprite(outro);
      this.colisor.excluirSprite(outro);
       
      var explosao = new Explosao(this.context, this.imgExplosao, 
                                   this.x, this.y);
      this.animacao.novoSprite(explosao);
    }
  }
}