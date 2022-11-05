const randomColorGenerator = () => {
  const colorPixel = document.getElementsByClassName('color');
  const randomButton = document.querySelector('#button-random-color');
  const objPaletteColors = [];
  randomButton.addEventListener('click', () => {
    for (let i = 1; i < colorPixel.length; i += 1) {
      const randomColorR = Math.floor(Math.random() * 255).toString(10);
      const randomColorG = Math.floor(Math.random() * 255).toString(10);
      const randomColorB = Math.floor(Math.random() * 255).toString(10);
      const colorRGB = `rgb(${randomColorR},${randomColorG},${randomColorB})`;
      colorPixel[i].style.backgroundColor = colorRGB;
      objPaletteColors.push(colorRGB);
    }
    localStorage.setItem('colorPalette', JSON.stringify(objPaletteColors));
  });
};

const loadPalette = () => {
  const colorPixel = document.getElementsByClassName('color');
  const savedPalette = JSON.parse(localStorage.getItem('colorPalette'));
  colorPixel[0].style.backgroundColor = 'black';
  colorPixel[1].style.backgroundColor = 'red';
  colorPixel[2].style.backgroundColor = 'green';
  colorPixel[3].style.backgroundColor = 'blue';
  if (savedPalette !== null) {
    for (let i = 1; i < colorPixel.length; i += 1) {
      colorPixel[i].style.backgroundColor = `${savedPalette[i - 1]}`;
    }
  }
};

const createGrid = () => {
  const main = document.querySelector('main');
  const divGrid = document.createElement('div');
  divGrid.id = 'pixel-board';
  main.appendChild(divGrid);
};

const populateGrid = (number) => {
  const divGrid = document.querySelector('#pixel-board');
  let boardSize = Math.min(Math.max(number, 5), 50);
  if (!number) {
    boardSize = 5;
  }
  localStorage.setItem('boardSize', JSON.stringify(boardSize));
  for (let iRow = 0; iRow < boardSize; iRow += 1) {
    const rowDiv = document.createElement('div');
    divGrid.appendChild(rowDiv);
    for (let iColumn = 0; iColumn < boardSize; iColumn += 1) {
      const pixelDiv = document.createElement('div');
      pixelDiv.className = 'pixel';
      rowDiv.appendChild(pixelDiv);
    }
  }
};

const colorSelected = () => {
  const colorPalette = document.getElementsByClassName('color');
  for (let i = 0; i < colorPalette.length; i += 1) {
    colorPalette[i].addEventListener('click', (event) => {
      const selectedColor = document.querySelector('.selected');
      selectedColor.classList.remove('selected');
      event.target.classList.add('selected');
    });
  }
};

const saveBoard = () => {
  const pixels = document.querySelectorAll('.pixel');
  const pixelBoard = [];
  for (let i = 0; i < pixels.length; i += 1) {
    pixelBoard.push(pixels[i].style.backgroundColor);
  }
  localStorage.setItem('pixelBoard', JSON.stringify(pixelBoard));
};

const paintPixel = () => {
  const pixels = document.querySelectorAll('.pixel');
  for (let i = 0; i < pixels.length; i += 1) {
    pixels[i].addEventListener('click', () => {
      const selectedColor = document.querySelector('.selected');
      pixels[i].style.backgroundColor = selectedColor.style.backgroundColor;
      saveBoard();
    });
  }
};

const clearBoard = () => {
  const clearButton = document.querySelector('#clear-board');
  const pixels = document.querySelectorAll('.pixel');
  clearButton.addEventListener('click', () => {
    for (let i = 0; i < pixels.length; i += 1) {
      pixels[i].style.backgroundColor = 'rgb(255,255,255)';
    }
    localStorage.removeItem('pixelBoard');
  });
};

const loadBoard = () => {
  const pixelBoard = JSON.parse(localStorage.getItem('pixelBoard'));
  const pixels = document.querySelectorAll('.pixel');
  if (pixelBoard !== null) {
    for (let i = 0; i < pixels.length; i += 1) {
      pixels[i].style.backgroundColor = pixelBoard[i];
    }
  }
};

const doBoardThings = () => {
  clearBoard();
  loadBoard();
  paintPixel();
};

const changeBoardSize = () => {
  const generateBoardButton = document.querySelector('#generate-board');
  const inputSize = document.getElementById('board-size');
  let boardSize = 0;
  inputSize.addEventListener('keyup', () => {
    boardSize = inputSize.value;
  });
  generateBoardButton.addEventListener('click', () => {
    console.log(boardSize);
    if (boardSize === 0) {
      window.alert('Board inválido!');
    } else {
      const gridDiv = document.querySelector('#pixel-board');
      gridDiv.innerHTML = '';
      localStorage.removeItem('pixelBoard');
      populateGrid(boardSize);
      doBoardThings();
    }
  });
};

loadPalette();
randomColorGenerator();
createGrid();
populateGrid(JSON.parse(localStorage.getItem('boardSize')));
changeBoardSize();
colorSelected();
clearBoard();
loadBoard();
paintPixel();
