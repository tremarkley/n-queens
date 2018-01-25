/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  
  var solution = new Board({'n': n}); //fixme
  //var board = new Board({n: n});
  // console.log('board-n: ', board.get('n'));
  // console.log(`boardrows ${board.rows()}`);
  var rooks = 0;
  var foundSolution = false;
  var innerFunction = function(boardRows, startingRow, startingColumn) {
  var boardRows = boardRows.slice();
    var board = new Board(boardRows);
    for (var i = startingRow; i < board.get('n'); i++) {
      if (!foundSolution) {
        for (var j = startingColumn; j < board.get('n'); j++) {
          //create a new board here because we want to be starting from the original
          //board each time
          board = new Board(boardRows);
          board.togglePiece(i, j);
          if (!board.hasAnyRooksConflicts()) {
            rooks++;
            //check how many pieces are on board, if piece = n we return board
            if (rooks === n) {
              solution = board;
              foundSolution = true;
              break;
            }
            //pass in next available slot and the same board
            if ((j === board.get('n') - 1) && (i < board.get('n') - 1)) {
              innerFunction(board.rows(), i + 1, 0);
            } else if (j === board.get('n') - 1 && i === board.get('n') - 1) {
              return;
            } else {
              innerFunction(board.rows(), i, j + 1);
            }         
            
          } else {
            //if there is a conflict untoggle piece
            board.togglePiece(i, j);
            if ((j === board.get('n') - 1) && (i < board.get('n') - 1)) {
              startingColumn = 0;
            }
          }
        }
      } else {
        break;
      }
    }
  };
  innerFunction(solution.rows(), 0, 0);
  debugger

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
    
  
  
  
  
  
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
