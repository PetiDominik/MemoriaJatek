import * as datas from "./adat.js"

let time = Date.now();
let gameSize = 8;
let currentFlipped = null;
let gameTiles;

$(function () {
    const GAME_DIV = $("#gameContainer");
    gameTiles = getTiles(gameSize);
    GAME_DIV.html(createTiles(gameTiles));

    const TILES = $(".tile");

    TILES.on("click", (event) => {
        let eventTarget = $(event.target);
        tileClick(eventTarget);
    })


    console.log(`Betöltési idő: ${Date.now()-time}ms`);
});

function tileClick(eventTarget) {
    let eventTargetId = parseInt(eventTarget.attr("id").split("-")[1]);

    if (currentFlipped === null) {
        currentFlipped = eventTargetId;
        console.log(currentFlipped);
        return;
    }

    if (gameTiles[currentFlipped].img === gameTiles[eventTargetId].img) {
        console.log("egyezik")

    }
    
    eventTarget.off("click");

    setTimeout(() => {
        currentFlipped = null;
        console.log(currentFlipped);

        eventTarget.on("click", (event) => {
            let eventTarget = $(event.target);
            tileClick(eventTarget);
        });

        console.log("be");
    }, 1000);
    console.log(currentFlipped);
}

function createTiles(tiles) {
    let htmlCode = "";
    let i = 0;

    for (const tile of tiles) {
        htmlCode += `<div><img src="imgs/${tile.img}" alt="${tile.alt}" title="${tile.alt}" id="tile-${i}" class="tile"></div>`;
        i++;
    }
    
    return htmlCode;
}

function getRandomTiles(tilesCount) {
    let remainingTiles = datas.IMGS;
    let tiles = [];

    for (let i = 0; i < tilesCount; i++) {
        let imgId = getRandomNum(0, remainingTiles.length);
    
        tiles.push(remainingTiles[imgId]);
        tiles.push(remainingTiles[imgId]);
        remainingTiles = removeIndexFromList(remainingTiles, imgId);
    }

    return tiles;
}

function getTiles(gameSize) {
    let tiles = getRandomTiles(Math.floor(gameSize / 2));
    return randomizeTiles(tiles);
}

function randomizeTiles(tiles) {

    for (let i = 0; i < tiles.length; i++) {
        let randomNum = getRandomNum(0, tiles.length);
        let cs = tiles[randomNum];

        tiles[randomNum] = tiles[i];
        tiles[i] = cs;
    }
    return tiles
}

function getRandomNum(min, max) {
    return Math.floor((Math.random() * max) + min);
}

function removeIndexFromList(list, index) {
    let newList = [];
    
    for (let i = 0; i < list.length; i++) {
        if (i !== index) {
            newList.push(list[i]);
        }
        
    }
    return newList;
}

