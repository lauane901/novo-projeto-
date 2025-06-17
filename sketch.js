let passaro;
let frutas = [];
let nuvens = [];
let pontos = 0;
let vidas = 3;
let tempo = 0;
let gravity = 0.3;
let velocidadePassaro = 4;
let velocidadeNuvens = 2;

function setup() {
  createCanvas(600, 400); // Diminuímos o tamanho da tela para 600x400
  passaro = new Passaro(100, height / 2);
  
  // Inicializa frutas e nuvens
  frutas.push(new Fruta(random(width, width + 200), random(100, height - 100)));
  nuvens.push(new Nuvem(random(width, width + 200), random(50, height - 100)));

  frameRate(60);
}

function draw() {
  background(135, 206, 250); // cor do céu (azul claro)

  // Exibe o pássaro
  passaro.update();
  passaro.display();
  
  // Movimentação das nuvens
  for (let i = nuvens.length - 1; i >= 0; i--) {
    nuvens[i].update();
    nuvens[i].display();

    // Verifica se o pássaro colidiu com uma nuvem
    if (passaro.colideCom(nuvens[i])) {
      vidas--;
      nuvens.splice(i, 1); // Remove a nuvem
    }

    // Remove a nuvem se sair da tela
    if (nuvens[i].x < -50) {
      nuvens.splice(i, 1);
    }
  }
  
  // Movimentação das frutas
  for (let i = frutas.length - 1; i >= 0; i--) {
    frutas[i].update();
    frutas[i].display();

    // Verifica se o pássaro pegou a fruta
    if (passaro.colideCom(frutas[i])) {
      pontos += 10;
      frutas.splice(i, 1); // Remove a fruta
    }

    // Remove a fruta se sair da tela
    if (frutas[i].x < -50) {
      frutas.splice(i, 1);
    }
  }

  // Adiciona mais frutas e nuvens
  if (random(1) < 0.02) {
    frutas.push(new Fruta(random(width, width + 200), random(100, height - 100)));
  }

  if (random(1) < 0.01) {
    nuvens.push(new Nuvem(random(width, width + 200), random(50, height - 100)));
  }

  // Exibe informações de pontuação e vidas
  fill(0);
  textSize(24);
  text("Pontos: " + pontos, 20, 30);
  text("Vidas: " + vidas, 20, 60);

  // Game Over
  if (vidas <= 0) {
    textSize(32);
    text("GAME OVER!", width / 2 - 100, height / 2);
    noLoop(); // Para o jogo
  }
}

// Classe Passaro
class Passaro {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.velocidadeY = 0;
    this.largura = 50;
    this.altura = 50;
  }

  update() {
    this.velocidadeY += gravity;
    this.y += this.velocidadeY;

    // Limita o movimento para não sair da tela
    this.y = constrain(this.y, 0, height - this.altura);
  }

  display() {
    fill(255, 223, 0); // Cor do pássaro (amarelo)
    ellipse(this.x, this.y, this.largura, this.altura);
  }

  colideCom(obj) {
    let d = dist(this.x, this.y, obj.x, obj.y);
    return d < this.largura / 2 + obj.size / 2;
  }

  pular() {
    this.velocidadeY = -velocidadePassaro;
  }
}

// Classe Fruta
class Fruta {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 30;
  }

  update() {
    this.x -= 5; // Velocidade de movimento das frutas
  }

  display() {
    fill(255, 0, 0); // Cor da fruta (vermelho)
    ellipse(this.x, this.y, this.size, this.size);
  }
}

// Classe Nuvem
class Nuvem {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 50;
  }

  update() {
    this.x -= velocidadeNuvens; // Velocidade de movimento das nuvens
  }

  display() {
    fill(255); // Cor da nuvem (branca)
    ellipse(this.x, this.y, this.size * 1.5, this.size);
  }
}

// Controle do personagem
function keyPressed() {
  if (keyCode === UP_ARROW) {
    passaro.pular(); // Pular
  }
}