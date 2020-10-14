function getPosTop(i) {
    return 20 + 120 * i;
}

function getPosLeft(j) {
    return 20 + 120 * j;
}

function getBackgroundColor(number) {
    switch (number) { //根据数字返回不同的颜色
        case 2:
            return "#eee4da";
            break;
        case 4:
            return "#ede0c8";
            break;
        case 8:
            return "#CC6036";
            break;
        case 16:
            return "#CC6600";
            break;
        case 32:
            return "#f67c5f";
            break;
        case 64:
            return "#f65e3b";
            break;
        case 128:
            return "#edcf72";
            break;
        case 256:
            return "#edcc61";
            break;
        case 512:
            return "#9c0";
            break;
        case 1024:
            return "#33b5e5";
            break;
        case 2048:
            return "#09c";
            break;
    }
    return "black";
}

function getNumberColor(number) {
    if (number <= 4)
        return "#CC6633";

    return "white";
}

function noSpace(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++)
            if (board[i][j] == 0)
                return false;
    }
    return true;
}

//判断是否能左移
function canMoveLeft(board) {

    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            //左边是否没有数字
            //与左边数字是否相等
            if (board[i][j] != 0) {
                if (board[i][j - 1] == 0 || board[i][j] == board[i][j - 1])
                    return true;
            }
        }
    }
    return false;
}

//移动路径无障碍
function noBarrierX(i, col1, col2, board) {
    // while (k + 1 < j) {
    //     if (board[i][k + 1] == 0)  
    //     k++;
    // }
    // return true;
    for (var y = col1 + 1; y < col2; y++) {
        if (board[i][y] != 0)
            return false;
    }
    return true;
}

function canMoveRight() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 3; j++) {

            if (board[i][j] != 0) {
                if (board[i][j + 1] == 0 || board[i][j] == board[i][j + 1])
                    return true;
            }
        }
    }
    return false;
}

function canMoveUp() {
    for (var j = 0; j < 4; j++)
        for (var i = 1; i < 4; i++) {
            if (board[i][j] != 0) {
                if (board[i - 1][j] == 0 || board[i - 1][j] == board[i][j])
                    return true;
            }

        }
    return false
}

function noBarrierY(row1, row2, j, board) {
    for (var x = row1 + 1; x < row2; x++) {
        if (board[x][j] != 0)
            return false;
    }
    return true;
}

function canMoveDown() {
    for (var j = 0; j < 4; j++)
        for (var i = 0; i < 3; i++) {
            if (board[i][j] != 0) {
                if (board[i + 1][j] == 0 || board[i + 1][j] == board[i][j])
                    return true;
            }

        }
    return false
}

function noMove(board) {
    if (canMoveLeft(board) ||
        canMoveRight(board) ||
        canMoveUp(board) ||
        canMoveDown(board))
        return false;

    return true;
}