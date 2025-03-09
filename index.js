let time = 28;
let seasonTime = 7;
let over = false;
let totalScore = 0;
const tWidth = 11;
const tLength = 11;

const table = document.querySelector("#table");
const nextShapeTable = document.querySelector("#nextShapeTable");
const missionTable = document.querySelector("#missionTable");

const rotateButton = document.querySelector("#rotate");
const mirrorButton = document.querySelector("#mirror");

const timeCell = document.querySelector("#timeCell");

const totalScoreText = document.querySelector("#totalScoreText");

const springScore = document.querySelector("#tavasz");
const summerScore = document.querySelector("#nyar");
const fallScore = document.querySelector("#osz");
const winterScore = document.querySelector("#tel");

let springScoreValue = 0;
let summerScoreValue = 0;
let fallScoreValue = 0;
let winterScoreValue = 0;

const mission1 = document.querySelector("#mission1");
const mission2 = document.querySelector("#mission2");
const mission3 = document.querySelector("#mission3");
const mission4 = document.querySelector("#mission4");
const missionTds = [mission1, mission2, mission3, mission4];

const missionScoreCounter1 = document.querySelector("#missionScoreCounter1");
const missionScoreCounter2 = document.querySelector("#missionScoreCounter2");
const missionScoreCounter3 = document.querySelector("#missionScoreCounter3");
const missionScoreCounter4 = document.querySelector("#missionScoreCounter4");
const mountainScoreCounter = document.querySelector("#mountainScoreCounter");
let mountainScore = 0;
let mission1score = 0;
let mission2score = 0;
let mission3score = 0;
let mission4score = 0;

const currentSeasonText = document.querySelector("#currentSeasonText");
const timeLeft = document.querySelector("#timeLeft");
const allTimeLeft = document.querySelector("#allTimeLeft");

const seasons = ["Tavasz (A, B)", "Nyár (B, C)", "Ősz(C, D)", "Tél (D, A)"];
let seasonsCounter = 0;
//types:
//water
//town
//forest
//farm
const elements = [
    {
        time: 2,
        type: 'water',
        shape: [[1,1,1],
                [0,0,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'town',
        shape: [[1,1,1],
                [0,0,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false        
    },
    {
        time: 1,
        type: 'forest',
        shape: [[1,1,0],
                [0,1,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'farm',
        shape: [[1,1,1],
                [0,0,1],
                [0,0,0]],
            rotation: 0,
            mirrored: false  
        },
    {
        time: 2,
        type: 'forest',
        shape: [[1,1,1],
                [0,0,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'town',
        shape: [[1,1,1],
                [0,1,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'farm',
        shape: [[1,1,1],
                [0,1,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 1,
        type: 'town',
        shape: [[1,1,0],
                [1,0,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 1,
        type: 'town',
        shape: [[1,1,1],
                [1,1,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 1,
        type: 'farm',
        shape: [[1,1,0],
                [0,1,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 1,
        type: 'farm',
        shape: [[0,1,0],
                [1,1,1],
                [0,1,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'water',
        shape: [[1,1,1],
                [1,0,0],
                [1,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'water',
        shape: [[1,0,0],
                [1,1,1],
                [1,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'forest',
        shape: [[1,1,0],
                [0,1,1],
                [0,0,1]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'forest',
        shape: [[1,1,0],
                [0,1,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'water',
        shape: [[1,1,0],
                [1,1,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
]

const missions = 
[
    //basic
    {
      "title": "Az erdő széle",
      "description": "A térképed szélével szomszédos erdőmezőidért egy-egy pontot kapsz."
    },
    {
      "title": "Álmos-völgy",
      "description": "Minden olyan sorért, amelyben három erdőmező van, négy-négy pontot kapsz."
    },
    {
      "title": "Krumpliöntözés",
      "description": "A farmmezőiddel szomszédos vízmezőidért két-két pontot kapsz."
    },
    {
      "title": "Határvidék",
      "description": "Minden teli sorért vagy oszlopért 6-6 pontot kapsz."
    },
    

    //extra
    {
      "title": "Fasor",
      "description": "A leghosszabb, függőlegesen megszakítás nélkül egybefüggő erdőmezők mindegyikéért kettő-kettő pontot kapsz. Két azonos hosszúságú esetén csak az egyikért."
    },
    {
      "title": "Gazdag város",
      "description": "A legalább három különböző tereptípussal szomszédos falurégióidért három-három pontot kapsz."
    },
    {
      "title": "Öntözőcsatorna",
      "description": "Minden olyan oszlopodért, amelyben a farm illetve a vízmezők száma megegyezik, négy-négy pontot kapsz. Mindkét tereptípusból legalább egy-egy mezőnek lennie kell az oszlopban ahhoz, hogy pontot kaphass érte."
    },
    {
      "title": "Mágusok völgye",
      "description": "A hegymezőiddel szomszédos vízmezőidért három-három pontot kapsz."
    },
    {
      "title": "Üres telek",
      "description": "A városmezőiddel szomszédos üres mezőkért 2-2 pontot kapsz."
    },
    {
      "title": "Sorház",
      "description": "A leghosszabb, vízszintesen megszakítás nélkül egybefüggő falumezők mindegyikéért kettő-kettő pontot kapsz."
    },
    {
      "title": "Páratlan silók",
      "description": "Minden páratlan sorszámú teli oszlopodért 10-10 pontot kapsz."
    },
    {
      "title": "Gazdag vidék",
      "description": "Minden legalább öt különböző tereptípust tartalmazó sorért négy-négy pontot kapsz."
    }
]

let activeMissions = [];
function activeMissionsSelect(){
    while (activeMissions.length !== 4){
        let num = random(1,missions.length)-1;
        if (!activeMissions.includes(missions[num])){
            activeMissions.push(missions[num]);
        }
    }
}

function missionTableFill(){
    for (let i = 0; i < 4; i++){
        missionTds[i].style.backgroundImage = backgroundFind(activeMissions[i].title);
    }
}

function backgroundFind(title){
    let str = "";
    switch (title) {
        case "Az erdő széle":
            str = "url(missions/erdoszele.png)";
            break;
        case "Krumpliöntözés":
            str = "url(missions/krumpliontozes.png)";
            break;
        case "Álmos-völgy":
            str = "url(missions/almosvolgy.png)";
            break;
        case "Határvidék":
            str = "url(missions/hatarvidek.png)";
            break;
        case "Fasor":
            str = "url(missions/fasor.png)";
            break;
        case "Gazdag város":
            str = "url(missions/gazdagvaros.png)";
            break;
        case "Öntözőcsatorna":
            str = "url(missions/ontozocsatorna.png)";
            break;
        case "Mágusok völgye":
            str = "url(missions/magusokvolgye.png)";
            break;
        case "Üres telek":
            str = "url(missions/urestelek.png)";
            break;
        case "Sorház":
            str = "url(missions/sorhaz.png)";
            break;
        case "Páratlan silók":
            str = "url(missions/paratlansilok.png)";
            break;
        case "Gazdag vidék":
            str = "url(missions/gazdagvidek.png)";
            break;    
        default:
            break;
    }

    return str;
}

activeMissionsSelect();
missionTableFill();
mission1.style.opacity = "1.0";
mission2.style.opacity = "1.0";
mission3.style.opacity = "0.5";
mission4.style.opacity = "0.5";

missionScoreCounter1.innerHTML = activeMissions[0].title + ": 0 pont"; 
missionScoreCounter2.innerHTML = activeMissions[1].title + ": 0 pont"; 
missionScoreCounter3.innerHTML = activeMissions[2].title + ": 0 pont"; 
missionScoreCounter4.innerHTML = activeMissions[3].title + ": 0 pont";
mountainScoreCounter.innerHTML = "Bekerített hegymezők: 0 pont"; 

function missionByName(name){
    let score = 0;

    switch (name) {
        case "Az erdő széle":
            score += erdoszele();
            break;
        case "Krumpliöntözés":
            score += krumpli();
            break;
        case "Álmos-völgy":
            score += almosvolgy();
            break;
        case "Határvidék":
            score += hatarvidek();
            break;
        case "Fasor":
            score +=  fasor();
            break;
        case "Gazdag város":
            score += gazdagvaros();
            break;
        case "Öntözőcsatorna":
            score += ontozocsatorna();
            break;
        case "Mágusok völgye":
            score += magusokvolgye();
            break;
        case "Üres telek":
            score += urestelek();
            break;
        case "Sorház":
            score += sorhaz();
            break;
        case "Páratlan silók":
            score += paratlansilok();
            break;
        case "Gazdag vidék":
            score += gazdagvidek();
            break;    
        default:
            break;
    }

    return score;
}

function scoreBySeason(){
    let score1 = 0;
    let score2 = 0;
    switch (seasonsCounter) {
        case 0:
            score1 += missionByName(activeMissions[0].title);
            score2 += missionByName(activeMissions[1].title);
            mountainScore += mountainCheck();
            springScoreValue = score1 + score2 + mountainScore;
            springScore.innerHTML = "Tavasz: " + springScoreValue + " pont";
            
            mission1.style.opacity = "0.5";
            mission2.style.opacity = "1.0";
            mission3.style.opacity = "1.0";
            mission4.style.opacity = "0.5";

            mission1score += score1;
            mission2score += score2;

            missionScoreCounter1.innerHTML = activeMissions[0].title + ": " + mission1score + " pont"; 
            missionScoreCounter2.innerHTML = activeMissions[1].title + ": " + mission2score + " pont"; 
            break;
        case 1:
            score1 += missionByName(activeMissions[1].title);
            score2 += missionByName(activeMissions[2].title);
            mountainScore += mountainCheck();
            summerScoreValue = score1 + score2 + mountainScore;
            summerScore.innerHTML = "Nyár: " + summerScoreValue + " pont";

            mission1.style.opacity = "0.5";
            mission2.style.opacity = "0.5";
            mission3.style.opacity = "1.0";
            mission4.style.opacity = "1.0";

            mission2score += score1;
            mission3score += score2;

            missionScoreCounter2.innerHTML = activeMissions[1].title + ":" + mission2score + " pont"; 
            missionScoreCounter3.innerHTML = activeMissions[2].title + ":" + mission3score + " pont"; 
            break;
        case 2:
            score1 += missionByName(activeMissions[2].title);
            score2 += missionByName(activeMissions[3].title);
            mountainScore += mountainCheck();
            fallScoreValue = score1 + score2 + mountainScore;
            fallScore.innerHTML = "Ősz: " + fallScoreValue + " pont";
            
            mission1.style.opacity = "1.0";
            mission2.style.opacity = "0.5";
            mission3.style.opacity = "0.5";
            mission4.style.opacity = "1.0";

            mission3score += score1;
            mission4score += score2;

            missionScoreCounter3.innerHTML = activeMissions[2].title + ":" + mission3score + " pont"; 
            missionScoreCounter4.innerHTML = activeMissions[3].title + ":" + mission4score + " pont"; 
            break;
        case 3:
            score1 += missionByName(activeMissions[3].title);
            score2 += missionByName(activeMissions[0].title);
            mountainScore += mountainCheck();
            winterScoreValue = score1 + score2 + mountainScore;
            winterScore.innerHTML = "Tél: " + winterScoreValue + " pont";
            
            mission1.style.opacity = "0.5";
            mission2.style.opacity = "0.5";
            mission3.style.opacity = "0.5";
            mission4.style.opacity = "0.5";

            mission4score += score1;
            mission1score += score2;

            missionScoreCounter4.innerHTML = activeMissions[3].title + ":" + mission4score + " pont"; 
            missionScoreCounter1.innerHTML = activeMissions[0].title + ":" + mission1score + " pont"; 
            break;
        default:
            break;
    }

    return [score1, score2];
}

let rows = []
for (let i = 0; i < tLength; i++){
    let str = "" + i;
    rows.push(document.getElementById(str));
}

//mountain tiles
//(sor, oszlop) => (2,2), (4,9), (6,4), (9,10), (10,6)
rows[1].cells[1].style.backgroundImage = "url(assets/mountain_tile.png)";
rows[1].cells[1].className = "mountain";
rows[3].cells[8].style.backgroundImage = "url(assets/mountain_tile.png)";
rows[3].cells[8].className = "mountain";
rows[5].cells[3].style.backgroundImage = "url(assets/mountain_tile.png)";
rows[5].cells[3].className = "mountain";
rows[8].cells[9].style.backgroundImage = "url(assets/mountain_tile.png)";
rows[8].cells[9].className = "mountain";
rows[9].cells[5].style.backgroundImage = "url(assets/mountain_tile.png)";
rows[9].cells[5].className = "mountain";

//valszeg nem
let num = random(1,15);
let nextElement = elements[num];
nextShapeFill(nextElement.shape, nextElement.type);
timeCell.innerHTML = nextElement.time;

//creating a matrix for the tds
let td_matrix = [];
for (let i = 0; i < 11; i++){
    let tmp = [];
    for (let j = 0; j < 11; j++){
        tmp.push(rows[i].cells[j]);
    }
    td_matrix.push(tmp);
}

let ipos = 0;
let jpos = 0;

table.addEventListener("mouseover", outline);
function outline(e){
    
    let pattern = nextElement.shape;
    patternLength = patLen(pattern);

    if ((e.target.matches("td")) && (!over)){
        let tmp = e.target.id.split(",");
        ipos = parseInt(tmp[0]);
        jpos = parseInt(tmp[1]);
        let ShapeArray = shapeArray(pattern, ipos, jpos);

        if ((ShapeArray.length === patternLength) && (coordCheck(ShapeArray, patternLength))){
            ShapeArray.forEach(td => {
                td.style.border = "2px solid green";
                td.style.opacity = 0.5;
            });
        }
        else if (!coordCheck(ShapeArray, patternLength)){
            ShapeArray.forEach(td => {
                td.style.border = "2px solid red";
                td.style.opacity = 0.5;
            });    
        }
    }
}

table.addEventListener("mouseout", function(e){
    td_matrix.forEach(tr => {
        tr.forEach(td => {
            td.style.border = "2px solid white";
            td.style.opacity = 1.0;
            td.style.backgroundColor = "white";
        });
    });

})

table.addEventListener("click", placeShape);
function placeShape(e){

    let pattern = nextElement.shape;
    patternLength = patLen(pattern);

    if ((e.target.matches("td")) && (!over)){
        let tmp = e.target.id.split(",");
        ipos = parseInt(tmp[0]);
        jpos = parseInt(tmp[1]);
        
        let ShapeArray = shapeArray(pattern, ipos, jpos);

        if ((ShapeArray.length === patternLength) && (coordCheck(ShapeArray, patternLength))){
            ShapeArray.forEach(td => {
                td.style.backgroundImage = tileToPut(nextElement.type);
                td.className = nextElement.type;
            });
            
            seasonTime = seasonTime - nextElement.time;
            time = time - nextElement.time;
                      
            if (time <= 0){
                time = 0;
                seasonTime = 0;
                over = true;

                //ezt a console logot azert hagytam bent, mert a minimum kovetelmenyben benne van,
                //hogy mindenkeppen ki kell iratni a hatarvidek pontszamat a 28 idoegyeg eltelte utan
                console.log("hatarvidek: " + hatarvidek());
            }
            
            if ((seasonTime <= 0) || (time < 0)){
                let scoreArray = scoreBySeason();
                let score1 = scoreArray[0];
                let score2 = scoreArray[1];

                totalScore += (score1 + score2 + mountainScore);
                totalScoreText.innerHTML = "Összesen: " + totalScore + " pont";
                mountainScoreCounter.innerHTML = "Bekerített hegymezők: " + mountainScore + " pont";

            }

            if ((seasonTime <= 0)&& (!over)){
                seasonTime = 7;              
                seasonsCounter++;
            }

            currentSeasonText.innerHTML = "Jelenlegi évszak: " + seasons[seasonsCounter];
            timeLeft.innerHTML = "Évszakból hátralévő idő: " + seasonTime;
            allTimeLeft.innerHTML = "Összesen hátralévő idő: " + time;
            
            num = random(1,15);
            nextElement = elements[num];
            nextShapeFill(nextElement.shape, nextElement.type);
            timeCell.innerHTML = nextElement.time;      
        }   
    }
    else if((e.target.matches("td")) && (over)){
        alert("Véget ért a játék.");
    }
}

mirrorButton.addEventListener("click", function(e){
    if (!nextElement.mirrored){
        nextElement.mirrored = true;
        nextElement.shape = mirrorShape(nextElement.shape);
        nextShapeFill(nextElement.shape, nextElement.type);
    }
    else{
        nextElement.mirrored = false;
        nextElement.shape = mirrorShape(nextElement.shape);
        nextShapeFill(nextElement.shape, nextElement.type);
    }
})

rotateButton.addEventListener("click", function(e){
    if (nextElement.rotation < 3){
        nextElement.rotation += 1;
        nextElement.shape = rotateShape(nextElement.shape);
        nextShapeFill(nextElement.shape, nextElement.type);
    }
    else{
        nextElement.rotation = 0;
        nextElement.shape = rotateShape(nextElement.shape);
        nextShapeFill(nextElement.shape, nextElement.type);
    }
})

function shapeArray(pattern, ipos, jpos){
    let result = [];
    
    for (let i = 0; i < 3; i++){
        let tmpi = i-1;
        for (let j = 0; j < 3; j++){
            let tmpj = j - 1;
            if (pattern[i][j] === 1){
                if ((ipos+tmpi <= 10) && (jpos+tmpj <= 10) && (ipos+tmpi >= 0) && (jpos + tmpj >= 0)){
                    result.push(td_matrix[ipos+tmpi][jpos+tmpj]);
                }
            }
        }
    }
    
    return result;    
}

function coordArray(pattern, ipos, jpos){
    let result = [];
    
    for (let i = 0; i < 3; i++){
        
        let tmp = [];
        for (let j = 0; j < 3; j++){
            tmp = [];
            if (pattern[i][j] === 1){
                if ((ipos+i <= 10) && (jpos+j <= 10) && (ipos+i >= 0) && (jpos+j >= 0)){
                    tmp.push(ipos+i);
                    tmp.push(jpos+j);    
                }
                
            }
            if (tmp.length != 0){
                result.push(tmp);
            }
        }
        

    }
    return result;
}

function coordCheck(shapeArray, patternLength){
    if (shapeArray.length === patternLength){
        for (td of shapeArray){
            if (td.className !== ""){
                return false;
            }
        }
    }
    return true;    
}

function patLen(pattern){
    let db = 0;
    for (let i = 0; i < 3; i++){
        for (let j = 0; j < 3; j++){
            if (pattern[i][j] === 1){
                db++;
            }
        }
    }
    return db;
}

function random(a, b){
    return Math.floor(Math.random() * (b - a + 1)) + a;
}

function nextShapeFill(pattern, type){
    let img = "url()";
    switch (type) {
        case "water":
            img = "url(assets/water_tile.png)";
            break;
        case "forest":
            img = "url(assets/forest_tile.png)";
            break;
        case "town":
            img = "url(assets/village_tile.png)";
            break;
        case "farm":
            img = "url(assets/plains_tile.png)";
            break;
        default:
            break;
    }

    for (let i = 0; i < 3; i++){
        for (let j = 0; j < 3; j++){
            if (pattern[i][j] === 1){
                nextShapeTable.rows[i].cells[j].style.backgroundImage = img;
            }
            else{
                nextShapeTable.rows[i].cells[j].style.backgroundImage = "none";
            }
        }
    }
}

function tileToPut(type){
    let img = "url()";
    switch (type) {
        case "water":
            img = "url(assets/water_tile.png)";
            break;
        case "forest":
            img = "url(assets/forest_tile.png)";
            break;
        case "town":
            img = "url(assets/village_tile.png)";
            break;
        case "farm":
            img = "url(assets/plains_tile.png)";
            break;
        default:
            break;
    }

    return img;
}

function mirrorShape(pattern){
    let mirrored = [[0, pattern[0][1] ,0], [0, pattern[1][1], 0], [0, pattern[2][1], 0]];
    for (let i = 0; i < 3; i++){
        //let tmp = [];
        if (pattern[i][0] === 1) mirrored[i][2] = 1;
        if (pattern[i][2] === 1) mirrored[i][0] = 1;
    }

    return mirrored;
}

function rotateShape(pattern){
    let rotated = [[0, 0, 0], [0, pattern[1][1], 0], [0, 0, 0]];
    //sarkak
    rotated[0][2] = pattern[0][0];
    rotated[2][2] = pattern[0][2];
    rotated[2][0] = pattern[2][2];
    rotated[0][0] = pattern[2][0];
    //belsok
    rotated[1][2] = pattern[0][1];
    rotated[2][1] = pattern[1][2];
    rotated[1][0] = pattern[2][1];
    rotated[0][1] = pattern[1][0];

    return rotated;
}

function hatarvidek(){
    let score = 0;
    for (let i = 0; i < 11; i++){
        let filled = true;
        for (let j = 0; j < 11; j++){
            if (td_matrix[i][j].className === ""){
                filled = false;
            }
        }

        if (filled){
            score += 6;
        }
    }

    for (let j = 0; j < 11; j++){
        let filled = true;
        for (let i = 0; i < 11; i++){
            if (td_matrix[i][j].className === ""){
                filled = false;
            }
        }

        if (filled){
            score += 6;
        }
    }

    return score;
}

function erdoszele(){
    let score = 0;

    for (let ind = 0; ind < 11; ind++){
        if (td_matrix[0][ind].className === "forest"){score += 1;}  
        if (td_matrix[10][ind].className === "forest"){score += 1;}
        if (td_matrix[ind][0].className === "forest"){score += 1;}
        if (td_matrix[ind][10].className === "forest"){score += 1;}  
    }

    return score;
}

function almosvolgy(){
    let score = 0;
    for (let i = 0; i < 11; i++){
        let forestSum = 0;
        for (let j = 0; j < 11; j++){
            if (td_matrix[i][j].className === "forest"){
                forestSum++;
            }
        }
        if (forestSum === 3){
            score += 4;
        }
    }

    return score;
}

function krumpli(){
    let score = 0;
    for (let i = 0; i < 11; i++){
        for (let j = 0; j < 11; j++){
            if (td_matrix[i][j].className === "farm"){
                score += krumpliCheck(i, j);
            }
        }
    }

    return score;
}

function krumpliCheck(ipos, jpos){
    let score = 0;
        
    if (jpos+1 <= 10){
        if (td_matrix[ipos][jpos+1].className === "water"){score+= 2;}
    }
    if (jpos-1 >= 0){
        if (td_matrix[ipos][jpos-1].className === "water"){score+= 2;}
    }
    if (ipos+1 <= 10){   
        if (td_matrix[ipos+1][jpos].className === "water"){score+= 2;}
    }
    if (ipos-1 >= 0){
        if (td_matrix[ipos-1][jpos].className === "water"){score+= 2;}
    }

    return score;
}

function mountainCheck(){
    let score = 0;
    for (let i = 0; i < 11; i++){
        for (let j = 0; j < 11; j++){
            if (td_matrix[i][j].className === "mountain"){
                if ((td_matrix[i][j+1].className !== "") &&
                (td_matrix[i][j-1].className !== "") &&
                (td_matrix[i+1][j].className !== "") &&
                (td_matrix[i-1][j].className !== "")){
                    score++;
                }
            }
        }
    }

    return score;
}
//mukodik
function fasor(){
    let longest = 0;
    
    for (let j = 0; j < 11; j++){
        let current = 0;
        for (let i = 0; i < 11; i++){
            if (td_matrix[i][j].className === "forest"){
                current += 1;
            }
            else if (td_matrix[i][j].className !== "forest"){
                if (current > longest){
                    longest = current;
                }
                current = 0;
            }
        }
    }

    return (longest * 2);
}

//mukodik
function gazdagvaros(){
    let score = 0;

    for (let i = 0; i < 11; i++){
        for (let j = 0; j < 11; j++){
            let types = [];
            if (td_matrix[i][j].className === "town"){
                if ((j+1 <= 10) && (!types.includes(td_matrix[i][j+1].className) && (td_matrix[i][j+1].className !== ""))){
                    types.push(td_matrix[i][j+1].className);
                }
                if ((j-1 >= 0) && (!types.includes(td_matrix[i][j-1].className) && (td_matrix[i][j-1].className !== ""))){
                    types.push(td_matrix[i][j-1].className);
                }
                if ((i+1 <= 10) && (!types.includes(td_matrix[i+1][j].className) && (td_matrix[i+1][j].className !== ""))){
                    types.push(td_matrix[i+1][j].className);
                }
                if ((i-1 >= 0) && (!types.includes(td_matrix[i-1][j].className) && (td_matrix[i-1][j].className !== ""))){
                    types.push(td_matrix[i-1][j].className);
                }
                
            }

            if (types.length >= 3){
                score += 3;
            }
        }
    }

    return score;
}

//mukodik
function ontozocsatorna(){
    let score = 0;

    for (let j = 0; j < 11; j++){
        let farmCount = 0;
        let waterCount = 0;
        for (let i = 0; i < 11; i++){
            if (td_matrix[i][j].className === "water"){
                waterCount++;
            }
            else if(td_matrix[i][j].className === "farm"){
                farmCount++;
            }
        }

        if ((farmCount >= 1) && (waterCount >= 1) && (waterCount === farmCount)){
            score += 4;
        }
    }

    return score;
}

//mukodik
function magusokvolgye(){
    let score = 0;

    for (let i = 0; i < 11; i++){
        for (let j = 0; j < 11; j++){
            if (td_matrix[i][j].className === "mountain"){
                if (td_matrix[i][j+1].className === "water"){ score += 3; }
                if (td_matrix[i][j-1].className === "water"){ score += 3; }
                if (td_matrix[i+1][j].className === "water"){ score += 3; }
                if (td_matrix[i-1][j].className === "water"){ score += 3; }
            }
        }
    }

    return score;
}

//mukodik
function urestelek(){
    let score = 0;

    for (let i = 0; i < 11; i++){
        for (let j = 0; j < 11; j++){
            if (td_matrix[i][j].className === "town"){
                if ((j+1 <= 10) &&  (td_matrix[i][j+1].className === "")){ score += 2; }
                if ((j-1 >= 0) && (td_matrix[i][j-1].className === "")){ score += 2; }
                if ((i+1 <= 10) && (td_matrix[i+1][j].className === "")){ score += 2; }
                if ((i-1 >= 0) && (td_matrix[i-1][j].className === "")){ score += 2; }
            }
        }
    }
    
    return score;
}

//mukodik
function sorhaz(){
    let longest = 0;
    
    for (let i = 0; i < 11; i++){
        let current = 0;
        for (let j = 0; j < 11; j++){
            if (td_matrix[i][j].className === "town"){
                current += 1;
            }
            else if (td_matrix[i][j].className !== "town"){
                if (current > longest){
                    longest = current;
                }
                current = 0;
            }
        }
    }

    return (longest * 2);
}

//mukodik
function paratlansilok(){
    let score = 0;
    
    for (let j = 0; j < 11; j++){
        let filled = true;
        if (j % 2 === 0){
            for (let i = 0; i < 11; i++){
                if (td_matrix[i][j].className === ""){
                    filled = false;
                }
            }

            if (filled){
                score += 10;
            }
        }        
    }

    return score;    
}

//mukodik
function gazdagvidek(){
    let score = 0;

    for (let i = 0; i < 11; i++){
        let types = [];
        for (let j = 0; j < 11; j++){
            if ((!types.includes(td_matrix[i][j].className)) && (td_matrix[i][j].className !== "")){
                types.push(td_matrix[i][j].className);
            }
        }

        if (types.length >= 5){
            score += 4;
        }
    }

    return score;
}