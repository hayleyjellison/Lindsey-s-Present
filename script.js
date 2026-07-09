const synth = window.speechSynthesis;

const inputForm = document.querySelector("form");
const inputTxt = document.querySelector(".txt");
const voiceSelect = document.querySelector("select");

let voices = [];

function populateVoiceList() {
    voices = synth.getVoices().sort(function (a, b) {
        const aname = a.name.toUpperCase();
        const bname = b.name.toUpperCase();

        if (aname < bname) {
            return -1;
        } else if (aname == bname) {
            return 0;
        } else {
            return +1;
        }
    });
    const selectedIndex =
        voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex;
    voiceSelect.innerHTML = "";

    var child_index = 0;
    for (let i = 0; i < voices.length; i++) {
        if (voices[i].lang.indexOf("en") > -1) {
            const option = document.createElement("option");
            option.textContent = `${voices[i].name}`;
            option.setAttribute("data-lang", voices[i].lang);
            option.setAttribute("data-name", voices[i].name);
            voiceSelect.appendChild(option);
            if (voices[i].name.includes("Google US")) {
                voiceSelect.selectedIndex = child_index;
            }
            child_index += 1;
        }
    }
}

populateVoiceList();


if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
}

function speak(command_text) {
    if (synth.speaking) {
        console.error("speechSynthesis.speaking");
        return;
    }

    if (command_text !== "") {
        utterThis = new SpeechSynthesisUtterance(command_text);

        utterThis.onend = function (event) {
            console.log("SpeechSynthesisUtterance.onend");
        };

        utterThis.onerror = function (event) {
            console.error("SpeechSynthesisUtterance.onerror");
        };

        const selectedOption =
            voiceSelect.selectedOptions[0].getAttribute("data-name");

        for (let i = 0; i < voices.length; i++) {
            if (voices[i].name === selectedOption) {
                utterThis.voice = voices[i];
                break;
            }
        }
        synth.speak(utterThis);
    }
}

for (let i = 0; i < document.querySelectorAll('#play').length; i++) {
    var playEle = document.querySelectorAll('#play')[i];
    var flag = false;


    playEle.addEventListener('click', onClickPlay);
    function onClickPlay() {
        command_text = document.querySelectorAll('article')[i].textContent
        if (i == 0) {
            if (inputTxt.value != "") {
                command_text += inputTxt.value
            }
            else {
                command_text = ""
            }
        }
        speak(command_text);
    }
}

// inputForm.onsubmit = function (event) {
//   event.preventDefault();

//   speak();

//   inputTxt.blur();
// };
