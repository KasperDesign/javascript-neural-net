# Digit Recognition and Visualization

This project provides an interactive interface for visualizing and recognizing handwritten digits using a neural network. The digits are represented in an 8x8 grid where each cell's intensity ranges from 0 to 16. Users can visualize existing data, draw their own digits, and train a neural network model for digit recognition.

## Features

- **Data Visualization**: Visualize existing digit data from a file.
- **Interactive Drawing**: Draw digits in an 8x8 grid with varying intensities.
- **Model Training**: Create and train a neural network model on the provided data.
- **Prediction**: Predict the digit drawn by the user in the interactive interface.

## Setup

### Prerequisites

- A modern web browser.
- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) (optional, for serving files locally).

### Files

- `index.html`: Main HTML file containing the structure of the web app.
- `app.js`: JavaScript file for loading data, visualizing digits, and training the neural network model.
- `draw.js`: JavaScript file for handling the interactive drawing interface.
- `style.css`: (Optional) CSS file for custom styles.
- `data.txt`: Data file containing digit data for training and visualization.
- `visualize-network.html`: An unrelated file that will later be used to visualize the model

### Dataset

[Optical Recognition of Handwritten Digits](https://archive.ics.uci.edu/dataset/80/optical+recognition+of+handwritten+digits)

### Data Format

The `data.txt` file should contain lines of comma-separated integers. Each line represents a digit, with the first 64 values being the features (intensities) and the last value being the class label (0-9). Example line:

```
0,1,6,15,12,1,0,0,0,7,16,6,6,10,0,0,0,8,16,2,0,11,2,0,0,5,16,3,0,5,7,0,0,7,13,3,0,8,7,0,0,4,12,0,1,13,5,0,0,0,14,9,15,9,0,0,0,0,6,14,7,1,0,0,0
```

## Usage

### Running Locally

1. Clone the repository or download the files.
2. Ensure the files are in the same directory.
3. Open `index.html` in your web browser.

### Serving Files Locally (Optional)

To serve the files using a local server (optional but recommended for development):

1. Install [http-server](https://www.npmjs.com/package/http-server):
   ```sh
   npm install -g http-server

2. http-server

3. Open the provided local URL (usually http://127.0.0.1:8080) in your web browser.

## Project Structure

index.html: Contains the layout of the web page, including canvases and buttons.

app.js: Loads the digit data, handles visualization, and trains the neural network model using TensorFlow.

drawing.js: Manages the interactive drawing grid, allowing users to draw digits and predict them using the trained model.

style.css: Contains styles for the web page layout and elements.

## How to Use

Visualize Existing Data:
    Use the "Previous" and "Next" buttons to navigate through the dataset and visualize each digit.
    The displayed digit's label is shown above the canvas.

Interactive Drawing:
    Draw digits in the 8x8 grid canvas using your mouse.
    The intensity of each cell increases the longer you hold the mouse button down.
    Click "Clear" to reset the grid.

Train the Model:
    Set the desired number of epochs and batch size.
    Click "Create and Train Model" to train the neural network on the loaded data.
    The training status will be displayed.

Predict Drawn Digits:
    After training, draw a digit in the interactive grid.
    Click "Predict" to see the model's prediction for the drawn digit.

## Dependencies

TensorFlow [tsjs](https://cdn.jsdelivr.net/npm/@tensorflow/tfjs) for creating and training the neural network model. This is loaded from a local file.

## License

This project is licensed under the MIT License.