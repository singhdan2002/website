// Import the anime.js library using a relative path
import anime from '/anime-master/lib/anime.es.js';

// Get the container element for the tiles
const wrapper = document.getElementById("tiles");

// Initialize variables to keep track of the grid size and toggle state
let columns = 0,
    rows = 0,
    toggled = false;

// Function to toggle the opacity of the tiles and the body background color
const toggle = () => {
  toggled = !toggled;
  
  document.body.classList.toggle("toggled");
}

// Function to handle click events on the tiles
const handleOnClick = index => {
  toggle();
  
  // Use anime.js to animate the opacity of the tiles
  anime({
    targets: ".tile",
    opacity: toggled ? 0 : 1,
    delay: anime.stagger(50, {
      grid: [columns, rows],
      from: index
    })
  });
}

// Function to create a new tile element
const createTile = index => {
  const tile = document.createElement("div");
  
  // Add a CSS class to the tile element
  tile.classList.add("tile");
  
  // Set the initial opacity of the tile based on the toggle state
  tile.style.opacity = toggled ? 0 : 1;
  
  // Attach a click event handler to the tile element
  tile.onclick = e => handleOnClick(index);
  
  // Return the tile element
  return tile;
}

// Function to create a grid of tiles
const createTiles = quantity => {
  // Use the Array.from() method to create an array of tile elements
  Array.from(Array(quantity)).map((tile, index) => {
    // Append each tile element to the wrapper element
    wrapper.appendChild(createTile(index));
  });
}

// Function to create the grid based on the current window size
const createGrid = () => {
  // Clear the contents of the wrapper element
  wrapper.innerHTML = "";
  
  // Choose a tile size based on the current window width
  const size = document.body.clientWidth > 800 ? 100 : 50;
  
  // Calculate the number of columns and rows in the grid
  columns = Math.floor(document.body.clientWidth / size);
  rows = Math.floor(document.body.clientHeight / size);
  
  // Set CSS variables to control the grid layout
  wrapper.style.setProperty("--columns", columns);
  wrapper.style.setProperty("--rows", rows);
  
  // Create a grid of tiles with the appropriate quantity
  createTiles(columns * rows);
}

// Call the createGrid() function to create the initial grid
createGrid();

// Attach a window resize event handler to update the grid layout
window.onresize = () => createGrid();
