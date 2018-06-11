// evaluates piece values depending on where the board is
var piecevalueWhite = function(piecetype, x, y)
{
  // console.log("ply in piecevalue");
  if(piecetype === 'p')
  {
     return pawnEvalWhite[x][y];
  }
  else if (piecetype === 'n')
  {
     return knightEvalWhite[x][y];
  }
  else if(piecetype === 'b')
  {
    return bishopEvalWhite[x][y];
  }
  else if(piecetype === 'r')
  {
    return rookEvalWhite[x][y];
  }
  else if(piecetype === 'q')
  {
    return evalQueenWhite[x][y];
  }
  else if(piecetype === 'k')
  {
    if(ply <= 25)
    {
      return kingEvalWhite[x][y];
    }
    return kingevalWhiteLATE[x][y];
  }
}

var piecevalueBlack = function(piecetype, x, y)
{
  // console.log("ply in piecevalue");
  if(piecetype === 'p')
  {
     return pawnEvalBlack[x][y];
  }
  else if (piecetype === 'n')
  {
     return knightEvalBlack[x][y];
  }
  else if(piecetype === 'b')
  {
    return bishopEvalBlack[x][y];
  }
  else if(piecetype === 'r')
  {
    return rookEvalBlack[x][y];
  }
  else if(piecetype === 'q')
  {
    return queenEvalBlack[x][y];
  }
  else if(piecetype === 'k')
  {
    
    if(ply <= 25)
    {
      return kingEvalBlack[x][y];
    }
    return kingevalBlackLATE[x][y];
  }
}
var evaluateBoard = function(board, color) {
  // Sets the value for each piece using standard piece value

  if(game.in_check())
  {
    return -10000;
  }
  var pieceValue = {
    'p': 100,
    'n': 350,
    'b': 350,
    'r': 525,
    'q': 1000,
    'k': 10000
  };


  // Loop through all pieces on the board and sum up total
  
  var value = 0;
  var r = 0;
  var c = 0;
  board.forEach(function(row) {
    row.forEach(function(piece) {
      if (piece) {
        // Subtract piece value if it is opponent's piece
        value += pieceValue[piece['type']]  * (piece['color'] === color ? 1 : -1);
        // console.log(piece['type'] + " " + r + " " + c);
        if(piece['color'] === 'w')
        {
          value += piecevalueWhite(piece['type'], r, c);
        }
        else
        {
          value += piecevalueBlack(piece['type'], r, c);
        }
      }
      c++;
    });
    r++;
    c = 0;
  });

  
  return value;
};

// reverse array to have black's perspective
var reverseArray = function(array) {
  return array.slice().reverse();
};

// boards that makes position relevant for board evaluation
var pawnEvalWhite =
  [
      [0,  0,  0,  0,  0,  0,  0,  0],
      [50,  50,  50,  50,  50,  50,  50,  50],
      [10,  10,  20,  30,  30,  20,  10,  10],
      [5,  5,  10,  25,  25,  10,  05,  5],
      [0,  0,  0,  20,  20,  0,  0,  0],
      [5, -5, -10,  0,  0, -10, -5,  5],
      [5,  10, 10,  -20, -20,  10,  10,  5],
      [0,  0,  0,  0,  0,  0,  0,  0]
  ];

  
var knightEvalWhite =
[
    [-50, -40, -30, -30, -30, -30, -40, -50],
    [-40, -20,  0,  0,  0,  0, -20, -40],
    [-30,  0,  10,  15,  15,  10,  0, -30],
    [-30,  5,  15,  20,  20,  15,  5, -30],
    [-30,  0,  15,  20,  20,  15,  0, -30],
    [-30,  5,  10,  15,  15,  10,  5, -30],
    [-40, -20,  0,  5,  5,  0, -20, -40],
    [-50, -40, -30, -30, -30, -30, -40, -50]
];

var bishopEvalWhite = [
  [-20,-10,-10,-10,-10,-10,-10,-20],
  [-10,  0,  0,  0,  0,  0,  0,-10],
  [-10,  0,  5, 10, 10,  5,  0,-10],
  [-10,  5,  5, 10, 10,  5,  5,-10],
  [-10,  0, 10, 10, 10, 10,  0,-10],
  [-10, 10, 10, 10, 10, 10, 10,-10],
  [-10,  5,  0,  0,  0,  0,  5,-10],
  [-20,-10,-10,-10,-10,-10,-10,-20]
];

var rookEvalWhite = [
  [  0,  0,  0,  0,  0,  0,  0,  0],
  [5, 10, 10, 10, 10, 10, 10,  5],
  [ -5,  0,  0,  0,  0,  0,  0, -5],
  [ -5,  0,  0,  0,  0,  0,  0, -5],
  [ -5,  0,  0,  0,  0,  0,  0, -5],
  [ -5,  0,  0,  0,  0,  0,  0, -5],
  [ -5,  0,  0,  0,  0,  0,  0, -5],
  [  0,   0, 0,  5,  5,  0,  0,  0]
];

var evalQueenWhite = [
  [ -20, -10, -10, -5, -5, -10, -10, 20],
  [ -10,   0,  0,  0,  0,  0,  0, -10],
  [ -10,  0,  5,  5,  5,  5,  0, -10],
  [ -5,  0,  5,  5,  5,  5,  0, -5],
  [   0,  0,  5,  5,  5,  5,  0, -5],
  [ -10,  5,  5,  5,  5,  5,  0, -10],
  [ -10,  0,  5,  0,  0,  0,  0, -10],
  [ -20, -10, -10, -5, -5, -10, -10, 20]
];

var kingEvalWhite = [

  [ -30, -40, -40, -50, -50, -40, -40, -30],
  [ -30, -40, -40, -50, -50, -40, -40, -30],
  [ -30, -40, -40, -50, -50, -40, -40, -30],
  [ -30, -40, -40, -50, -50, -40, -40, -30],
  [ -20, -30, -30, -40, -40, -30, -30, -20],
  [ -10, -20, -20, -20, -20, -20, -20, -10],
  [  20,  20,  0,  0,  0,  0,  20,  20 ],
  [  20,  30,  10,  0,  0,  10,  30,  20 ]
];

var kingevalWhiteLATE = [
  [-50,-40,-30,-20,-20,-30,-40,-50],
  [-30,-20,-10,  0,  0,-10,-20,-30],
  [-30,-10, 20, 30, 30, 20,-10,-30],
  [-30,-10, 30, 40, 40, 30,-10,-30],
  [-30,-10, 30, 40, 40, 30,-10,-30],
  [-30,-10, 20, 30, 30, 20,-10,-30],
  [-30,-30,  0,  0,  0,  0,-30,-30],
  [-50,-30,-30,-30,-30,-30,-30,-50]
];

// board from black's perspective
var pawnEvalBlack = reverseArray(pawnEvalWhite);
var bishopEvalBlack = reverseArray(bishopEvalWhite);
var rookEvalBlack = reverseArray(rookEvalWhite);
var kingEvalBlack = reverseArray(kingEvalWhite);
var knightEvalBlack = reverseArray(knightEvalWhite);
var queenEvalBlack = reverseArray(evalQueenWhite);
var kingevalBlackLATE = reverseArray(kingevalWhiteLATE);

// generates noisy moves
var generateNoisyMoves = function(moves)
{
  var noisy = [];
  var j = 0;
  for(var i = 0; i < moves.length; i++)
  {
    if(moves[i].flags = 'n')
    {
      noisy[j] = moves[i];
      j++;
    }
  }
  return noisy;
}


var calcBestMove = function(depth, game, playerColor,
                            alpha=Number.NEGATIVE_INFINITY,
                            beta=Number.POSITIVE_INFINITY,
                            isMaximizingPlayer=true) {
  // Base case: evaluate board
    if (depth === 0)
    {
        var noisyMoves = generateNoisyMoves(game.moves());
        if(noisyMoves.length !==0)
        {
          var value = qSearch(2, game, playerColor)[0];
          return [value, null];
        }
        else 
        {
          value = evaluateBoard(game.board(), playerColor);
          return [value, null];
        }
    }
   
  // Recursive case: search possible moves
  var bestMove = null; // best move not set yet
  var possibleMoves = game.moves();
  // Set random order for possible moves
  possibleMoves.sort(function(a, b){return 0.5 - Math.random()});
  // Set a default best move value
  var bestMoveValue = isMaximizingPlayer ? Number.NEGATIVE_INFINITY
                                         : Number.POSITIVE_INFINITY;
  // Search through all possible moves
  for (var i = 0; i < possibleMoves.length; i++) {
    var move = possibleMoves[i];
    // Make the move, but undo before exiting loop
    game.move(move);
    // Recursively get the value from this move
    value = calcBestMove(depth-1, game, playerColor, alpha, beta, !isMaximizingPlayer)[0];
    // Log the value of this move
    console.log(isMaximizingPlayer ? 'Max: ' : 'Min: ', depth, move, value, bestMove, bestMoveValue);

    if (isMaximizingPlayer) {
      // Look for moves that maximize position
      if (value > bestMoveValue) {
        bestMoveValue = value;
        bestMove = move;
      }
      alpha = Math.max(alpha, value);
    } else {
      // Look for moves that minimize position
      if (value < bestMoveValue) {
        bestMoveValue = value;
        bestMove = move;
      }
      beta = Math.min(beta, value);
    }
    // Undo previous move
    game.undo();
    // Check for alpha beta pruning
    if (beta <= alpha) {
      console.log('Prune', alpha, beta);
      break;
    }
  }
  // Log the best move at the current depth
  console.log('Depth: ' + depth + ' | Best Move: ' + bestMove + ' | ' + bestMoveValue + ' | A: ' + alpha + ' | B: ' + beta);
  // Return the best move, or the only move
  return [bestMoveValue, bestMove || possibleMoves[0]];
}

// Quiescence Search
var qSearch = function(depth, game, playerColor,
                        alpha=Number.NEGATIVE_INFINITY,
                        beta=Number.POSITIVE_INFINITY,
                        isMaximizingPlayer=true)
{
  // if lower enough depth reached, return value
  // typically this deepness should be less than the depth for the calcbestmove
  if(depth === 0)
  {
    var points = evaluateBoard(game.board(), playerColor);
    return [points, null];
  }
  var bestMove = null;
  var noisymoves = generateNoisyMoves(game.moves());
  var bestMoveValue = isMaximizingPlayer ? Number.NEGATIVE_INFINITY
                                         : Number.POSITIVE_INFINITY;

  for (let i = 0; i < noisymoves.length; i++) {
    console.log("Here is i " + i);
    const element = noisymoves[i];
    game.move(element);
    var score = qSearch(depth - 1, game, playerColor, alpha, beta, !isMaximizingPlayer)[0];
    game.undo();

    if (isMaximizingPlayer) {
      // Look for moves that maximize position
      if (score > bestMoveValue) {
        bestMoveValue = score;
        bestMove = element;
      }
      alpha = Math.max(alpha, score);
    } else {
      // Look for moves that minimize position
      if (score < bestMoveValue) {
        bestMoveValue = score;
        bestMove = element;
      }
      beta = Math.min(beta, score);
    }

    if (beta <= alpha) {
      console.log('Prune', alpha, beta);
      break;
    }
  }

  return [bestMoveValue, bestMove];
    
  
}
