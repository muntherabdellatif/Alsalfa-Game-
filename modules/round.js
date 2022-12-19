class Round {
    roundNumber = 1;
    roundStepsCounter = 0;
    roundSubject = "";
    outTheRoundPlayer = null;
    roundSteps = ["show players the subject", "ask other", "free ask", "voicing of person", "show the player that out of the round", "voicing of subject", "show result"]
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

    setStepIndex = (index) => {
        this.stepIndex = index;
    }

    getRoundSteps = () => {
        return this.roundSteps;
    }

    incrementRoundStepsCounter = () => {
        this.roundStepsCounter += 1;
        this.stepIndex = 0;
    }

    getRoundStepsCounter = () => {
        return this.roundStepsCounter;
    }
}

export { Round };