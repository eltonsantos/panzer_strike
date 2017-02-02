function Inimigo (context, imagem) {
  this.context = context;
  this.imagem = imagem;
  this.x = 0;
  this.y = 0;
  this.velocidade = 0; 
}

Inimigo.prototype = {
  atualizar: function () {
    this.y = this.y + this.velocidade * this.animacao.decorrido / 1000;
    //this.y += this.velocidade;
    if (this.y > this.context.canvas.height) {
      this.animacao.excluirSprite(this);
    }
    
  },
  desenhar: function () {
    var ctx = this.context;
    var img = this.imagem;
    //ctx.drawImage(img, (canvas.width)-10, this.y, img.width, img.height);
    // drawImage(imagem, x, y, largura, altura): desenha a imagem inteira, na posição e tamanho especificados;
    // drawImage(imagem, xOrigem, yOrigem, larguraOrigem, alturaOrigem, xDestino, yDestino, larguraDestino, alturaDestino): desenha parte da imagem
    ctx.drawImage(img, this.x, this.y, img.width, img.height);
  }
}