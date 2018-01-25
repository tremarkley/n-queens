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

window.rooksSolutions = 0;

window.copyNestedArray = function(arr) {
  return arr.map(function(val) {
    return val.slice();
  });
};

window.findNRooksSolution = function(n) {
  rooksSolutions = 0;
  var solution = new Board({'n': n}); //fixme
  //var board = new Board({n: n});
  // console.log('board-n: ', board.get('n'));
  // console.log(`boardrows ${board.rows()}`);
  
  
  var innerFunction = function(boardRows, startingRow, startingColumn) {
    var foundSolution = false;
    var originalBoard = new Board(boardRows);
    /*var originalBoardRows = originalBoard.rows().map(function(val) {
      return val.slice();
    });*/
    var originalBoardRows = copyNestedArray(boardRows);
    
    for (var i = startingRow; i < originalBoard.get('n'); i++) {
      //var rooks = originalBoard.numPieces();
      if (!foundSolution) {
        for (var j = startingColumn; j < originalBoard.get('n'); j++) {
          //create a new board here because we want to be starting from the original
          //board each time
          var board = new Board(copyNestedArray(originalBoardRows));
          board.togglePiece(i, j);
          if (!board.hasAnyRooksConflicts()) {
            //rooks++;
            //check how many pieces are on board, if piece == n we return board
            if (board.numPieces() === n) {
              solution = board;
              foundSolution = true;
              rooksSolutions++;
              
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
            //if piece is at edge move to next available slot
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
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  findNRooksSolution(n);
  var solutionCount = rooksSolutions;
  console.log('solution count ' + solutionCount);
  

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
