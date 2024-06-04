const drawingContainer = document.getElementById('drawing-container');

let data = [];
let currentIndex = 0;
let model;

// Load the data from the file
fetch('data.txt')
  .then(response => response.text())
  .then(text => {
    data = text.trim().split('\n').map(line => line.split(',').map(Number));
    visualizeNumber(currentIndex);
  });

// Set up canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Event listeners for navigation buttons
document.getElementById('prev').addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    visualizeNumber(currentIndex);
  }
});

document.getElementById('next').addEventListener('click', () => {
  if (currentIndex < data.length - 1) {
    currentIndex++;
    visualizeNumber(currentIndex);
  }
});

// Function to visualize the number
function visualizeNumber(index) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const numberData = data[index].slice(); // Copy the data to avoid modifying the original
  const classCode = numberData.pop(); // The last value is the class code
  document.getElementById('number-indicator').innerText = `Number: ${classCode}`;

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const value = numberData[i * 8 + j];
      const intensity = (value / 16) * 255;
      ctx.fillStyle = `rgb(${intensity}, ${intensity}, ${intensity})`;
      ctx.fillRect(j * 40, i * 40, 40, 40);
    }
  }
}

// Neural Network Setup
document.getElementById('create-train-model').addEventListener('click', async () => {
  const epochs = parseInt(document.getElementById('epochs').value);
  const batchSize = parseInt(document.getElementById('batch-size').value);
  const optimizer = document.getElementById('optimizer').value;

  document.getElementById('model-status').innerHTML = `Model Status: <b class="training">Training...</b>`;
  drawingContainer.style.visibility = 'hidden';

  const { model: trainedModel, status } = await createAndTrainModel(epochs, batchSize, optimizer);
  model = trainedModel;  // Assign to the global model variable
  document.getElementById('model-status').innerHTML = `Model Status: <b class="${status.toLowerCase()}">${status}</b>`;
});

async function createAndTrainModel(epochs, batchSize, optimizer) {

  console.log("optimizer", optimizer);

  const model = tf.sequential();
  model.add(tf.layers.dense({ inputShape: [64], units: 128, activation: 'relu' }));
  
  model.add(tf.layers.dense({ units: 64, activation: 'relu' }));

  model.add(tf.layers.dense({ units: 10, activation: 'softmax' }));

  model.compile({ optimizer: optimizer, loss: 'sparseCategoricalCrossentropy', metrics: ['accuracy'] });

  // Prepare the data
  const inputs = data.map(item => item.slice(0, 64));
  const labels = data.map(item => item[64]);

  // Convert inputs to float32 tensor
  const xs = tf.tensor2d(inputs, [inputs.length, 64], 'float32');
  const ys = tf.tensor1d(labels, 'float32');

  document.getElementById('model-output').innerHTML = ""; // reset table

  await model.fit(xs, ys, {
    epochs: epochs,
    batchSize: batchSize,
    callbacks: {
      onEpochEnd: (epoch, logs) => {
        const output = `Epoch ${epoch + 1}: loss = ${logs.loss}, accuracy = ${logs.acc}`;
        document.getElementById('model-output').innerHTML += `${output}<br>`;
      }
    }
  });

  drawingContainer.style.visibility = 'visible';

  return { model, status: 'Trained' };
}