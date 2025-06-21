const container = document.querySelector('.container');
let gridSize = 16;
container.style.display = 'flex';
container.style.flexWrap = 'wrap';
container.style.width = '640px';
container.style.height = '640px';
container.style.boxSizing = 'border-box';
container.style.border = '3px solid black';

container.style.margin = '0 auto';

function createTitle() {
    const title = document.createElement('h1');
    title.textContent = 'Etch-A-Sketch';
    title.style.textAlign = 'center';
    title.style.fontFamily = 'WDXL Lubrifont JP N, sans-serif';
    title.style.color = 'black';
    title.style.margin = '30px auto';
    title.style.fontWeight = '400';
    title.style.style = 'normal';
    title.style.fontSize = '5rem';
    document.body.insertBefore(title, container);
}
createTitle();

function createResetButton() {
    const resetButton = document.createElement('button');
    resetButton.textContent = 'Reset Grid';
    resetButton.style.fontFamily = 'WDXL Lubrifont JP N, sans-serif';
    resetButton.style.color = 'black';
    resetButton.style.display = 'block';
    resetButton.style.margin = '30px auto';
    resetButton.style.marginBottom = '40px';
    resetButton.style.padding = '10px 20px';
    resetButton.style.fontSize = '1.2rem';
    resetButton.style.cursor = 'pointer';
    resetButton.style.borderRadius = '10px';
    resetButton.style.backgroundColor = 'antiquewhite';
    resetButton.style.border = '4px solid black';
    resetButton.style.fontSize = '2rem';
    resetButton.style.fontWeight = '200';
    resetButton.addEventListener('click', () => {
    showGridSizeModal(gridSize, (newSize) => {
        container.innerHTML = '';
        createGrid(newSize);
        addHoverEffect();
    }, () => {

    });
});
    document.body.insertBefore(resetButton, container);
}
createResetButton();

function createGrid(gridSizeNum) {
    const squareSize = container.clientWidth / gridSizeNum;
    for (let i = 0; i < gridSizeNum * gridSizeNum; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.style.width = `${squareSize}px`;
        square.style.height = `${squareSize}px`;
        square.style.boxSizing = 'border-box';
        square.style.border = '2px solid black';
        container.appendChild(square);
    }
}
createGrid(gridSize);

function randomColorSelector() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function addHoverEffect() {
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {
         square.dataset.opacity = 0;
        square.addEventListener('mouseover', () => {
            square.style.backgroundColor = randomColorSelector();
            square.dataset.opacity = parseFloat(square.dataset.opacity) + 0.1;
        });
    });
}
addHoverEffect();



function showGridSizeModal(defaultValue, onConfirm, onCancel) {
    const overlay = document.getElementById('modal-overlay');
    const input = document.getElementById('grid-input');
    const okBtn = document.getElementById('modal-ok');
    const cancelBtn = document.getElementById('modal-cancel');
    const errorDiv = document.getElementById('modal-error');
    input.value = defaultValue;
    errorDiv.textContent = '';
    overlay.style.display = 'flex';
    input.focus();

    function closeModal() {
        overlay.style.display = 'none';
        okBtn.removeEventListener('click', okHandler);
        cancelBtn.removeEventListener('click', cancelHandler);
        input.removeEventListener('keydown', keyHandler);
    }

    function okHandler() {
        const val = parseInt(input.value, 10);
        if (val >= 1 && val <= 100) {
            closeModal();
            onConfirm(val);
        } else {
            errorDiv.textContent = 'Please enter a number between 1 and 100.';
        }
    }

    function cancelHandler() {
        closeModal();
        if (onCancel) onCancel();
    }

    function keyHandler(e) {
        if (e.key === 'Enter') okHandler();
        if (e.key === 'Escape') cancelHandler();
    }

    okBtn.addEventListener('click', okHandler);
    cancelBtn.addEventListener('click', cancelHandler);
    input.addEventListener('keydown', keyHandler);
}