//전역 변수
const startBtn = document.querySelector(".start-btn");
const resetBtn = document.querySelector(".reset-btn");

// const setPuzzleItem = () => {
//   for (let i = 0; i < 9; i++) {
//     const wrapper = document.querySelector("#puzzle-wrapper");
//     wrapper.insertAdjacentHTML(
//       "beforeend",
//       `
//     <div class="puzzle-item" draggable="true"
//     ondragstart="getColorEvent(event)"
//     ondragover="onHoverEvent(event)"
//     ondrop="setColorEvent(event)"
//     style="background-image: url(./img/${1 + i}.png)">

//     </div>`
//     );
//   }
// };
// setPuzzleItem();

//랜덤으로 사진이 생성되는 html 코드
const setPuzzleItem = () => {
  const wrapper = document.querySelector("#puzzle-wrapper");
  for (let i = 0; i < 9; i++) {
    const puzzleItem = document.createElement("div");
    puzzleItem.classList.add("puzzle-item");
    puzzleItem.draggable = true;
    puzzleItem.style.backgroundImage = `url(./img/${1 + i}.png)`;
    puzzleItem.id = 1 + i;
    puzzleItem.setAttribute("data-index", i);

    puzzleItem.ondragstart = getColorEvent;
    puzzleItem.ondragover = onHoverEvent;
    puzzleItem.ondrop = setColorEvent;

    wrapper.appendChild(puzzleItem);
  }
};

setPuzzleItem();

// 랜덤으로 생성된 사진을 담는 html 코드
// const getPuzzleItem = () => {
//   for (let i = 0; i < 9; i++) {
//     const wrapper = document.querySelectorAll("#puzzle-wrapper")[1];
//     wrapper.insertAdjacentHTML(
//       "beforeend",
//       `
//     <div class="puzzle-item1"
//     draggable="true"
//     ondragstart="getColorEvent(event)"
//     ondragover="onHoverEvent(event)"
//     ondrop="setColorEvent(event)">
//     ${1 + i}</div>
//     `
//     );
//   }
// };

const getPuzzleItem = () => {
  const wrapper = document.querySelector("#puzzle-wrapper-target");
  for (let i = 0; i < 9; i++) {
    const puzzleItem = document.createElement("div");
    puzzleItem.classList.add("puzzle-item1");
    puzzleItem.draggable = true;
    puzzleItem.id = 1 + i;
    puzzleItem.setAttribute("data-index", i);

    puzzleItem.ondragstart = getColorEvent;
    puzzleItem.ondragover = onHoverEvent;
    puzzleItem.ondrop = setColorEvent;

    wrapper.appendChild(puzzleItem);
  }
};
getPuzzleItem();

// 이벤트 함수 목록

const draged = {
  el: null,
  id: null,
  index: null,
};

// ########## 드래그 시작했을때 ##############
function getColorEvent(e) {
  console.log(e);
  color = window.getComputedStyle(e.target).backgroundColor;
  imageUrl = window.getComputedStyle(e.target).backgroundImage;
  //console.log(color);
  //console.log(e.target);
  draggedItemId = e.target.id;
}

// ########## 드래그 시작하고 이동했을때 ##############
function onHoverEvent(e) {
  //console.log("이거 실행됨?");
  e.preventDefault();
}

// ########## 드래그 시작하고 특정 위치에 놓았을때 ##############

function setColorEvent(e) {
  //조건문을 활용해서 puzzle-item class 의 div와
  //puzzle-item class1 의 div의 drag & drop 했을 때 위치를 바꿔주는 코드
  //그 둘의 div태그 자체의 위치를 바꿔줘
  let dest = e.target;
  let tag = document.getElementById(draggedItemId);
  dest.style.backgroundColor = color;
  dest.style.backgroundImage = imageUrl;
}

// start버튼을 눌렀을 때 발생하는 이벤트 함수
const changeImgEvent = () => {
  let parent = document.querySelector("#puzzle-wrapper");
  // 비어있는 문서 조각(document fragment)을 생성해서 frag 변수에 할당
  let frag = document.createDocumentFragment();

  // parent의 자식 요소들을 랜덤하게 frag에 추가하는 for 루프
  for (let i = 0; i < parent.children.length; i++) {
    let randomIndex = Math.floor(Math.random() * parent.children.length);
    // parent의 자식 요소 중 랜덤하게 선택된 요소를 frag에 추가
    frag.appendChild(parent.children[randomIndex]);
  }

  // frag에 있는 요소들을 parent에 추가
  parent.appendChild(frag);
};

//reset버튼을 눌렀을때 초기화 되는 함수
const resetBtnEvent = () => {
  window.location.reload();
};
