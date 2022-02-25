let rows = 20;
let cols = 40;

let cellSize = 35;

let cells = new Array(rows);
for( let i = 0; i < rows; i++ ){
    cells[i] = new Array(cols);
}

//setup the board
window.onload = () => {
    let nc = document.getElementById("nc");

    //calculate the number of column and row cells
    rows = Math.floor(window.innerHeight/cellSize*0.8);
    cols = Math.floor(window.innerWidth/cellSize*0.8);

    //adjust grid layout based on number of cols and rows
    nc.style.gridTemplateColumns = "repeat(" + cols + "," + cellSize + "px)";
    nc.style.gridAutoRows = cellSize + "px";

    //create each cell in the grid
    for(let i = 0; i < rows; i++){
        for( let j = 0; j < cols; j++ ){
            let cell = document.createElement("div");
            cell.setAttribute("id", i + "-" + j);
            cell.setAttribute("class", "cell");
            //th.appendChild(document.createTextNode("pain"));
            cell.addEventListener("mousedown", cellOnClick);
            nc.appendChild(cell);
        }
    }
}

//remove or add cells based on new window size
window.onresize = () => {
    //calculate the number of column and row cells
    let newRows = Math.floor(window.innerHeight/cellSize*0.8);
    let newCols = Math.floor(window.innerWidth/cellSize*0.8);

    let nc = document.getElementById("nc");

    //adjust grid layout based on number of cols and rows
    nc.style.gridTemplateColumns = "repeat(" + newCols + "," + cellSize + "px)";
    nc.style.gridAutoRows = cellSize + "px";

    //find the the difference between number old and new cells
    let rowCellChange = newRows-rows;
    let colCellChange = newCols-cols;

    //start by removing/adding rows
    if( rowCellChange < 0 ){
        for(let i = newRows; i < rows; i++ ){
            for( let j = 0; j < cols; j++ ){
                document.getElementById(i + "-" + j).remove();
            }
        }
    }
    else{
        for(let i = rows; i < newRows; i++ ){
            for( let j = 0; j < cols; j++ ){
                let cell = document.createElement("div");
                cell.setAttribute("id", i + "-" + j);
                cell.setAttribute("class", "cell");
                cell.addEventListener("mousedown", cellOnClick);
                nc.appendChild(cell);
            }
        }
    }

    //change columns after rows
    if( colCellChange < 0 ){
        for(let j = newCols; j < cols; j++ ){
            for( let i = 0; i < newRows; i++ ){
                document.getElementById(i + "-" + j).remove();
            }
        }
    }
    else{
        for(let j = cols; j < newCols; j++ ){
            for( let i = 0; i < newRows; i++ ){
                let cell = document.createElement("div");
                cell.setAttribute("id", i + "-" + j);
                cell.setAttribute("class", "cell");
                cell.addEventListener("mousedown", cellOnClick);
                nc.appendChild(cell);
            }
        }
    }
    rows = newRows;
    cols = newCols;
}


//window.addEventListener("click", test );

//change the color of the cell on Click
function cellOnClick(e){
    console.log(e.target.id);
    let cell = document.getElementById(e.target.id);
    if(cell.style.backgroundColor == "black"){
        cell.style.backgroundColor = "";
    }
    else{
        cell.style.backgroundColor = "black";
    }
    //console.log(e);
}

function aStar(){
    return 0;
}


