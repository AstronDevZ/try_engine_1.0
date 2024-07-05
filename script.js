// script.js
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;

let selectedTool = 'select';
let layers = [[]];
let currentLayer = 0;

document.getElementById('selectTool').addEventListener('click', () => {
    selectedTool = 'select';
});

document.getElementById('drawTool').addEventListener('click', () => {
    selectedTool = 'draw';
});

document.getElementById('addLayer').addEventListener('click', () => {
    layers.push([]);
    updateLayersList();
});

document.getElementById('exportProject').addEventListener('click', () => {
    exportProject();
});

canvas.addEventListener('mousedown', (e) => {
    if (selectedTool === 'draw') {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        drawRectangle(x, y, 50, 50);
    }
});

function drawRectangle(x, y, width, height) {
    ctx.fillStyle = 'red';
    ctx.fillRect(x, y, width, height);
    layers[currentLayer].push({type: 'rect', x, y, width, height});
}

function updateLayersList() {
    const layersList = document.getElementById('layersList');
    layersList.innerHTML = '';
    layers.forEach((layer, index) => {
        const layerItem = document.createElement('li');
        layerItem.textContent = `Layer ${index + 1}`;
        layersList.appendChild(layerItem);
    });
}

function exportProject() {
    const projectData = {
        layers: layers
    };
    const blob = new Blob([JSON.stringify(projectData)], {type: 'application/json'});
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'project.json';
    link.click();
}
