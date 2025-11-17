
// Creating coordinates in 2 arrays
const xAxis = [0,1,2];
const yAxis = ['A','B','C']
const gridMatrix = [
    [1,2,3],
    [4,5,6],
    [7,8,9]
]

const nest = document.querySelector('.nest');

// document.querySelector('.nest').innerHTML = gridMatrix;

// print the grid correctly
function printGrid(grid) {
    grid.forEach(row => {
        let newRow = document.createElement('div');
        newRow.className = 'row'
        newRow.textContent = row;
        row.forEach(element =>{
            let newCard = document.createElement('div');
            newCard.className = 'card';
            newCard.textContent = element;

            newRow.appendChild(newCard);
            
        });

        nest.appendChild(newRow);

    });
}

window.onload = function() {
  printGrid(gridMatrix);
};

//TODO: create a matrix creator, where I can insert X and Y and get a nicely made grid
// This might already be handled in vanilla JS