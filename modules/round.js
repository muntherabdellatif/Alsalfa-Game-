class Round {
    roundNumber = 1;
    roundStepsCounter = 0;
    roundSubject = "";
    outTheRoundPlayer = null;

    constructor(roundNumber) {
        this.roundNumber = roundNumber;
    }

    getRoundSubject = () => {
        return this.roundSubject;
    }

    setRoundSubject = (subject) => {
        this.roundSubject = subject;
    }

    getOutTheRoundPlayer = () => {
        return this.outTheRoundPlayer;
    }

    setOutTheRoundPlayer = (player) => {
        this.outTheRoundPlayer = player;
    }
}

export { Round };