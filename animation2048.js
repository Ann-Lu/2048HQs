function showNumberAnimation(i, j, randNumber) {
    var numberCell = $("#number-cell-" + i + '-' + j);
    numberCell.css("background-color", getBackgroundColor(randNumber));
    numberCell.css("color", getNumberColor(randNumber));
    numberCell.text(randNumber);

    numberCell.animate({
        width: "100px",
        height: "100px",
        top: getPosTop(i),
        left: getPosLeft(j)
    }, 50);
}

function showMoveAnimation(fromX, fromY, toX, toY) {

    var numberCell = $("#number-cell-" + fromX + '-' + fromY);
    numberCell.animate({
        top: getPosTop(toX),
        left: getPosLeft(toY)
    }, 200);

}

function changeScore(score) {
    $('#score').text(score);
}