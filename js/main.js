
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

    $(function(){
      $("#ShakeY").hide()
      $('#ShakeX').hide()
      $('#noAnimation').show()
   });

    this.init = function () {
        this.testCode();
        if(!isSafe) return null;
        _(elem_id).innerHTML += `
        <div id="blueVaultContainer">
          <div id="vaultName">
            <div id="ShakeY">
              <div class="text animated shakeY">Project Vault</div>
            </div>
            <div id="ShakeX">
              <div class="text animated shakeX">Project Vault</div>
            </div>
            <div id="noAnimation">
              Project Vault
            </div>
          </div>

            <div class="GreyVaultContainer">

                <div id="${elem_id}-green-light" class="light green"></div>
                <div id="${elem_id}-red-light" class="light red"></div>
                <div class="clearfix"></div>
                <div class="blackBox">
                <h3 id="${elem_id}-enteredCode" class="codeBox">${"-".repeat(code.length)}</h3>

                    <p id="${elem_id}-notif" class="vaultNotif">Please enter the code! &nbsp;</p>
                    </div>
                    <div id="vaultbuttons">
                    <div id="vaultButton1">
                        <button onclick="${elem_id}.buttonPress(this)" value="1">1</button>
                    </div>
                    <div id="vaultButton2">
                        <button onclick="${elem_id}.buttonPress(this)" value="2">2</button>
                    </div>
                    <div id="vaultButton3">
                        <button onclick="${elem_id}.buttonPress(this)" value="3">3</button>
                    </div>
                    </div>
                    <p id="${elem_id}-stats" class="vaultNotif">Correct inputs: 0 &middot; Incorrect inputs: 0</p>

            </div>
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

            let flag = enteredCode[0] == correctCode[0] && enteredCode[1] == correctCode[0] && enteredCode[2] == correctCode[0];
            if(flag) {
                player.pause();
                player.src = "audio/open.mp3";
                player.play();
                blink("#" + elem_id + "-green-light", 9, 200);
                _(elem_id + "-notif").innerHTML = "Code is correct!";
                $('#ShakeY').show()
                $('#ShakeX').hide()
                $('#noAnimation').hide()
                countCorrect++;
            }
            else {player.pause();
                player.src = "audio/closed.mp3";
                player.play();
                blink("#" + elem_id + "-red-light", 9, 200);
                _(elem_id + "-notif").innerHTML = "Code is incorrect!";
                $('#ShakeY').hide()
                $('#ShakeX').show()
                $('#noAnimation').hide()
                countWrong++;
            }
            _(elem_id + "-stats").innerHTML = `Correct inputs: ${countCorrect} &middot; Incorrect inputs: ${countWrong}`;
            setTimeout(() => {
                isSafe = true;
                $('#ShakeY').hide()
                $('#ShakeX').hide()
                $('#noAnimation').show()
                _(elem_id + "-enteredCode").innerHTML = "-".repeat(code.length);
                _(elem_id + "-notif").innerHTML = "Please enter the code! &nbsp;";
            }, 3600);
            enteredCode.splice(0, enteredCode.length);
        }


        for(let btn of allButtons) {
            btn.disabled = false;
        }
    };

}

function blink(elem, times, speed) {
    if (times > 0 || times < 0) {
        if ($(elem).hasClass("blink")) $(elem).removeClass("blink");
        else $(elem).addClass("blink");
    }

    clearTimeout(() => {
        blink(elem, times, speed);
    });

    if (times > 0 || times < 0) {
        setTimeout(() => {
            blink(elem, times, speed);
        }, speed);
        times -= .5;
    }
}

function _(id) { return document.getElementById(id); }
