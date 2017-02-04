function Painel(context, panzer) {
  this.context = context;
  this.panzer = panzer;
  this.spritesheet = new Spritesheet(context, panzer.imagem, 4, 3);
  this.spritesheet.linha = 3
  this.pontuacao = 0;
}

Painel.prototype = {
  atualizar: function () {
    
  },
  desenhar: function () {
    // Reduz o desenho pela metade
    this.context.scale(0.5, 0.5);
    
    var x = 20;
    var y = 20;
    
    for (var i = 1; i <= this.panzer.vidasExtras; i++) {
      this.spritesheet.desenhar(x, y);
      x += 40;
    }  
    
    this.context.scale(2, 2);
    
    var ctx = this.context;

    ctx.save();
    ctx.fillStyle = 'white';
    ctx.font = '18px sans-serif';
    ctx.fillText(this.pontuacao, 100, 27);
    ctx.restore();
  }
}