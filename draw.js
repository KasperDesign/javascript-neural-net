const drawingCanvas = document.getElementById('drawing-canvas');
const drawingCtx = drawingCanvas.getContext('2d');
const clearButton = document.getElementById('clear-drawing');
const predictButton = document.getElementById('predict-drawing');
const predictionResult = document.getElementById('prediction-result');

const gridSize = 8;
const cellSize = drawingCanvas.width / gridSize;
const maxIntensity = 16;

let drawingData = Array(gridSize).fill(0).map(() => Array(gridSize).fill(0));

let isDrawing = false;

drawingCanvas.addEventListener('mousedown', () => {
  isDrawing = true;
});

drawingCanvas.addEventListener('mouseup', () => {
  isDrawing = false;
});

drawingCanvas.addEventListener('mousemove', (event) => {
  if (isDrawing) {
    const rect = drawingCanvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const row = Math.floor(y / cellSize);
    const col = Math.floor(x / cellSize);

    if (row >= 0 && row < gridSize && col >= 0 && col < gridSize) {
      if (drawingData[row][col] < maxIntensity) {
        drawingData[row][col]++;
      }
      drawGrid();
    }
  }
});

clearButton.addEventListener('click', () => {
  drawingData = Array(gridSize).fill(0).map(() => Array(gridSize).fill(0));
  drawGrid();
});

predictButton.addEventListener('click', async () => {
  const flattenedData = drawingData.flat();
  const inputTensor = tf.tensor2d([flattenedData], [1, gridSize * gridSize], 'float32');

  // Assuming the model is globally accessible and already trained
  const prediction = model.predict(inputTensor);
  const predictedClass = prediction.argMax(1).dataSync()[0];
  
  predictionResult.innerText = `Prediction: ${predictedClass}`;
});

function drawGrid() {
  drawingCtx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const intensity = (drawingData[row][col] / maxIntensity) * 255;
      drawingCtx.fillStyle = `rgb(${intensity}, ${intensity}, ${intensity})`;
      drawingCtx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
    }
  }
}

drawGrid();
