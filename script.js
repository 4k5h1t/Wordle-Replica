const btn = document.getElementById("btn");
let textboxValue = ""
base = 1
tries = 0

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

function colourBoxes(){

}

getGuess();
