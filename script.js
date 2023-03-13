const btn = document.getElementById("btn");
let textboxValue = ""
let base = 1
let tries = 0
let fiveLetterWords = []
let actualWord = ""

function getGuess(){

    btn.addEventListener("click", function(event) {
        event.preventDefault();
        textboxValue = document.getElementById("tb").value;
        document.getElementById("tb").value = ""
        textboxValue = textboxValue.toUpperCase()

        if(checkGuess()){
            writeGuess();
        }

    });

}

function getActual(){

    let randomIndex = Math.floor(Math.random() * fiveLetterWords.length);
    actualWord = fiveLetterWords[randomIndex];

}

function writeGuess(){

    for (let i = 0 ; i < 5 ; i++, base++){
        document.getElementById(base.toString()).innerHTML = textboxValue[i]
    }

    let tbl = document.querySelector('.tbl')

    if (tries < 5){
        addRow();
        tries += 1
    }
    else{
        alert("Out of tries")
    }
    
}

function checkGuess(){

    if (textboxValue.length != 5){
        alert("Guesses must be exactly 5 letters long.")
        return false
    }

    if (!(textboxValue in fiveLetterWords)){
        alert("Must be valid five letter word ! ")
        return false 
    }


    for (let i = 0; i < 5; i++){
        if (actualWord[i] === textboxValue[i]){
            colourBoxes(base + i, greenyellow)
        }
        else if (actualWord[i] in textboxValue){
            colourBoxes(base + i, yellow)
        }
    }

    return true
}

function addRow(){

    const table = document.getElementById("tbl");

    const newRow = document.createElement("tr");

    for (let i = 0; i < 5; i++) {
        const cell = document.createElement("td");
        cell.setAttribute("id", base + i);
        newRow.appendChild(cell);
    }

    table.appendChild(newRow);

}

function getWords(){
    // Create a new XMLHttpRequest object
    const xhr = new XMLHttpRequest();

    // Set the URL of the file containing the list of words
    const url = 'https://raw.githubusercontent.com/dwyl/english-words/master/words.txt';

    // Open a connection to the URL
    xhr.open('GET', url, true);

    // When the connection is opened, send the request
    xhr.onload = function() {
    // If the response status is OK (200)
    if (xhr.status === 200) {
            // Split the response into an array of words
            const words = xhr.responseText.split('\n');
            
            // Filter the words to only include those that are 5 letters long
            fiveLetterWords = words.filter(word => word.length === 5);
            
        }
    };

    // Send the request
    xhr.send();

}

function colourBoxes(num, colour){

}

getGuess();
