/* eslint-disable no-undef */
const matriz = [];
let allow = false;

let livingCells = [];
let deadCells = [];

let container = document.querySelector(".grid");

for (let i = 0; i < 50; i++) {
  matriz[i] = new Array(50).fill(false);
}

for (let i = 0; i < matriz.length; i++) {
  for (let j = 0; j < matriz[i].length; j++) {
    container.innerHTML += `<div onclick="checkLife(${i}, ${j} )" id="elem${i}-${j}"  class="grid-item"></div>`;
  }
}

checkLife = (x, y) => {
  let el = document.querySelector(`#elem${x}-${y}`);
  el.classList.toggle("live");

  if (matriz[x][y]) {
    matriz[x][y] = false;
  } else {
    matriz[x][y] = true;
  }

  console.log(x, y);
};

initialState = () => {
  deadCells = [];
  livingCells = [];
  for (let i = 0; i < matriz.length; i++) {
    for (let j = 0; j < matriz[i].length; j++) {
      const contiguousCells = [];

      let topLeft = matriz?.[i - 1]?.[j - 1];
      let top = matriz?.[i - 1]?.[j];
      let topRight = matriz?.[i - 1]?.[j + 1];
      let left = matriz?.[i]?.[j - 1];
      let right = matriz?.[i]?.[j + 1];
      let bottomLeft = matriz?.[i + 1]?.[j - 1];
      let bottom = matriz?.[i + 1]?.[j];
      let bottomRight = matriz?.[i + 1]?.[j + 1];

      contiguousCells.push(
        top,
        topLeft,
        topRight,
        bottom,
        bottomLeft,
        bottomRight,
        left,
        right
      );

      let living = contiguousCells.filter((cell) => cell === true).length;

      if (!matriz[i][j]) {
        if (living === 3) {
          livingCells.push(`${[i]}-${[j]}`);
        }
      } else {
        if (living < 2 || living > 3) {
          deadCells.push(`${[i]}-${[j]}`);
        }
      }
    }
  }
};

changeState = () => {
  livingCells.forEach((cell) => {
    let coord = cell.split("-");
    matriz[coord[0]][coord[1]] = true;
    const el = document.querySelector(`#elem${coord[0]}-${coord[1]}`);
    el.classList.add("live");
  });

  deadCells.forEach((cell) => {
    let coord = cell.split("-");
    matriz[coord[0]][coord[1]] = false;
    const el = document.querySelector(`#elem${coord[0]}-${coord[1]}`);
    el.classList.remove("live");
  });
};

setInterval(() => {
  if (allow) {
    initialState();
    changeState();
  }
}, 200);

startGame = () => {
  allow = true;
};

stopGame = () => {
  allow = false;
};
