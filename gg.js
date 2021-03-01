// access the dom element 'msg'
const msgEL = document.getElementById('msg');

// Create a Random Number 
const randomNum = getRandomNumber();

// function getRandom Number
function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

console.log('Number: ' + randomNum);
// lines 15 - 20 are utilizing the code from API
// Internalize the Speech Recognition object
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

// Create a new Instance called recognition
let recognition = new window.SpeechRecognition();

recognition.start();

recognition.addEventListener('result', onSpeak);

// capture the input from the useer's 
function onSpeak(e) {
    // console.log(e);
    const msg = e.results[0][0].transcript;
    console.log('===', msg);

    writeMessage(msg);
    checkMessage(msg);

}
//Display user's input into the UI/ Write what the user speaks
function writeMessage(msg) {
    msgEL.innerHTML = `
    <div> You said: </div>
    <span class="box">${msg}</span>
    `;
}
//Check the user's guess against the number`
function checkMessage(msg) {
    const num = +msg;
    console.log(num)
    //check number to see if it's valid
    if (Number.isNaN(num)) {
        msgEL.innerHTML += `<div> That is not a valid number</div>`;
        console.log(msgEL)
        return;
    }

    // Check if the number is range 
    // So the number needs to be between 1 and 100
    if (num > 100 || num < 1) {
        msgEL.innerHTML += `<div> Number must be between 1 and 100 </div>`;
        return;
    }

    //Check the number
    if (num === randomNum) {
        // Let the user they have won
        document.body.innerHTML = `
        <h2>Congrats! you have guessed the number!<br><br>
        It was ${num}</h2>
        <button class="play-again" id="play-again">Play Again</button>
        `;
    } else if (num > randomNum) {
        msgEL.innerHTML += `<div>Go Lower</div>`;

    } else {
        msgEL.innerHTML += `<div> Go Higher</div>`;
    }
}

//End Speech Recognition Service
recognition.addEventListener('end', () => recognition.start());


document.body.addEventListener('click', e => {
    if (e.target.id == 'play-again') {
        window.location.reload();
    }
})