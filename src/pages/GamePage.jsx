/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { loadAssets } from "../assetLoader"; // Assuming assetLoader is in your src folder
import { COLORS } from "../constants"; // Import colors from constants file
import Dog from "../entities/dog"; // Import Dog entity
import Duck from "../entities/duck"; // Import Duck entity
import k from "../kaplayCtx"; // Your Kaplay context, assuming this initializes Kaplay
import gameManager from "../gameManager"; // Import your gameManager
import formatScore from "../utils"; // Utility function for formatting score

const GamePage = () => {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  useEffect(() => {
    // Load assets when the component mounts
    loadAssets();
    const MAX_ROUNDS = 5;

    // Set up the main-menu scene
    k.scene("main-menu", () => {
      k.add([k.sprite("menu")]);

      k.add([
        k.text("CLICK TO START", { font: "nes", size: 8 }),
        k.anchor("center"),
        k.pos(k.center().x, k.center().y + 40),
      ]);

      k.add([
        k.text("MADE BY TEAM MATH-HEW", { font: "nes", size: 8 }),
        k.z(2),
        k.pos(10, 215),
        k.color(COLORS.BLUE),
        k.opacity(0.5),
      ]);

      let bestScore = k.getData("best-score");
      if (!bestScore) {
        bestScore = 0;
        k.setData("best-score", 0);
      }
      k.add([
        k.text(formatScore(bestScore, 6), { font: "nes", size: 8 }),
        k.pos(150, 184),
        k.color(COLORS.RED),
      ]);

      k.onClick(() => {
        k.go("game");
      });
    });

    // Set up the game scene
    k.scene("game", () => {
      k.setCursor("none");
      k.add([k.rect(k.width(), k.height()), k.color(COLORS.BLUE), "sky"]);
      k.add([k.sprite("background"), k.pos(0, -10), k.z(1)]);

      const score = k.add([
        k.text(formatScore(0, 6), { font: "nes", size: 8 }),
        k.pos(192, 197),
        k.z(2),
      ]);

      const roundCount = k.add([
        k.text("1", { font: "nes", size: 8 }),
        k.pos(42, 182),
        k.z(2),
        k.color(COLORS.RED),
      ]);
      
      const goalText = k.add([
        k.text("", { font: "nes", size: 6 }),
        k.pos(140, 202),
        k.z(2),
      ]);

      const measureText = k.add([
        k.text("", { font: "nes", size: 6 }),
        k.pos(105, 202),
        k.z(2),
        "measureText"
      ]);

      const duckIcons = k.add([k.pos(95, 198)]);
      let duckIconPosX = 1;
      for (let i = 0; i < 10; i++) {
        duckIcons.add([k.rect(7, 9), k.pos(duckIconPosX, 0), `duckIcon-${i}`]);
        duckIconPosX += 8;
      }

      const bulletUIMask = k.add([
        k.rect(0, 8),
        k.pos(25, 198),
        k.z(2),
        k.color(0, 0, 0),
      ]);

      const gameInstructions = k.add([
        k.sprite("long-text-box"),
        k.anchor("center"),
        k.pos(k.center().x, k.center().y - 50),
        k.z(2),
    ]);
      gameInstructions.add([
        k.text("SHOOT THE RULERS TO REACH THE GOAL!", { font: "nes", size: 5 }),
        k.anchor("center"),
        k.pos(0, -10),
    ]);
      gameInstructions.add([
        k.text("AVOID GOING NEGATIVE OR OVERSHOOTING!", { font: "nes", size: 5 }),
        k.anchor("center"),
        k.pos(0, 0),
    ]);
      gameInstructions.add([
        k.text("EARN BONUS POINTS FOR FEWER MOVES!", { font: "nes", size: 5 }),
        k.anchor("center"),
        k.pos(0, 10),
    ]);
 
    let dog;
      k.wait(7, () => {
        k.destroy(gameInstructions);
        dog = new Dog(k.vec2(0, k.center().y));
        dog.searchForDucks();
      })


      const roundStartController = gameManager.stateMachine.onStateEnter(
        "round-start",
        async (isFirstRound) => {
          if (gameManager.currentRoundNb > MAX_ROUNDS) {
            k.go("game-over");
            return;
          }
          if (!isFirstRound) gameManager.preySpeed += 50;
          k.play("ui-appear");
          gameManager.currentRoundNb++;
          var measure = k.choose([20.0, 22.5, 15.0, 17.5, 25.0]);
          gameManager.goalMeasure = measure;
          roundCount.text = gameManager.currentRoundNb;
          goalText.text = gameManager.goalMeasure.toFixed(1)+"cm";
          gameManager.currentMeasure = 0;
          measureText.text = gameManager.currentMeasure.toFixed(1);
          const textBox = k.add([
            k.sprite("text-box"),
            k.anchor("center"),
            k.pos(k.center().x, k.center().y - 50),
            k.z(2),
          ]);
          textBox.add([
            k.text("ROUND", { font: "nes", size: 8 }),
            k.anchor("center"),
            k.pos(0, -10),
          ]);
          textBox.add([
            k.text(gameManager.currentRoundNb, { font: "nes", size: 8 }),
            k.anchor("center"),
            k.pos(0, 4),
          ]);
          
          await k.wait(1);
          k.destroy(textBox);
          gameManager.stateMachine.enterState("hunt-start");
        }
      );

      const roundEndController = gameManager.stateMachine.onStateEnter(
        "round-end",
        () => {
            // Check for game over conditions
            if (gameManager.currentMeasure < 0 ||
                gameManager.currentMeasure > 2 * gameManager.goalMeasure) {
                k.go("game-over");
                return;
            }

            if (gameManager.currentRoundNb === MAX_ROUNDS) {
              k.go("game-over");
              return;
            }
     
            // If the round is valid, check for score updates
            if (gameManager.currentHuntNb < 15) {
                gameManager.currentScore += 500; // Plus points if the goal was reached in less than 15 tries
            }
     
            // Reset for the next round
            gameManager.currentHuntNb = 0;
            for (const duckIcon of duckIcons.children) {
                duckIcon.color = k.color(255, 255, 255); // Reset duck icons
            }
            gameManager.stateMachine.enterState("round-start"); // Start the next round
        }
    );

      const huntStartController = gameManager.stateMachine.onStateEnter(
        "hunt-start",
        () => {
          gameManager.currentHuntNb++;
          const duck = new Duck(
            gameManager.currentHuntNb - 1,
            gameManager.preySpeed
          );
          duck.setBehavior();
        }
      );

      const huntEndController = gameManager.stateMachine.onStateEnter(
        "hunt-end",
        () => {
            const bestScore = Number(k.getData("best-score"));
     
            // Update best score if current score is higher
            if (bestScore < gameManager.currentScore) {
                k.setData("best-score", gameManager.currentScore);
            }
     
            // Check if the current measure meets the goal measure
            if (gameManager.currentMeasure === gameManager.goalMeasure ||
                gameManager.currentMeasure < 0 ||
                gameManager.currentMeasure > 2 * gameManager.goalMeasure) {
               
                // Reset for the next round
                gameManager.currentHuntNb = 0;
                gameManager.stateMachine.enterState("round-end");
            } else {
                // If the goal is not met, continue to the next hunt
                gameManager.stateMachine.enterState("hunt-start");
            }
        }
    );

      const duckHunterController = gameManager.stateMachine.onStateEnter(
        "duck-hunted",
        () => {
          gameManager.nbBulletsLeft = 3;
          dog.catchFallenDuck();
        }
      );

      const duckEscapedController = gameManager.stateMachine.onStateEnter(
        "duck-escaped",
        async () => {
          dog.mockPlayer();
        }
      );

      const cursor = k.add([k.sprite("cursor"), k.anchor("center"), k.pos(), k.z(3)]);
      k.onClick(() => {
        if (
          gameManager.stateMachine.state === "hunt-start" &&
          !gameManager.isGamePaused
        ) {
          if (gameManager.nbBulletsLeft > 0) k.play("gun-shot", { volume: 0.5 });
          gameManager.nbBulletsLeft--;
        }
      });

      k.onUpdate(() => {
        score.text = formatScore(gameManager.currentScore, 6);

        switch (gameManager.nbBulletsLeft) {
          case 3:
            bulletUIMask.width = 0;
            break;
          case 2:
            bulletUIMask.width = 8;
            break;
          case 1:
            bulletUIMask.width = 15;
            break;
          default:
            bulletUIMask.width = 22;
        }
        cursor.moveTo(k.mousePos());
      });

      const forestAmbianceSound = k.play("forest-ambiance", {
        volume: 0.1,
        loop: true,
      });

      k.onSceneLeave(() => {
        forestAmbianceSound.stop();
        roundStartController.cancel();
        roundEndController.cancel();
        huntStartController.cancel();
        huntEndController.cancel();
        duckHunterController.cancel();
        duckEscapedController.cancel();
        gameManager.initializeGameState();
      });

      k.onKeyPress((key) => {
        if (key === "p") {
          k.getTreeRoot().paused = !k.getTreeRoot().paused;
          if (k.getTreeRoot().paused) {
            gameManager.isGamePaused = true;
            audioCtx.suspend();
            k.add([k.text("PAUSED", { font: "nes", size: 8 }), k.pos(5, 5), k.z(3), "paused-text"]);
          } else {
            gameManager.isGamePaused = false;
            audioCtx.resume();

            const pausedText = k.get("paused-text")[0];
            if (pausedText) k.destroy(pausedText);
          }
        }
      });
    });

    // Set up game-over scene
    k.scene("game-over", () => {

      //backend handling here
      const finalScore = gameManager.currentScore;

      k.add([k.rect(k.width(), k.height()), k.color(0, 0, 0)]);
      k.add([
        k.text("GAME OVER!", { font: "nes", size: 8 }),
        k.anchor("center"),
        k.pos(k.center()),
      ]);

      k.wait(2, () => {
        k.go("main-menu");
      });
    });

    // Start the game at the main-menu scene
    k.go("main-menu");

    // Cleanup on component unmount
    return () => {
      const canvas = document.querySelector("canvas");
      if (canvas) {
        canvas.remove();
      }
    };
  }, []); // Runs once when the component mounts

  return (
    <div className="game-wrapper">
      <div id="game"></div>
    </div>
  );
};

export default GamePage;