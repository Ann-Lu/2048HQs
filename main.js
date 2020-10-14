var board = new Array();
var score = 0;
var haveBeef = new Array();

$(document).ready(function () {
    restart();
});

function restart() {
    //初始化棋盘格
    init();
    //在随机两个格子生成数字
    generateOneNumber();
    generateOneNumber();
}

function init() {
    //底层UI:根据grid-cell（i，j）放置16个格子
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++) {

            var gridCell = $('#grid-cell-' + i + "-" + j);
            gridCell.css('top', getPosTop(i));
            gridCell.css('left', getPosLeft(j));
        }
    //把board变成二维数组，遍历每个小格，初始化为0
    for (var i = 0; i < 4; i++) {
        board[i] = new Array();
        haveBeef[i] = new Array();
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0;
            haveBeef[i][j] = false;

        }
    }

    updateBoardView(); //更新底层数据在界面上的显示
    score = 0;
}
//每次开始新游戏和产生移动操作时，根据board数据更新上层显示
function updateBoardView() {

    $(".number-cell").remove();
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++) {
            //对于每个底层格子，添加隐藏的数字格元素
            $("#container").append('<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>');
            //对单个数字格添加显示样式
            var theNumberCell = $('#number-cell-' + i + '-' + j);
            //如果底层数据为0，则数字格在底层格子中间，大小为0（以便后面使用显示动画）
            if (board[i][j] == 0) {
                theNumberCell.css('width', '0px');
                theNumberCell.css('height', '0px');
                theNumberCell.css('top', getPosTop(i) + 50);
                theNumberCell.css('left', getPosLeft(j) + 50);
            }
            //如果底层数据不为零，根据board值显示对应的样式
            else {
                theNumberCell.css('width', '100px');
                theNumberCell.css('height', '100px');
                theNumberCell.css('top', getPosTop(i));
                theNumberCell.css('left', getPosLeft(j));
                theNumberCell.css('background-color', getBackgroundColor(board[i][j]));
                theNumberCell.css('color', getNumberColor(board[i][j]));
                theNumberCell.text(board[i][j]);
            }
            haveBeef[i][j] = false;

        }
}

function generateOneNumber() {
    //判断是否有空位
    if (noSpace(board))
        return false;

    //随机一个位置
    var randx = parseInt(Math.floor(Math.random() * 4));
    var randy = parseInt(Math.floor(Math.random() * 4));
    //死循环判断随机位置上是否有占位
    //有空位时跳出循环
    while (true) {
        if (board[randx][randy] == 0)
            break;

        randx = parseInt(Math.floor(Math.random() * 4));
        randy = parseInt(Math.floor(Math.random() * 4));
    }

    //随机一个数字，利用随机数（0，1）判断语句随机产生50%的2，4
    var randNumber = Math.random() < 0.5 ? 2 : 4;

    //在随机位置显示随机数字
    board[randx][randy] = randNumber;
    showNumberAnimation(randx, randy, randNumber);

    return true;
}
//游戏交互
$(document).keydown(function (event) {
    switch (event.keyCode) {
        case 37: //left
            if (moveLeft()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isGameOver()", 300);
            }
            break;
        case 38: //up
            if (moveUp()) {
                setTimeout("generateOneNumber()", 210);

                setTimeout("isGameOver()", 300);


            }
            break;
        case 39: //right
            if (moveRight()) {
                setTimeout("generateOneNumber()", 210);

                setTimeout("isGameOver()", 300);


            }
            break;
        case 40: //down
            if (moveDown()) {
                setTimeout("generateOneNumber()", 210);

                setTimeout("isGameOver()", 300);


            }
            break;
        default: //其他值不响应
            break;
    }
});



function moveLeft() {

    if (!canMoveLeft(board))
        return false;

    //对每个数字的左侧位置进行判断，看是否可以落脚：移动几个或者是否叠加
    for (var i = 0; i < 4; i++)
        for (var j = 1; j < 4; j++) {
            if (board[i][j] != 0) {

                for (var k = 0; k < j; k++) {
                    //落脚位置为空，移动路径没有障碍
                    if (board[i][k] == 0 && noBarrierX(i, k, j, board)) {
                        //move
                        showMoveAnimation(i, k, j);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    //与落脚位置数字相等，移动路径没有障碍 ,且没有发生合并
                    else if (board[i][k] == board[i][j] && noBarrierX(i, k, j, board) && !haveBeef[i][k]) {
                        //move
                        showMoveAnimation(i, k, j);
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        score += board[i][k];
                        changeScore(score);
                        //发生过合并
                        haveBeef[i][k] = true;

                        continue;
                    }
                }
            }
        }

    setTimeout("updateBoardView()", 200);
    return true;
}

function moveRight() {

    if (!canMoveRight(board))
        return false;

    for (var i = 0; i < 4; i++)
        for (var j = 2; j >= 0; j--) {
            if (board[i][j] != 0) {

                for (var k = 3; k > j; k--) {
                    //落脚位置为空，移动路径没有障碍
                    if (board[i][k] == 0 && noBarrierX(i, j, k, board)) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    //与落脚位置数字相等，移动路径没有障碍 
                    else if (board[i][k] == board[i][j] && noBarrierX(i, j, k, board) && !haveBeef[i][k]) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        score += board[i][k];
                        changeScore(score);
                        haveBeef[i][k] = true;

                        continue;
                    }
                }
            }
        }

    setTimeout("updateBoardView()", 200);
    return true;
}


function moveUp() {

    if (!canMoveUp(board))
        return false;

    for (var j = 0; j < 4; j++)
        for (var i = 1; i < 4; i++) {
            if (board[i][j] != 0) {

                for (var k = 0; k < i; k++) {
                    //落脚位置为空，移动路径没有障碍
                    if (board[k][j] == 0 && noBarrierY(i, k, j, board)) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    //与落脚位置数字相等，移动路径没有障碍 
                    else if (board[k][j] == board[i][j] && noBarrierY(i, k, j, board) && !haveBeef[k][j]) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        score += board[k][j];
                        changeScore(score);
                        haveBeef[k][j] = true;
                        continue;
                    }
                }
            }
        }

    setTimeout("updateBoardView()", 200);
    return true;
}

function moveDown() {

    if (!canMoveDown(board))
        return false;

    else {
        for (var j = 0; j < 4; j++)
            for (var i = 2; i >= 0; i--) {
                if (board[i][j] !== 0) {
                    for (var k = 3; k > i; k--)
                        if (board[k][j] == 0 && noBarrierY(i, k, j, board)) {
                            showMoveAnimation(i, j, i, k);
                            board[k][j] = board[i][j];
                            board[i][j] = 0;
                            continue;
                        }
                    else if (board[k][j] == board[i][j] && noBarrierY(i, k, j, board) && !haveBeef[k][j]) {
                        showMoveAnimation(i, j, i, k);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        score += board[k][j];
                        changeScore(score);
                        haveBeef[k][j] = true;

                        continue;
                    }

                }
            }
    }
    setTimeout("updateBoardView()", 200);
    return true;
}

function isGameOver() {
    if (noSpace(board) && noMove(board)) {
        gameOver();
    }
}

function gameOver() {
    alert('Game Over!');
}