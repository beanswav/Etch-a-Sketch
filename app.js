const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = '#333333';
const DEFAULT_MODE = 'color';

let currentClr = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSz = DEFAULT_SIZE;

function setCurrentClr(newColor) {
    currentClr = newColor;
}

function setCurrentMode(newMode) {
    activateButton(newMode);
    currentMode = newMode;
}

function setSize(newSize) {
    currentSz = newSize;
}

const colorPick = document.getElementById('colorPicker');
const colorBtn = document.getElementById('colorBtn');
const rainbowBtn = document.getElementById('rainbowBtn');
const clear = document.getElementById('clearBtn');
const sizeValue = document.getElementById('sizeValue');
const sizeSlider = document.getElementById('slider');
const grid = document.getElementById('grid');

colorPick.onchange = (e) => setCurrentClr(e.target.value);
colorBtn.onclick = () => setCurrentMode('color');
rainbowBtn.onclick = () => setCurrentMode('rainbow');
clear.onclick = () => resetGrid();
sizeSlider.onmousemove = (e) => updateSize(e.target.value);
sizeSlider.onchange = (e) => changeSize(e.target.value);

function changeSize(value) {
    setSize(value);
    updateSize(value);
    resetGrid();
}

function updateSize(value) {
    sizeValue.innerHTML = `${value} x ${value}`;
}

function resetGrid() {
    clearGrid();
    makeGrid(currentSz);
}

function clearGrid() {
    grid.innerHTML = '';
}

function makeGrid(size) {
        grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
        grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

        for (i = 0; i < (size * size); i++) {
            let cell = document.createElement('div');
            cell.addEventListener('mouseover', changeColor);
            grid.appendChild(cell);
        }
    };

function changeColor(e) {
    if (currentMode == 'rainbow') {
        const randomR = Math.floor(Math.random() * 256);
        const randomG = Math.floor(Math.random() * 256);
        const randomB = Math.floor(Math.random() * 256);
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
    } else if (currentMode == 'color') {
    e.target.style.backgroundColor = currentClr;
    }
}

function activateButton(newMode) {
    if (currentMode == 'rainbow') {
        rainbowBtn.classList.remove('active');
    } else if (currentMode == 'color') {
        colorPick.classList.remove('active');
    };
    if (newMode == 'rainbow') {
        rainbowBtn.classList.add('active');
    } else if (newMode == 'color') {
        colorPick.classList.add('active');
    }
}

window.onload = () => {
    makeGrid(DEFAULT_SIZE);
    activateButton(DEFAULT_MODE);
}