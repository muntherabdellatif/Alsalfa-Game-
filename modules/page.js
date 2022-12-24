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
                        <button class="delete_player" data-player=${index}>حذف </button>
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
            <p>اعطي الدور لاعب </p>
            <p class="name">${Player.name}</p>
            <button id="show_player_the_option">التالي</button>
        `;
        this.gameContainer.innerHTML = html;
    }

    renderShowPlayerTheOption = (option) => {
        let html = `
        <p> موضوع الجولة هو</p>
        <p class="name">${option}</p>
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

    renderAskPage = (player1, player2) => {
        let html = `
        <p>
            <span> على اللاعب</span>
            <span class="name">${player1}</span>
            <span>  ان يسال اللاعب</span>
            <span class="name">${player2}</span>
        </p>
        <button id="ask_other_player">التالي</button>
    `;
        this.gameContainer.innerHTML = html;
    }

    renderFreeAsk = () => {
        let html = `
        <p> اضغط التالي لبدأ التصويت في حال انتهيتم من الاسئلة </p>
        <button id="start_voicing">التالي</button>
    `;
        this.gameContainer.innerHTML = html;
    }

    renderVoicingOnPlayer = (currentPlayer, otherPlayers) => {
        let html = `
            <p>
                <span> على اللاعب </span>
                <span class="name"> ${currentPlayer.name} </span>
                <span> اختيار اللاعب الذي لا يعلم موضوع الجولة </span>
            </p>
        `;
        otherPlayers.forEach((player, index) => {
            html += `<p class="player_options" data-player="${index}">${player.name} </p>`
        })
        this.gameContainer.innerHTML = html;
    }

    renderThePlayerOutTheRoundIs = (player) => {
        let html = `
        <p> اللاعب الذي لا يعرف موضوع الجولة هو</p>
        <h1 class="name"> ${player.name} </h1>
        <button id="start_voicing">التالي</button>
    `;
        this.gameContainer.innerHTML = html;
    }

    renderSelectRoundSubject = (randomOptions, currentPlayer) => {
        let html = `
            <p>
                <span> على اللاعب </span>
                <span class="name"> ${currentPlayer.name} </span>
                <span> اختيار موضوع الجولة </span>
            </p>
        `;
        randomOptions.forEach((option) => {
            html += `<p class="options" data-option="${option}">${option} </p>`
        })
        html += `<button id="show_scores">التالي</button>`
        this.gameContainer.innerHTML = html;
    }

    renderPlayersScore = (players) => {
        let html = `<h1> النتائج </h1>`
        players.forEach((player) => {

            html += `
            <p>
                <span class="name">${player.name}</span>
                <span class="name">${player.score}</span>
            </p>`
        });
        html += `<button id="start_new_round">جولة جديدة</button>`
        this.gameContainer.innerHTML = html;
    }

}

export { Page };