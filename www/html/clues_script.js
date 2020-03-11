// Clues

function showNextClue(treasureIndex) {

    if ((clues[treasureIndex - 1][activeClue + 1]) &&
        (clues[treasureIndex - 1][activeClue + 1].length > 0)) {
        addScore(-1);

        var clueSection = document.getElementById("showClue-" + treasureIndex);
        console.log("Showing next clue " + treasureIndex);
        newElement = '<div>' + clues[treasureIndex - 1][activeClue + 1] + '</div>';
        clueSection.innerHTML += newElement;

        activeClue++;
    }
}