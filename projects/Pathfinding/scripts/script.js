let rows = 20;
let cols = 40;

//setup the board
window.onload = () => {
    let nc = document.getElementById("nc");
    let wUnit = 100/cols;
    let hUnit = 100/rows;

    nc.style.gridTemplateColumns = "repeat(" + cols + "," + wUnit + "vw)";
    nc.style.gridAutoRows = hUnit + "vh";
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

//window.addEventListener("click", test );

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



