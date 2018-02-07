
function Vault(code, elem_id) {

    let isSafe = false,
        correctCode = code,
        allButtons = $(".buttons>button"),
        enteredCode = [],
        countCorrect = 0,
        countWrong = 0;
    const player = new Audio();

      this.testCode = function () {
        if(typeof code !== "object" || (code.length > 3 || code.length < 3) ) {
            alert("Code is not an array or has les then 3 numbers");
            isSafe = false;
        }
        else {
            isSafe = true;
        }
    };


    this.init = function () {
        this.testCode();
        if(!isSafe) return null;
        _(elem_id).innerHTML += `
            <div class="vaultContainer">

                <div id="${elem_id}-green-light" class="light green"></div>
                <div id="${elem_id}-red-light" class="light red"></div>
                <div class="clearfix"></div>
                <div class="black-box">
                <h3 id="${elem_id}-enteredCode" class="code-box">${"-".repeat(code.length)}</h3>

                    <p id="${elem_id}-notif" class="vault-notif">Please enter the code! &nbsp;</p>
                    </div>
                    <div class="vault-buttons">
                        <button onclick="${elem_id}.buttonPress(this)" value="1">1</button>
                        <button onclick="${elem_id}.buttonPress(this)" value="2">2</button>
                        <button onclick="${elem_id}.buttonPress(this)" value="3">3</button>
                    </div>
                    <p id="${elem_id}-stats" class="vault-notif">Times correct: 0 &middot; Times incorrect: 0</p>

            </div>
        `;
    };

    this.buttonPress = function (button) {
        if(!isSafe) return null;
        for(let btn of allButtons) {
            btn.disabled = true;
        }
        let num = button.value;
        enteredCode.push(num);
        _(elem_id + "-enteredCode").innerHTML = (enteredCode.join("") + ("-".repeat(code.length)) ).substring(0, 3);
        if(enteredCode.length === 3) {
            isSafe = false;
            // noinspection EqualityComparisonWithCoercionJS
            let flag = enteredCode[0] == correctCode[0] && enteredCode[1] == correctCode[1] && enteredCode[2] == correctCode[2];
            if(flag) {
                player.pause();
                player.src = "audio/open.mp3";
                player.play();
                blink("#" + elem_id + "-green-light", 9, 200);
                _(elem_id + "-notif").innerHTML = "Code is correct";
                countCorrect++;
            }
            else {player.pause();
                player.src = "audio/closed.mp3";
                player.play();
                blink("#" + elem_id + "-red-light", 9, 200);
                _(elem_id + "-notif").innerHTML = "Code is incorrect";
                countWrong++;
            }
            _(elem_id + "-stats").innerHTML = `Times correct: ${countCorrect} &middot; Times incorrect: ${countWrong}`;
            setTimeout(() => {
                isSafe = true;
                _(elem_id + "-enteredCode").innerHTML = "-".repeat(code.length);
                _(elem_id + "-notif").innerHTML = "&nbsp;";
            }, 3600);
            enteredCode.splice(0, enteredCode.length);
        }


        for(let btn of allButtons) {
            btn.disabled = false;
        }
    };

}



function _(id) { return document.getElementById(id); }
