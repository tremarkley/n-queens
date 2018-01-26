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

window.findNRooksSolutionElse = function(n) {
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
      
      if (!foundSolution) {
        for (var j = startingColumn; j < originalBoard.get('n'); j++) {
          //create a new board here because we want to be starting from the original
          //board each time
          var board = new Board(copyNestedArray(originalBoardRows));
          board.togglePiece(i, j);
          //if (rowConflict) then i + 1
          if (!board.hasRowConflictAt(i) && !board.hasColConflictAt(j)) {
            //rooks++;
            //check how many pieces are on board, if piece == n we return board
            if (board.get('pieces') === n) {
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
window.findNRooksSolution = function(n) {
  window.rooksSolutions = 0;
  var solution = new Board({n: n});
  
  var innerFunction = function(boardRows, startingRow, startingCol) {
    var foundSolution = false;
    var origBoard = new Board(boardRows);
    //Need original copy of rows
    var copiedBoardRows = copyNestedArray(boardRows);
    while (!foundSolution && origBoard._isInBounds(startingRow, startingCol)) {
      //
      var newBoard = new Board(copyNestedArray(copiedBoardRows));
      newBoard.togglePiece(startingRow, startingCol);
      
      if (newBoard.get('pieces') === n) {
        foundSolution = true;
        rooksSolutions++;
        solution = newBoard;
      } else {
        var nextStartingRow = startingRow + 1;
        //startingRow = nextStartingRow;
        var nextStartingColumn = 0;
        var hasColConflict = true;
        while (hasColConflict) {
          if (newBoard.hasPieceInCol(nextStartingColumn)) {
            nextStartingColumn++;
            if (nextStartingColumn >= newBoard.get('n')) {
            //were unable to find a valid column
              return;
            }
          } else {
            hasColConflict = false;
          }
        }
        if (origBoard._isInBounds(nextStartingRow, nextStartingColumn)) {
          innerFunction(newBoard.rows(), nextStartingRow, nextStartingColumn);
        }
        if (startingCol === newBoard.get('n') - 1) {
          // startingCol = 0;
          // while (newBoard.hasPieceInCol(startingCol) && startingCol < origBoard.get('n') - 1 ) {
          //   startingCol++; 
          // }
          //startingRow++;
          startingRow++;
          startingCol = 0;
          while (newBoard.hasPieceInCol(startingCol)) {
            if (startingCol === origBoard.get('n') - 1) {
              return;
            }
            startingCol++;
          }
        } else {
          while (newBoard.hasPieceInCol(startingCol)) {
            startingCol++;
            if (startingCol === origBoard.get('n')) {
              startingRow++;
              startingCol = 0;
              while (newBoard.hasPieceInCol(startingCol)) {
                if (startingCol === origBoard.get('n') - 1) {
                  return;
                }
                startingCol++;
              }
            } 
          }
        }
      }
    }
  };
  innerFunction(solution.rows(), 0, 0);
  return solution.rows();

};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  findNRooksSolution(n);

  var solutionCount = window.rooksSolutions;
  console.log('solution count ' + solutionCount);
  

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  // debugger
  var foundSolution = false;
  var solution = new Board({ n: n });
  if (n === 2 || n === 3 || n === 0) {
    return solution.rows();
  }
  //starting column, starting row;
  //For each board
  //first thing check to see if @ row x, col y there is a conflict
  ///return immediately, don't continue
  /// 
  
  var traverseBoard = function(board, row, col) {
    if (board.hasAnyConflicts(row, col)) {
      board.togglePiece(row, col);
      return;
    }
    if (board.get('pieces') === n) {
      solution = board;
      foundSolution = true;
      //board.togglePiece(row, col);
      return;
    } else {
      var hasTraversed = false;
      for (var i = row; i < n; i++) {
        for (var j = 0; j < n; j++) {
          if (!foundSolution) {
            if (!hasTraversed) {
              j = col;
              hasTraversed = true;
            } else {
              board.togglePiece(i, j);
              traverseBoard(board, i, j);
            }
          } else {
            break;
          }
        }
      }
      board.togglePiece(row, col);
    }
  };
  solution.togglePiece(0, 0);
  traverseBoard(solution, 0, 0);
  
  
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
