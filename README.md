# TP2 - Phaser

# Block Dude

## 🕹️ Descrição do Jogo

Block Dude é um jogo 2D de lógica e plataformas desenvolvido com a framework **Phaser 3**.  
O objetivo é resolver puzzles empilhando blocos, ultrapassando obstáculos e alcançando a porta de saída em cada nível.

---

## ▶️ Como Jogar

- **Setas do teclado (`← ↑ ↓ →`)** — movimentar o personagem
- **Barra de espaço (`SPACE`)** — interagir com blocos (pegar/largar)
- **Objetivo:**  
  Chegar à **porta** no final de cada nível, usando blocos para subir ou atravessar obstáculos

---

## 📦 Recursos Utilizados

### 🎨 Gráficos
- Sprites animados do jogador (`Idle`, `Run`, `Jump`)
- Blocos empilháveis (`block.png`)
- Elementos de cenário: chão (`ground_0.png`, `ground_1.png`), fundo (`bg.png`, `menu-bg.png`)
- Ícones e HUD (`help.png`, `door.png`)

### 🔉 Áudio
- Música ambiente (`bgm.mp3`, `bgm.ogg`)
- Efeitos sonoros: abrir porta (`vault_open`), som de sucesso (`cashout`)

### 🧱 Estrutura do Código
- **Phaser 3** (biblioteca incluída em `lib/phaser.min.js`)
- Organização modular:
  - `scene/` — boot, menu e cena de jogo
  - `const/` — constantes do jogo
  - `anims/` — definições de animações

### 🔤 Fontes
- `cartoon.ttf`, `supermercado.woff2`, entre outras fontes para estilo visual personalizado

---

## 📂 Como correr o jogo localmente

1. Abre o ficheiro `index.html` dentro da pasta `code/`
2. De preferência, usa um servidor local (podes usar VS Code com extensão “Live Server” ou um servidor como `http-server` via npm)
3. O jogo carrega diretamente no browser

---

## 👨‍💻 Desenvolvido por

- Mário Ferreira - a31434 - mario.ferreira@ipvc.pt
