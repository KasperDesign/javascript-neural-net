let data = [];
let currentIndex = 0;

// Load the data from the file
fetch('data.txt')
  .then(response => response.text())
  .then(text => {
    console.log("data loaded", text);
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
  const numberData = data[index];
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
