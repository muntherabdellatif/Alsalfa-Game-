import { Round } from "./round.js";
import { Player } from "./player.js";
import { Page } from "./page.js";

class Game {
    subjects = [];
    rounds = [];
    players = [];
    options = [];
    Page = null;

    constructor(gameContainer, subjects) {
        this.subjects = subjects;
        this.page = new Page(gameContainer);
    }

    startGame = () => {
        this.page.renderSelectSubjectPage(this.subjects);
        const subjectButtons = document.querySelectorAll(".subject");
        subjectButtons.forEach((btn) => {
            btn.addEventListener("click", this.selectSubjectAndShowAddPlayersPage);
        })
    }

    selectSubjectAndShowAddPlayersPage = (event) => {
        this.selectSubject(event.target.dataset.value);
        this.showAddPlayersPage();
    }

    showAddPlayersPage = () => {
        this.page.renderAddPlayersPage(this.players);
        document.getElementById("add_player_button").addEventListener("click", this.AddPlayersAndReloadThePage);
        document.querySelectorAll(".delete_player").forEach((deleteButton) => {
            deleteButton.addEventListener("click", this.deletePlayerAndReloadThePage);
        })
        document.getElementById("start_round").addEventListener("click", this.createRound);
        console.log(this);
    }

    selectSubject = (subject) => {
        let options = this.subjects.filter(function (value) {
            return value.name == subject
        })
        this.options = options[0].options;
    }

    AddPlayersAndReloadThePage = () => {
        let playerName = document.getElementById("player").value;
        let player = new Player(playerName);
        this.players.push(player);
        this.showAddPlayersPage();
    }

    deletePlayerAndReloadThePage = (event) => {
        let playerIndex = event.target.dataset.player;
        let player = this.players[playerIndex];
        this.players = this.players.filter(function (value, index) {
            return index != playerIndex;
        })
        this.showAddPlayersPage();
    }

    createRound = () => {
        let roundNumber = this.rounds.length + 1;
        let round = new Round(roundNumber);
        let randomOption = this.options[Math.floor(Math.random() * this.options.length)];
        let thePlayerOutTheRound = this.players[Math.floor(Math.random() * this.players.length)];
        round.setOutTheRoundPlayer(thePlayerOutTheRound);
        round.setRoundSubject(randomOption);
        this.rounds.push(round);
        this.PlayRound();
        console.log(this);
    }

    PlayRound = () => {
        let currentStep = this.currentRoundStep();
        let currentPlayer = this.players[this.currentRound().getStepIndex()];

        switch (currentStep) {
            case "show players the subject":
                this.page.renderGiveTheDeviceToPlayer(currentPlayer);
                document.getElementById("show_player_the_option").addEventListener("click", () => {
                    if (currentPlayer.name == this.currentRound().getOutTheRoundPlayer().name) {
                        this.page.renderOutOfTheRoundPlayer()
                    }
                    else {
                        this.page.renderShowPlayerTheOption(this.currentRound().getRoundSubject())
                    }
                })
                document.getElementById("give_the_device_to_next_player").addEventListener("click", () => {

                })
                break;

            default:
                break;
        }
    }

    currentRoundStep = () => {
        let currentRound = this.currentRound();
        return currentRound.roundSteps[currentRound.roundStepsCounter];
    }

    currentRound = () => {
        return this.rounds[this.rounds.length - 1]
    }
}

export { Game };