function Inimigo (context, imagem) {
  this.context = context;
  this.imagem = imagem;
  this.x = 0;
  this.y = 0;
  this.velocidade = 0;

  this.spritesheet = new Spritesheet(context, imagem, 4, 6);
  this.spritesheet.linha = 1;
  this.spritesheet.coluna = 3;
  this.spritesheet.intervalo = 3000;

}

Inimigo.prototype = {
  atualizar: function () {
    this.x += -this.velocidade * this.animacao.decorrido / 3000;

    //console.log(this.x);
    //console.log(this.context.canvas.width < 0);

    if (this.context.canvas.width < 0) {
      this.animacao.excluirSprite(this);
    }
    
  },
  desenhar: function () {
    // Desenhar imagem estática
    // var ctx = this.context;
    // var img = this.imagem;
    this.spritesheet.desenhar(this.x, this.y);
    this.spritesheet.proximoQuadro();
  }
}