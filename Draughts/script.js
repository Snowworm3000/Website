let board = []
createBoard()
function createBoard(){ //Create array with 8 subarrays containing all 0s representing the board
    board = []
    for(let i = 0; i< 8; i++){
        board.push([])
        for(let j = 0; j< 8; j++){
            if(j %2 - (i%2) == 0 && (i<3 || i>4)){
                if(i<3){
                    board[i].push(1)
                }else{
                    board[i].push(2)
                }
            }else{
                board[i].push(0)
            }
        }
    }
}

printBoard(board)
function printBoard(board){ //Prints the board to console for debuging
    for(let i of board){
        console.log(i)
    }
}

function getPossiblePieces(currentPiece){
    if(currentPlayer == 1){
        return [1,3]
    }else{
        return [2,4]
    }
}


let selected = false
let moveSelected
let selectedPiece

let currentPlayer = 2
function input(x,y){
    let selectedColour = board[y][x]
    let currentPossiblePiece = getPossiblePieces(currentPlayer)
    if(currentPossiblePiece.includes(selectedColour) || selectedColour == 0){
        if(board[y][x] != 0){ // check if selected is a piece
            selectedPiece = {x:x,y:y}
            selected = true
            console.log("piece selected")
        }else if(selected){ // move selected piece
            movePiece(selectedPiece,{x:x,y:y})
            selected = false
            console.log("piece moved",board[y][x])
        }
        drawGridC()
    }
}


function checkInRange(from,to,range){ // check if two values of x and y are in range of the range value
    let result;
    for(let i=-range;i<=range;i++){
        for(let j=-range;j<=range;j++){
            if((Math.abs(j) == range || Math.abs(i) == range) == false){
                console.log(j,i,range,"break")
                continue
            }
            console.log(i,j)
            result = from.x + i == to.x && from.y + j == to.y
            if(result){
                return true
            }
        }
    }
    return false
}

function mean(val1,val2){ // return the mean of two values
    return (val1 + val2) / 2;
} 

function rightDirection(locationFrom,locationTo){
    let player = board[locationFrom.y][locationFrom.x]; // get the piece number
    if(player == 1){
        if(locationFrom.y < locationTo.y){ // check if move is forwards
            return true
        }
    }else if(player == 2){
        if(locationFrom.y > locationTo.y){ // check if move is forwards
            return true
        }
    }else{
        return true
    }
    return false
}

function isOppositePiece(currentPiece,oppositePiece){
    let piece;
    if(currentPiece == 1 || currentPiece == 3){
        piece = [1,3]
    }else{
        piece = [2,4]
    }
    return piece.includes(oppositePiece) == false
}

function isValidMove(locationFrom,locationTo){
    if(rightDirection(locationFrom,locationTo)){ // check if the piece is going in the correct direction
        if(checkInRange(locationFrom,locationTo,1)){ // if location is in range of 1, so a normal non capture jump
            if(board[locationTo.y][locationTo.x] == 0){
                if(locationFrom.x != locationTo.x){
                    return 1
                }
            }
        }else if(checkInRange(locationFrom,locationTo,2)){ // if location is in range of 2, so a capture move
            if(board[locationTo.y][locationTo.x] == 0){
                if(Math.abs(locationFrom.x-locationTo.x) == 2 && Math.abs(locationFrom.y-locationTo.y) == 2){
                    let middle = [mean(locationFrom.x,locationTo.x),mean(locationFrom.y,locationTo.y)]
                    console.log(middle," middle ertety")
                    console.log(middle,board[middle[1]][middle[0]]," middle")
                    let middlePiece = board[middle[1]][middle[0]]
                    let currentPiece = board[locationFrom.y][locationFrom.x]
                    if(isOppositePiece(currentPiece,middlePiece)&&middlePiece!=0){ // check if the middle piece is the opposite piece to the current piece
                        console.log("possible capture")
                        board[middle[1]][middle[0]] = 0; // capture piece
                        return 2
                    }
                    console.log("impossible capture",currentPiece,[2,1][currentPiece-1],middlePiece)
                }
            }
        }
    }
    
    return false
}

function checkWin(board){
    let pieceCounter = [0,0,0,0]
    for(let y = 0;y<8;y++){
        for(let piece = 1;piece<=4;piece++){
            if(board[y].includes(piece)){
                pieceCounter[piece-1]++
            }
            console.log(y,piece,board[y].includes(piece))
        }
    }
    if(pieceCounter[0]+pieceCounter[2]==0){
        console.log("2 win")
    }else if(pieceCounter[1]+pieceCounter[3]==0){
        console.log("1 win")
    }
}


function movePiece(locationFrom,locationTo){
    let validMove = isValidMove(locationFrom,locationTo)
    console.log(isValidMove(locationFrom,locationTo), " valid move")
    if(validMove){
        let counter = board[locationFrom.y][locationFrom.x]
        board[locationFrom.y][locationFrom.x] = 0
        if((counter == 1 && locationTo.y == 7) || (counter == 2 && locationTo.y == 0)){
            board[locationTo.y][locationTo.x] = [3,4][counter-1]
        }else{
            board[locationTo.y][locationTo.x] = counter
        }
        if(validMove == 1){ // change player if the move was not a capture
            currentPlayer = (currentPlayer%2)+1
        }
    }
}



function getCursorPosition(canvas, event) {
    /*
    if(playing == false){
        restartGame()
        return
    }
    */
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    let width = windowSize /boardS

    function getLocation(co){
        for(let i=boardS;i>=0;i--){
            if(co>= width *i){
                return i
            }
        }
        return 0;
    }

    let xSet = getLocation(x);
    let ySet = getLocation(y);
    input(xSet,ySet)
}