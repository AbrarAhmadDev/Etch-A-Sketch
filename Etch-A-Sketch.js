// Create a webpage with a 16x16 grid of square divs.
// Create the divs using JavaScript. Don’t try to create them by hand by copying and pasting them in your HTML file!
// It’s best to put your grid squares inside a “container” div. This div can be written in your HTML file.
// Use Flexbox to make the divs appear as a grid (versus just one on each line). Despite the name, do not be tempted to research or use CSS Grid, as it will be taught in a later lesson after the foundations path. This project is an opportunity specifically to practice Flexbox!
// Be careful with borders and margins, as they can adjust the size of the squares!
const container = document.querySelector('.container');
const gridSize = 16;
container.style.display = 'flex';
container.style.flexWrap = 'wrap';
container.style.width = '650px';
container.style.height = '650px';
container.style.boxSizing = 'border-box';

function createGrid(gridSizeNum) {
    const heightwidth = 650 / gridSize;
    for (let i = 0; i < gridSizeNum * gridSizeNum; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.style.width = heightwidth+'px';
        square.style.height = heightwidth+'px';
        square.style.border = '1px solid black';
        container.appendChild(square);
    }
}

createGrid(gridSize);