import React, { useEffect } from 'react';
import kaplay from 'kaplay';
import disclaimer from '../scenes/disclaimer';
import game from '../scenes/game';
import gameover from '../scenes/gameover';
import mainMenu from '../scenes/mainmenu';
import { useLocation } from 'react-router-dom';

const MainPage = () => {
  const location = useLocation();

  useEffect(() => {
    // Force a page reload when navigating back to the MainPage
    if (location.pathname === '/') {
      window.location.reload();
    }
  }, [location.pathname]); // This effect runs when the location changes (user navigates)

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
      k.loadFont('mania', 'fonts/mania.ttf'),
      k.loadSound('destroy', 'sounds/Destroy.wav'),
      k.loadSound('hurt', 'sounds/Hurt.wav'),
      k.loadSound('hyper-ring', 'sounds/HyperRing.wav'),
      k.loadSound('jump', 'sounds/Jump.wav'),
      k.loadSound('ring', 'sounds/Ring.wav'),
      k.loadSound('city', 'sounds/city.mp3'),
    ])
      .then(() => {
        console.log('All assets loaded successfully');

        // Add scenes
        k.scene('disclaimer', () => disclaimer(k));
        k.scene('main-menu', () => mainMenu(k));
        k.scene('game', () => game(k));
        k.scene('gameover', (citySfx) => gameover(k, citySfx));

        // Start the game
        k.go('disclaimer');
      })
      .catch((err) => {
        console.error('Failed to load assets:', err);
      });

    // Cleanup function to destroy Kaplay instance and stop sounds when leaving the page
    return () => {
      if (k) {
        k.quit(); // Stop Kaplay instance

        // Remove the canvas element from the DOM
        const canvas = document.querySelector('canvas');
        if (canvas) {
          canvas.remove();
        }
      }
    };
  }, []); // This useEffect will only run once when MainPage is first loaded

  return (
    <div>
      <h1>Math Game</h1>
      <div id="game"></div> {/* The game canvas will be rendered here */}
    </div>
  );
};

export default MainPage;
