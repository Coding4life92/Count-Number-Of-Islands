const islandContainer = document.getElementById('islandContainer');

const ROW_COUNT = 10;
const COL_COUNT = 10;

// Create grid
for (let i = 0; i < ROW_COUNT; i++) {
  const row = document.createElement('div');
  row.id = `row${i + 1}`;
  row.classList.add('row');
  islandContainer.appendChild(row);

  for (let j = 0; j < COL_COUNT; j++) {
    const cell = document.createElement('div');
    cell.id = `cell${j + 1}`;
    cell.classList.add('cell');
    row.appendChild(cell);
  }
}

// Fill grid with sample data
const rowsData = [
  [1, 0, 1, 0, 0, 0, 1, 1, 1, 1],
  [0, 0, 1, 0, 1, 0, 1, 0, 0, 0],
  [1, 1, 1, 1, 0, 0, 1, 0, 0, 0],
  [1, 0, 0, 1, 0, 1, 0, 0, 0, 0],
  [1, 1, 1, 1, 0, 0, 0, 1, 1, 1],
  [0, 1, 0, 1, 0, 0, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 0, 0, 1, 1, 1, 0],
  [1, 0, 1, 0, 1, 0, 0, 1, 0, 0],
  [1, 1, 1, 1, 0, 0, 0, 1, 1, 1],
];

// Populate cells with land or water
const rows = document.querySelectorAll('.row');
rows.forEach((row, i) => {
  const cells = row.querySelectorAll('.cell');
  cells.forEach((cell, j) => {
    if (rowsData[i][j] === 1) {
      cell.classList.add('land');
      cell.textContent = 1;
    } else {
      cell.classList.add('water');
      cell.textContent = 0;
    }
  });
});

const row = [-1, -1, -1, 0, 1, 0, 1, 1];
const col = [-1, 1, 0, -1, -1, 1, 0, 1];

// Helper function to check if a cell is safe to visit
const isSafe = (mat, x, y, processed) => {
  return (
    x >= 0 && 
    x < mat.length) && 
    (y >= 0 && y < mat[0].length) && 
    mat[x][y] && 
    !processed[x][y];
};

// BFS function to explore all connected land cells
const BFS = (mat, processed, i, j) => {
  const queue = [{ x: i, y: j }];
  processed[i][j] = true;

  while (queue.length) {
    const { x, y } = queue.shift();

    for (let k = 0; k < 8; k++) {
      const newX = x + row[k];
      const newY = y + col[k];
      
      if (isSafe(mat, newX, newY, processed)) {
        processed[newX][newY] = true;
        queue.push({ x: newX, y: newY });
      }
    }
  }
};

// Function to count the number of islands
const countIslands = (mat) => {
  if (mat.length === 0) {
    return 0;
  }

  const M = mat.length;
  const N = mat[0].length;
  const processed = Array.from({ length: M }, () => Array(N).fill(false));
  let islandCount = 0;

  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      if (mat[i][j] === 1 && !processed[i][j]) {
        BFS(mat, processed, i, j);
        islandCount++;
      }
    }
  }

  return islandCount;
};

// Create matrix from DOM
const matrix = Array.from(rows).map(row =>
  Array.from(row.querySelectorAll('.cell')).map(cell => +cell.textContent)
);

// Count islands
const numIslands = countIslands(matrix);
const title = document.getElementById('title');
title.textContent = `Number of islands: ${numIslands}`;
