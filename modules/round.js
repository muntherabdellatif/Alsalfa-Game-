class Round {
    roundNumber = 1;
    roundStepsCounter = 0;
    roundSubject = "";
    outTheRoundPlayer = null;
    roundSteps = ["show players the subject", "ask other", "voicing of person", "voicing of subject", "show result"]
    stepIndex = 0;

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

    getStepIndex = () => {
        return this.stepIndex;
    }
}

export { Round };