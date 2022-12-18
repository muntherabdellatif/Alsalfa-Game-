import { Round } from "./round.js";
import { Player } from "./player.js";
import { Page } from "./page.js";

class Game {
    subjects = [];
    rounds = [];
    players = [];
    toAskPlayers = [];
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
        this.toAskPlayers = this.createToAskPlayersArray();
        this.PlayRound();
        console.log(this);
    }

    createToAskPlayersArray = () => {
        let shift = Math.floor(Math.random() * (this.players.length - 1)) + 1;
        let newPlayerArray = [...this.players];
        while (shift > 0) {
            let firstElement = newPlayerArray[0];
            newPlayerArray.push(firstElement);
            newPlayerArray.splice(0, 1);
            shift--;
        }
        return newPlayerArray;
    }

    PlayRound = () => {
        let currentRound = this.currentRound();
        let currentStep = this.currentRoundStep();
        let currentPlayer = this.players[currentRound.getStepIndex()];

        switch (currentStep) {
            case "show players the subject":
                this.showPlayersTheSubject(currentRound, currentPlayer);
                break;
            case "ask other":
                this.askOther(currentRound);
                break;
            case "free ask":
                this.freeAsk(currentRound);
                break;
            case "voicing of person":
                this.voicingOnPlayer(currentPlayer);
                break;
            default:
                break;
        }
        console.log(this);
    }

    showPlayersTheSubject = (currentRound, currentPlayer) => {
        this.page.renderGiveTheDeviceToPlayer(currentPlayer);
        document.getElementById("show_player_the_option").addEventListener("click", () => {
            if (currentPlayer.name == currentRound.getOutTheRoundPlayer().name) {
                this.page.renderOutOfTheRoundPlayer();
            }
            else {
                this.page.renderShowPlayerTheOption(currentRound.getRoundSubject())
            }
            document.getElementById("give_the_device_to_next_player").addEventListener("click", () => {
                let index = currentRound.getStepIndex();
                if (index >= this.players.length - 1) {
                    currentRound.incrementRoundStepsCounter();
                } else {
                    currentRound.setStepIndex(index + 1);
                }
                this.PlayRound();
            })
        })
    }

    askOther = (currentRound) => {
        let index = currentRound.getStepIndex();
        this.page.renderAskPage(this.players[index].name, this.toAskPlayers[index].name);
        document.getElementById("ask_other_player").addEventListener("click", () => {
            if (currentRound.getStepIndex() >= this.players.length - 1) {
                currentRound.incrementRoundStepsCounter();
            } else {
                currentRound.setStepIndex(index + 1);
            }
            this.PlayRound();
        })
    }

    freeAsk = (currentRound) => {
        this.page.renderFreeAsk();
        document.getElementById("start_voicing").addEventListener("click", () => {
            currentRound.incrementRoundStepsCounter();
            this.PlayRound();
        })
    }

    voicingOnPlayer = (currentPlayer) => {
        let otherPlayers = this.players.filter(x => x != currentPlayer);
        console.log({ currentPlayer, otherPlayers })
        this.page.renderVoicingOnPlayer(currentPlayer, otherPlayers);
        document.querySelectorAll(".player_options").forEach((option) => {
            option.addEventListener("click", (event) => {
                console.log(currentPlayer);
                console.log(otherPlayers[event.target.dataset.player]);
            })
        })
    }

    currentRoundStep = () => {
        let currentRound = this.currentRound();
        let currentRoundSteps = currentRound.getRoundSteps();
        let currentRoundStepCounter = currentRound.getRoundStepsCounter();
        return currentRoundSteps[currentRoundStepCounter];
    }

    currentRound = () => {
        return this.rounds[this.rounds.length - 1]
    }


}

export { Game };