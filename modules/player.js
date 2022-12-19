class Player {
    name = "";
    score = 0;
    constructor(name) {
        this.name = name;
    }

    addScore() {
        this.score += 1;
    }
}

export { Player };