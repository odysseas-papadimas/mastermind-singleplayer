let box = document.querySelectorAll(".piece");
let hidden = document.querySelectorAll(".hid");
let check = document.querySelector(".check");
let colors = [
  "gray",
  "red",
  "yellow",
  "blue",
  "green",
  "orange",
  "white",
  "purple",
  "black",
];
let hid = ["white", "white", "white", "white"];
let i = 1;
let curRow = 9 - 1; //Which row we are currently\
let curRowColors = ["white", "white", "white", "white"];
let rows = document.querySelectorAll(".row");
let corPos = 0; //Correct position
let wrongPos = 0; //Correct color wrong position

// box.forEach((piece) => {
//   piece.addEventListener("click", () => {
//     piece.classList = `piece ${colors[i++ % colors.length]}`;
//   });
// });

for (let j = 0; j < 4; j++) {
  let child = rows[curRow].children[j + 1];

  child.addEventListener("click", () => {
    child.classList = `piece ${colors[i++ % colors.length]}`;
  });
}

function colorSelect() {}

function randomHidden() {
  let remain = colors;
  colors.splice(2, 1);
  for (let j = 0; j < 4; j++) {
    hid[j] = remain[Math.floor(Math.random() * remain.length)];
    remain = remain.filter((color) => color != hid[j]);
    console.log(hid[j]);
  }
}

randomHidden();

check.addEventListener("click", rowCheck);

function rowCheck() {
  for (let j = 0; j < 4; j++) {
    curRowColors[j] = rows[curRow].children[j + 1].classList[1];
  }
  console.log(curRowColors, hid);
  if (arrayEquals(curRowColors, hid)) {
    console.log("NICE");
    for (let j = 0; j < 4; j++) {
      hidden[j].classList = `hid hidden${j + 1} ${hid[j]}`;
      console.log(hidden[j]);
    }
    window.alert("GG");
  }

  compareRows(curRowColors, hid);

  nextRow();
}

function arrayEquals(a, b) {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
}

function compareRows(cur, hid) {
  for (let j = 0; j < 4; j++) {
    if (cur[j] == hid[j]) {
      corPos++;
    }
    for (let k = 0; k < 4; k++) {
      if (cur[j] != hid[j] && cur[j] == hid[k]) {
        wrongPos++;
      }
    }
  }

  console.log(wrongPos, corPos);

  rows[curRow].children[0].textContent = wrongPos;
  rows[curRow].children[5].textContent = corPos;
  corPos = 0;
  wrongPos = 0;
}

function nextRow() {
  curRow--;
  console.log(rows[curRow]);

  for (let j = 0; j < 4; j++) {
    let child = rows[curRow].children[j + 1];

    child.addEventListener("click", () => {
      child.classList = `piece ${colors[i++ % colors.length]}`;
    });
  }
}
