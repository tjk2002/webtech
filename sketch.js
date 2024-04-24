let currentColor = '#000000';
let tool = 'pen';

function setup() {
  let canvas = createCanvas(700, 500); // Adjust size as needed
  canvas.parent('canvas-container'); // This line attaches the canvas to your div
  background(255); // Set a background color
  setupTools(); // Initialize tool setup

  // Setup download button click event
  document.getElementById('download-btn').addEventListener('click', function() {
    saveCanvas(canvas, 'myCanvas', 'jpg'); // Saves the canvas as 'myCanvas.jpg'
  });
}

document.getElementById('save-to-gallery-btn').addEventListener('click', function() {
    const dataUrl = canvas.toDataURL('image/png'); // Convert canvas to data URL
    const gallery = JSON.parse(sessionStorage.getItem('gallery')) || []; // Retrieve gallery array from sessionStorage, or initialize an empty array
    gallery.push(dataUrl); // Add the new image data URL to the gallery array
    sessionStorage.setItem('gallery', JSON.stringify(gallery)); // Save the updated gallery array back to sessionStorage
    alert('Saved to gallery!'); // Optional: Notify the user
});


// Setup the drawing tools
function setupTools() {
  // Setup color picker
  const colorPicker = document.getElementById('colorPicker');
  colorPicker.addEventListener('change', function() {
    currentColor = this.value;
    if (tool !== 'eraser') { // Switch to pen if not on eraser
      tool = 'pen';
    }
  });

  // Setup pen button
  document.getElementById('pen').addEventListener('click', function() {
    tool = 'pen';
  });

  // Setup eraser button
  document.getElementById('eraser').addEventListener('click', function() {
    tool = 'eraser';
  });
}


function draw() {
  stroke(currentColor);
  strokeWeight(4);

  if (mouseIsPressed) {
    if (tool === 'eraser') {
      stroke(255); // Use white color for eraser
    } else {
      stroke(currentColor); // Use the current color for the pen
    }
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}
