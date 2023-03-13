const btn = document.getElementById("btn");
let textboxValue = "";
let base = 1;
let tries = 0;
let fiveLetterWords = [];
let actualWord = "";

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

    console.log(fiveLetterWords)
    let randomIndex = Math.floor(Math.random() * fiveLetterWords.length);
    actualWord = fiveLetterWords[randomIndex];
    console.log(`Random word: ${actualWord}`)

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

    if (!(fiveLetterWords.includes(textboxValue))){
        alert("Must be valid five letter word ! ")
        return false 
    }

    for (let i = 0; i < 5; i++){
        if (actualWord.charAt(i) === textboxValue.charAt(i)){
            colourBoxes(base + i, 'greenyellow')
        }
        else if (actualWord.includes(textboxValue[i])){
            colourBoxes(base + i, 'yellow')
        }
        else{
            continue
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
    fetch('https://raw.githubusercontent.com/dwyl/english-words/master/words.txt')
    .then(response => response.text())
    .then(words => {
        fiveLetterWords = words.split('\n').filter(word => word.length === 5).map(word => word.toUpperCase());
        getActual();

    })
    .catch(error => console.error(error));

}

function colourBoxes(num, colour){
    document.getElementById(num.toString()).style.backgroundColor = colour
}

getWords();
getGuess();
