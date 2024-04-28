const canvas = document.getElementById('canvas1') as HTMLCanvasElement | null;
if (canvas) {
  const ctx = canvas.getContext('2d');
  // Canvas Size
  const CANVAS_WIDTH = (canvas.width = 500);
  const CANVAS_HEIGHT = (canvas.height = 500);

  // Player
  const playerImage = new Image();
  playerImage.src = './sprite.png';
  let playerState = 'idle';

  // Select
  const select = document.getElementById('animations');
  if (select) {
    select.addEventListener('change', (e) => {
      let target = e.target as HTMLSelectElement;
      playerState = target.value;
    });
  }

  // Sprite Size
  const spriteWidth = 575;
  const spriteHeight = 523;

  // Frames
  let gameFrame = 0;
  let staggerFrames = 4; // The animation updates every 2 game frames. If the game is running at 60 FPS, the animation will update 30 times per second.

  // Interfaces
  interface Position {
    x: number;
    y: number;
  }
  interface Frames {
    loc: Position[];
  }
  interface AnimationState {
    name: string;
    frames: number;
  }

  const spriteAnimation: { [key: string]: Frames } = {};
  const animationStates: AnimationState[] = [
    {
      name: 'idle',
      frames: 7,
    },
    {
      name: 'jump',
      frames: 7,
    },
    {
      name: 'fall',
      frames: 7,
    },
    {
      name: 'run',
      frames: 7,
    },
    {
      name: 'dizzy',
      frames: 11,
    },
    {
      name: 'sit',
      frames: 5,
    },
    {
      name: 'roll',
      frames: 7,
    },
    {
      name: 'bite',
      frames: 7,
    },
    {
      name: 'ko',
      frames: 12,
    },
    {
      name: 'getHit',
      frames: 4,
    },
  ];
  animationStates.forEach((state, i) => {
    let frames: Frames = {
      loc: [],
    };
    for (let j = 0; j < state.frames; j++) {
      let positionX: number = j * spriteWidth;
      let positionY: number = i * spriteHeight;
      frames.loc.push({ x: positionX, y: positionY });
    }
    spriteAnimation[state.name] = frames;
  });

  function animate() {
    ctx?.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    let position =
      Math.floor(gameFrame / staggerFrames) %
      spriteAnimation[playerState].loc.length;
    let frameX = spriteWidth * position;
    let frameY = spriteAnimation[playerState].loc[position].y;

    ctx?.drawImage(
      playerImage,
      frameX,
      frameY,
      spriteWidth,
      spriteHeight,
      0,
      0,
      spriteWidth - 100,
      spriteHeight - 100,
    );

    if (gameFrame % staggerFrames == 0) {
      if (frameX < 6) frameX++;
      else frameX = 0;
    }

    gameFrame++;
    requestAnimationFrame(animate);
  }
  animate();
} else {
  console.log('Elemento não encontrado');
}
