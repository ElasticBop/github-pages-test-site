let gInfo = {
    rows: 20,
    cols: 40,
    cellSize: 35,
    startLoc: 0,
    endLoc: 0
};

let settings = {
    nodeType: 0,
    algType: 0
};

window.onload = () => {
    setUpHandlers();
    setUpGraphView(gInfo);
    setUpGraph(gInfo);
    console.log(gInfo.startLoc);
    console.log(gInfo.endLoc);
}

window.onresize = () => {
    updateGraphView(gInfo);
    updateGraph(gInfo)
    console.log(gInfo.startLoc);
    console.log(gInfo.endLoc);

}

//remove or add cells based on new window size
function updateGraphView(gInfo){
    let rows = gInfo.rows;
    let cols = gInfo.cols;
    let cellSize = gInfo.cellSize;

    let nc = document.getElementById("nc");

    //calculate the number of column and row cells
    let newRows = Math.floor(window.innerHeight/cellSize*0.8);
    let newCols = Math.floor(window.innerWidth/cellSize*0.8);

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
    gInfo.rows = newRows;
    gInfo.cols = newCols;
}

//setup the board
function setUpGraphView(gInfo){
    let rows = gInfo.rows;
    let cols = gInfo.cols;
    let cellSize = gInfo.cellSize;
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
    gInfo.rows = rows;
    gInfo.cols = cols;
}

//set up graph matrix
function setUpGraph(gInfo){
    gInfo.graph = new Array(gInfo.rows);
    for(let i = 0; i < gInfo.rows; i++ ){
        gInfo.graph[i] = new Array(gInfo.cols);
        for( let j = 0; j < gInfo.cols; j++ ){
            gInfo.graph[i][j] = 0;
        }
    }
}

function setUpHandlers(){
    document.getElementById("node-select").addEventListener("change", selectOnChange);
    document.getElementById("alg-select").addEventListener("change", selectOnChange);
    
}

//update graph matrix
function updateGraph(gInfo){
    newGraph = new Array(gInfo.rows);
    for(let i = 0; i < gInfo.rows; i++ ){
        newGraph[i] = new Array(gInfo.cols);
        for( let j = 0; j < gInfo.cols; j++ ){
            newGraph[i][j] = gInfo.graph[i][j];
        }
    }

    if( gInfo.startLoc != 0){
        if(gInfo.startLoc[0] >= gInfo.rows || gInfo.startLoc[1] >= gInfo.cols){
            gInfo.startLoc = 0;
        }
    }

    if( gInfo.endLoc != 0){
        if(gInfo.endLoc[0] >= gInfo.rows || gInfo.endLoc[1] >= gInfo.cols){
            gInfo.endLoc = 0;
        }
    }

    gInfo.graph = newGraph;
}

//change the color of the cell on Click
function cellOnClick(e){
    let cellLoc = e.target.id;
    let cell = document.getElementById(cellLoc);
    cellLoc = cellLoc.split("-");
    let x = parseInt(cellLoc[0]);
    let y = parseInt(cellLoc[1]);

    //can simplify this damn
    if( settings.nodeType == 0){
        gInfo.graph[x][y] = 1;
        cell.style.backgroundColor = "green";
        if (gInfo.startLoc != 0){
            if( x != gInfo.startLoc[0] || y != gInfo.startLoc[1] ){
                gInfo.graph[gInfo.startLoc[0]][gInfo.startLoc[1]] = 0;
                let oldCell = document.getElementById(gInfo.startLoc[0] + "-" + gInfo.startLoc[1]);
                oldCell.style.backgroundColor = "";
            }
        }
        gInfo.startLoc = [x,y];
    }
    else if( settings.nodeType == 1){
        gInfo.graph[x][y] = 2;
        cell.style.backgroundColor = "red";
        if (gInfo.endLoc != 0){
            if( x != gInfo.endLoc[0] || y != gInfo.endLoc[1] ){
                gInfo.graph[gInfo.endLoc[0]][gInfo.endLoc[1]] = 0;
                let oldCell = document.getElementById(gInfo.endLoc[0] + "-" + gInfo.endLoc[1]);
                oldCell.style.backgroundColor = "";        
            }
        }
        gInfo.endLoc = [x,y];
    }
    else{
        if( gInfo.graph[x][y] != 2 && gInfo.graph[x][y] != 1) {
            if( gInfo.graph[x][y] == 3){
                cell.style.backgroundColor = "";
                gInfo.graph[x][y] = 0;
            }
            else{
                cell.style.backgroundColor = "black";
                gInfo.graph[x][y] = 3;
            }   
        }    
    }
    console.log(gInfo.graph);
}

function selectOnChange(e){
    if(e.target.id == "node-select"){
        settings.nodeType = e.target.options.selectedIndex;
    }
    else if (e.target.id == "alg-select"){
        settings.algType = e.target.options.selectedIndex;
    }
}

