class Gridball {
  constructor() {
    this.positions = {
      vertical: Array(32).fill('empty').map(() => Array(40).fill('empty')),
      horizontal: Array(32).fill('empty').map(() => Array(40).fill('empty')),
      diagonal: Array(32).fill('empty').map(() => Array(40).fill('empty')),
      crossLinesDot: Array(32).fill('empty').map(() => Array(40).fill('empty')),
    };
    this.positions.crossLinesDot[16][20] = 'ball';
    this.currentPlayer = 'playerA';
  }

  isValidMove(start, end, direction, steps) {
    if (start[0] < 0 || start[0] >= 32 || start[1] < 0 || start[1] >= 40 ||
        end[0] < 0 || end[0] >= 32 || end[1] < 0 || end[1] >= 40) {
      return false;
    }
    for (let i = 0; i < steps; i++) {
      if (this.positions[direction][start[0] + i][start[1] + i] !== 'empty') {
        return false;
      }
    }
    return true;
  }

  makeMove(moves, direction) {
    const originalPositions = JSON.parse(JSON.stringify(this.positions));
    for (const move of moves) {
      const [start, end] = move;
      if (this.isValidMove(start, end, direction, 1)) {
        this.positions[direction][start[0]][start[1]] = this.currentPlayer;
      } else {
        this.positions = originalPositions;
        throw new Error('Invalid move');
      }
    }
    const [lastStart, lastEnd] = moves[moves.length - 1];
    this.positions.crossLinesDot = Array(32).fill().map(() => Array(40).fill('empty'));
    this.positions.crossLinesDot[lastEnd[0]][lastEnd[1]] = 'ball';
    this.currentPlayer = this.currentPlayer === 'playerA' ? 'playerB' : 'playerA';
  }

  isTrapped(player) {
    for (let i = 0; i < 32; i++) {
      for (let j = 0; j < 40; j++) {
        for (const direction of ['vertical', 'horizontal', 'diagonal']) {
          if (this.isValidMove([i, j], [i, j + 1], direction, 1) &&
              this.isValidMove([i, j + 1], [i, j + 2], direction, 1) &&
              this.isValidMove([i, j + 2], [i, j + 3], direction, 1)) {
            return false;
          }
        }
      }
    }
    return true;
  }

  applyPenalty(player) {
    for (let i = 0; i < 32; i++) {
      for (let j = 0; j < 40; j++) {
        if (this.positions.vertical[i][j] === player) {
          this.positions.vertical[i][j] = 'empty';
          return;
        }
        if (this.positions.horizontal[i][j] === player) {
          this.positions.horizontal[i][j] = 'empty';
          return;
        }
        if (this.positions.diagonal[i][j] === player) {
          this.positions.diagonal[i][j] = 'empty';
          return;
        }
      }
    }
  }
}


function renderBoard(positions) {
  const table = document.createElement('table');
  for (let i = 0; i < 32; i++) {
    const row = document.createElement('tr');
    for (let j = 0; j < 40; j++) {
      const cell = document.createElement('td');
      let cellContent = '';
      if (positions.crossLinesDot[i][j] === 'ball') {
        cellContent = '*';
      } else if (positions.vertical[i][j] !== 'empty') {
        cellContent = positions.vertical[i][j] === 'playerA' ? '/' : '\\';
      } else if (positions.horizontal[i][j] !== 'empty') {
        cellContent = positions.horizontal[i][j] === 'playerA' ? '/' : '\\';
      } else if (positions.diagonal[i][j] !== 'empty') {
        cellContent = positions.diagonal[i][j] === 'playerA' ? '/' : '\\';
      } else {
        cellContent = '.';
      }
      cell.textContent = cellContent;
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
  return table;
}

// Usage:
const gridball = new Gridball();
window.gridball = gridball;
window.rerender = () => {
  const board = renderBoard(gridball.positions);
  document.body.replaceChild(board, document.querySelector('table'));
}
const board = renderBoard(gridball.positions);
document.body.appendChild(board);
