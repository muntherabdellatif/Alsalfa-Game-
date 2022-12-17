import { Game } from './modules/game.js';
import { subjects } from './data/subjects.js';
let gameContainer = document.getElementById("play_container");


let game = new Game(gameContainer, subjects);
game.startGame();