import React, { useEffect, useRef } from 'react';
import kaplay from 'kaplay';
import disclaimer from '../scenes/disclaimer';
import game from '../scenes/game';
import gameover from '../scenes/gameover';
import mainMenu from '../scenes/mainmenu';

const MainPage = () => {
  const soundRef = useRef(null); // Ref to store the sound instance

  useEffect(() => {
    const k = kaplay({
      width: 1920,
      height: 1080,
      letterbox: true,
      background: [0, 0, 0],
      global: false,
      buttons: {
        jump: {
          keyboard: ['space'],
          mouse: 'left',
        },
      },
      touchToMouse: true,
      debug: false,
    });

    // Load all assets
    Promise.all([
      k.loadFont('mania', 'fonts/mania.ttf'), // Explicitly load the font
      k.loadSound('city', 'sounds/city.mp3'),
      k.loadSprite('chemical-bg', 'graphics/chemical-bg.png'),
      k.loadSprite('platforms', 'graphics/platforms.png'),
      k.loadSprite('mathhew', 'graphics/mathhew.png', {
        sliceX: 8,
        sliceY: 2,
        anims: {
          run: { from: 0, to: 7, loop: true, speed: 30 },
          jump: { from: 8, to: 15, loop: true, speed: 100 },
        },
      }),
      k.loadSprite('ring', 'graphics/ring.png', {
        sliceX: 16,
        sliceY: 1,
        anims: {
          spin: { from: 0, to: 15, loop: true, speed: 30 },
        },
      }),
      k.loadSprite('motobug', 'graphics/motobug.png', {
        sliceX: 5,
        sliceY: 1,
        anims: {
          run: { from: 0, to: 4, loop: true, speed: 8 },
        },
      }),
      k.loadSound('destroy', 'sounds/Destroy.wav'),
      k.loadSound('hurt', 'sounds/Hurt.wav'),
      k.loadSound('hyper-ring', 'sounds/HyperRing.wav'),
      k.loadSound('jump', 'sounds/Jump.wav'),
      k.loadSound('ring', 'sounds/Ring.wav'),
    ]).then(() => {
      console.log('All assets loaded successfully');

      // Play the city background music and store the sound instance
      soundRef.current = k.play('city', { volume: 0.2, loop: true });

      // Add scenes and start the game
      k.scene('disclaimer', () => disclaimer(k));
      k.scene('main-menu', () => mainMenu(k));
      k.scene('game', () => game(k));
      k.scene('gameover', (citySfx) => gameover(k, citySfx));

      k.go('disclaimer');
    }).catch((err) => {
      console.error('Failed to load assets:', err);
    });

    return () => {
      if (k) {
        // Stop the city background music
        if (soundRef.current) {
          soundRef.current.stop();
        }

        k.quit(); // Destroy the Kaplay instance

        // Remove the canvas element from the DOM
        const canvas = document.querySelector('canvas');
        if (canvas) {
          canvas.remove();
        }
      }
    };
  }, []);

  return (
    <div>
      <h1>Math Game</h1>
      <div id="game"></div>
    </div>
  );
};

export default MainPage;