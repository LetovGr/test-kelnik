// -----Генерация JSON файла с объектами

const fs = require("fs");


let elemsArray = [];

for(let i = 0; i<100; i++) {

    let randRooms = getRandomInt(0,5);        
    let elems = {
        star: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 804.88 764.96"><title>star</title><g id="Слой_2" data-name="Слой 2"><g id="Layer_1" data-name="Layer 1"><path d="M513.26,269.25c385,17,369-31,68,209,102,370,142,341-178,130-323,213-281,244-179-130-302-241-318-192,69-209C427.26-89.75,378.26-89.75,513.26,269.25Z"/></g></g></svg>'

    }

    elems.image = getRandomInt(1,13);
    elems.rooms = randRooms;
    elems.name = randRooms === 0 ? "Студия №" + getRandomInt(0,300) : randRooms === 1 ? "Однокомнатая №" + getRandomInt(0,300) : randRooms === 2 ? "Двухкомнатная №" + getRandomInt(0,300) : randRooms === 3 ? "Трехкомнтаная №" + getRandomInt(0,300) :  "Четырехкомнатная №" + getRandomInt(0,300);
    elems.interior = getRandomInt(0,2);
    elems.floor = getRandomInt(1,15);
    elems.s = getRandomInt(30,101);
    elems.price = getRandomInt(3000000,60000000);
    elems.status = getRandomInt(1,4);
    elems.sale = getRandomInt(0,2);
    elems.saleNum = getRandomInt(5,26);
    elems.hot = getRandomInt(0,2);
    elemsArray.push(elems);
}



let stringArray = JSON.stringify(elemsArray);

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

fs.writeFile("./scripts/elements.json", stringArray, "utf8", function(error){
    if(error){
        throw error;
    }
});
