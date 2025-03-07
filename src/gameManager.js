import k from "./kaplayCtx";
 
class GameManager {
  isGamePaused = false;
 
  constructor() {
    this.initializeGameState();
    this.stateMachine = k.add([
      k.state("menu", [
        "menu",
        "cutscene",
        "round-start",
        "round-end",
        "hunt-start",
        "hunt-end",
        "duck-hunted",
        "duck-escaped",
      ]),
    ]);
  }
 
  initializeGameState() {
    this.currentScore = 0;
    this.currentRoundNb = 0;
    this.currentHuntNb = 0;
    this.nbBulletsLeft = 3;
    this.nbDucksShotInRound = 0;
    this.preySpeed = 100;
    this.goalMeasure = 0;
    this.currentMeasure = 0;
  }
}
 
const gameManager = new GameManager();
export default gameManager;