import { Round } from "./round.js";
import { Player } from "./player.js";

class Game {
    subjects = [];
    rounds = [];
    players = [];
    options = [];
    roundSteps = ["show players the subject", "ask other", "voicing of person", "voicing of subject", "show result"]
    gameContainer = null;

    constructor(gameContainer, subjects) {
        this.gameContainer = gameContainer;
        this.subjects = subjects;
    }

    startGame = () => {
        this.showSelectSubjectPage();
        const subjectButtons = document.querySelectorAll(".subject");
        subjectButtons.forEach((btn) => {
            btn.addEventListener("click", this.selectSubjectAndShowAddPlayersPage);
        })
    }

    showSelectSubjectPage = () => {
        let allSubjectHtml = "<h1 class='header' >قم باختيار موضوع اللعبة</h1>";
        this.subjects.forEach((subject) => {
            const element = `
                <div class='subject' data-value="${subject.name}">
                    ${subject.name}
                </div>`;
            allSubjectHtml += element;
        });
        this.gameContainer.innerHTML = allSubjectHtml;
    }

    selectSubjectAndShowAddPlayersPage = (event) => {
        this.selectSubject(event.target.dataset.value);
        this.showAddPlayersPage();
    }

    showAddPlayersPage = () => {
        let playersPageHtml = "<h1 class='header'>قم باختيار الاعبين</h1>";
        if (this.players.length > 0) {
            this.players.forEach((player, index) => {
                playersPageHtml += `
                <div class="players_Box">
                    <p>${player.name}</p>
                    <button class="delete_player" data-player=${index}>حذف الاعب</button>
                </div>
                `;
            })
        }
        playersPageHtml += `
        <div class="add_player_form">
            <input type="text" name="player" id="player" placeholder="ادخل اسم اللاعب">
            <button id="add_player_button">إضافة لاعب</button>
        </div>`;
        playersPageHtml += `<button id="start_round">التالي</button>`
        this.gameContainer.innerHTML = playersPageHtml;
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
        this.PlayerRound();
        console.log(this);
    }

    PlayerRound = () => {
        currentRoundStep = this.currentRoundStep();

    }

    currentRoundStep = () => {
        let currentRound = this.rounds[this.rounds.length - 1]
        return currentRound.roundStepsCounter;
    }
}

export { Game };