import k from "./kaplayCtx";
 
class GameManager {
  isGamePaused = false;
  gameMode = "solo"; // Default to solo mode
  currentPlayer = 1; // Player 1 or 2 for PVP mode
  p1Measure = 0; // Player 1's measure for PVP mode
  p2Measure = 0; // Player 2's measure for PVP mode
  pvpWinner = 0; // Store the winner in PVP mode
 
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
    this.p1Measure = 0;
    this.p2Measure = 0;
    this.pvpWinner = 0;
    this.pvpRound = 1; // Always round 1 for PVP mode
  }
 
  // Helper function to get current player's measure
  getCurrentPlayerMeasure() {
    return this.currentPlayer === 1 ? this.p1Measure : this.p2Measure;
  }
 
  // Helper function to update current player's measure
  updateCurrentPlayerMeasure(value) {
    if (this.currentPlayer === 1) {
      this.p1Measure += value;
    } else {
      this.p2Measure += value;
    }
  }
}
 
const gameManager = new GameManager();
export default gameManager;