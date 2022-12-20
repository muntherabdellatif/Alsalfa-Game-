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
        document.getElementById("start_round").addEventListener("click", this.checkPlayerAndCreateRound);
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
        if (playerName != "") {
            let player = new Player(playerName);
            this.players.push(player);
            this.showAddPlayersPage();
        }
    }

    deletePlayerAndReloadThePage = (event) => {
        let playerIndex = event.target.dataset.player;
        let player = this.players[playerIndex];
        this.players = this.players.filter(function (value, index) {
            return index != playerIndex;
        })
        this.showAddPlayersPage();
    }

    checkPlayerAndCreateRound = () => {
        if (this.players.length >= 3) {
            this.createRound();
        } else {
            alert("add more players")
        }
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
                this.voicingOnPlayer(currentPlayer, currentRound);
                break;
            case "show the player that out of the round":
                this.showThePlayerThatOutOfTheRound(currentRound);
                break;
            case "voicing of subject":
                this.voicingOnOptions(currentRound, currentPlayer);
                break;
            case "show result":
                this.showResult();
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

    voicingOnPlayer = (currentPlayer, currentRound) => {
        let otherPlayers = this.players.filter(x => x != currentPlayer);
        console.log({ currentPlayer, otherPlayers })
        this.page.renderVoicingOnPlayer(currentPlayer, otherPlayers);
        document.querySelectorAll(".player_options").forEach((option) => {
            option.addEventListener("click", (event) => {
                if (currentRound.outTheRoundPlayer == otherPlayers[event.target.dataset.player]) {
                    currentPlayer.addScore();
                }
                let index = currentRound.getStepIndex();
                if (currentRound.getStepIndex() >= this.players.length - 1) {
                    currentRound.incrementRoundStepsCounter();
                } else {
                    currentRound.setStepIndex(index + 1);
                }
                this.PlayRound();
            })
        })
    }

    showThePlayerThatOutOfTheRound = (currentRound) => {
        let outTheRoundPlayer = currentRound.getOutTheRoundPlayer();
        this.page.renderThePlayerOutTheRoundIs(outTheRoundPlayer);
        document.getElementById("start_voicing").addEventListener("click", () => {
            currentRound.incrementRoundStepsCounter();
            this.PlayRound();
        })
    }

    voicingOnOptions = (currentRound) => {
        let outTheRoundPlayer = currentRound.getOutTheRoundPlayer();
        let roundSubject = currentRound.getRoundSubject();
        let randomOptions = this.generateOptions(roundSubject);
        this.page.renderSelectRoundSubject(randomOptions, outTheRoundPlayer);
        document.querySelectorAll(".options").forEach((option) => {
            option.addEventListener("click", (event) => {
                if (event.target.dataset.option == roundSubject) {
                    outTheRoundPlayer.addScore();
                    event.target.classList.add("correct");
                } else {
                    event.target.classList.add("not_correct");
                    document.querySelectorAll(".options").forEach((option) => {
                        if (option.dataset.option == roundSubject) {
                            option.classList.add("correct");
                        }
                    })
                }
                document.getElementById('show_scores').addEventListener('click', () => {
                    currentRound.incrementRoundStepsCounter();
                    this.PlayRound();
                })
            })
        })
    }

    showResult = () => {
        this.page.renderPlayersScore(this.players);
        document.getElementById('start_new_round').addEventListener('click', () => {
            this.createRound();
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

    generateOptions = (roundSubject) => {
        let otherOptions = this.options.filter(x => x != roundSubject);
        let randomOptions = this.getMultipleRandom(otherOptions, 7);
        randomOptions[Math.floor(Math.random() * 6)] = roundSubject;
        return randomOptions;
    }

    getMultipleRandom(arr, num) {
        const shuffled = [...arr].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, num);
    }

}

export { Game };