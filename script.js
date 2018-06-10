
var board, game = new Chess();
// AI part here
var ply = 0;
var makeMove = function (skill = 3) {
    var move = calcBestMove(skill, game, game.turn())[1];
    game.move(move);
    board.position(game.fen());
    ply++;
    // console.log("Here is the PLYYY: " + ply);
    if (game.game_over()) {
        endScreen();
    }
}

// computer vs computer

var playGame = function()
{
    if(game.game_over() === true)
    {
        console.log("gameover");
        return;
    }
    makeMove(3);
    window.setTimeout(function() {playGame();}, 250);
}

// Setup everything for the board
var onDrop = function (source,  target) {
    var move = game.move({
    from: source,
    to: target,
    promotion: 'q' // NOTE: always promote to a queen for example simplicity
  });

  // If illegal move, snapback
  if (move === null) return 'snapback';

  // Log the move
  console.log(move)

  // make move for black
  window.setTimeout(function() {
    makeMove(4, 3);
}, 250);
}

var onSnapEnd = function () {
    board.position(game.fen());
}

var endScreen = function () {
    if (game.in_checkmate()) {
        alert("Checkmate!");
    } else if (game.in_stalemate()){
        alert("Stalemate");
    } else if (game.in_draw()) {
        alert("Draw by insufficient material");
    } else if (game.in_threefold_repetition()) {
        alert("Draw by threefold repetition");
    }
}

// Create the board
var config = {
    draggable: true,
    dropOffBoard: 'snapback',
    position: 'start',
    onDrop: onDrop,
    onSnapEnd: onSnapEnd
};
board = ChessBoard('board', config);



// Actions after any move
var onMoveEnd = function(oldPos, newPos) {
  // Alert if game is over
  if (game.game_over() === true) {
    alert('Game Over');
    console.log('Game Over');
  }

  // Log the current game position
  console.log(game.fen());
};

// Check before pick pieces that it is white and game is not over
var onDragStart = function(source, piece, position, orientation) {
  if (game.game_over() === true || piece.search(/^b/) !== -1) {
    return false;
  }
};

// this call starts comp vs comp
playGame();