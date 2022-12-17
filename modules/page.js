class Page {
    gameContainer = null;

    constructor(gameContainer) {
        this.gameContainer = gameContainer;
    }

    renderSelectSubjectPage = (subjects) => {
        let allSubjectHtml = "<h1 class='header' >قم باختيار موضوع اللعبة</h1>";
        subjects.forEach((subject) => {
            const element = `
                <div class='subject' data-value="${subject.name}">
                    ${subject.name}
                </div>`;
            allSubjectHtml += element;
        });
        this.gameContainer.innerHTML = allSubjectHtml;
    }
    renderAddPlayersPage = (players) => {
        let playersPageHtml = "<h1 class='header'>قم باختيار الاعبين</h1>";
        if (players.length > 0) {
            players.forEach((player, index) => {
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
    }

    renderGiveTheDeviceToPlayer = (Player) => {
        let html = `
            <p>اعطي الدور لاعب : </p>
            <p>${Player.name}</p>
            <button id="show_player_the_option">التالي</button>
        `;
        this.gameContainer.innerHTML = html;
    }

    renderShowPlayerTheOption = (option) => {
        let html = `
        <p> موضوع الجولة هو</p>
        <p>${option}</p>
        <button id="give_the_device_to_next_player">التالي</button>
    `;
        this.gameContainer.innerHTML = html;
    }

    renderOutOfTheRoundPlayer = () => {
        let html = `
        <p> انت لا تعلم موضوع الجولة ابذل جهدك لمعرفته</p>
        <button id="give_the_device_to_next_player">التالي</button>
    `;
        this.gameContainer.innerHTML = html;
    }

}

export { Page };