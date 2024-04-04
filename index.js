//전역 변수

//랜덤으로 사진이 생성되는 html 코드
const setPuzzleItem = () => {
  const wrapper = document.querySelector("#puzzle-wrapper");
  for (let i = 0; i < 9; i++) {
    const puzzleItem = document.createElement("div");
    const imageTag = document.createElement("img");
    puzzleItem.classList.add("puzzle-item");
    puzzleItem.draggable = true;
    //puzzleItem.style.backgroundImage = `url(./img/${1 + i}.png)`;

    puzzleItem.id = 1 + i;

    puzzleItem.ondragstart = getColorEvent;
    puzzleItem.ondragover = onHoverEvent;
    puzzleItem.ondrop = setColorEvent;
    imageTag.setAttribute("data-index", i);

    imageTag.src = `./img/${1 + i}.png`;

    wrapper.appendChild(puzzleItem);
    puzzleItem.appendChild(imageTag);
  }
};

setPuzzleItem();

const getPuzzleItem = () => {
  const wrapper = document.querySelector("#puzzle-wrapper-target");
  for (let i = 0; i < 9; i++) {
    const puzzleItem = document.createElement("div");
    const imageTag = document.createElement("img");
    puzzleItem.classList.add("puzzle-item1");
    puzzleItem.draggable = true;
    //puzzleItem.style.backgroundImage = `url(./img/bg.jpg)`;
    puzzleItem.id = 1 + i;

    puzzleItem.ondragstart = getColorEvent;
    puzzleItem.ondragover = onHoverEvent;
    puzzleItem.ondrop = setColorEvent;
    //imageTag.setAttribute("data-index", i);

    imageTag.src = `./img/bg.jpg`;

    wrapper.appendChild(puzzleItem);
    puzzleItem.appendChild(imageTag);
  }
};
getPuzzleItem();

// 이벤트 함수 목록

var dragStartTag = null;
var dragStartBg = null;
var dragStartTagId = null;
var getDataIndex = null;
var setDataIndex = null;
var dragindex = null;
var dragStartParent = null; // 변수 선언 추가
var dropParent = null; // 변수 선언 추가
var boxs = null;

function getColorEvent(e) {
  // color = window.getComputedStyle(e.target).backgroundColor;
  dragStartParent = e.target.parentNode; // 이미지 파일을 감싸고 있는 부모태그
  dragStartTag = e.target; // 이미지 태그
  dragStartBg = e.target.src; // 이미지 파일
  dragindex = dragStartTag.getAttribute("data-index");
  // var boxs = document.querySelectorAll(".puzzle-item");
  // boxs.forEach((box, idx) => {
  //   //console.log(box, idx);
  // });

  //dragStartTagId = e.target.id;
  //console.log(color);
  //console.log(e.target);
  //draggedItemId = e.target.id;
  //console.log(dragStartTag);

  //console.log(e.target.parentElement.getAttribute("data-index"));
  //console.log("getDataIndex :", getDataIndex);
}

function onHoverEvent(e) {
  //console.log("이거 실행됨?");
  e.preventDefault();
}

function setColorEvent(e) {
  //조건문을 활용해서 puzzle-item class 의 div와
  //puzzle-item class1 의 div의 drag & drop 했을 때 위치를 바꿔주는 코드
  let drop = e.target; // 이미지 태그
  let dropParent = e.target.parentNode;
  // drop했을 때 해당 태그의 배경 이미지
  var dropBg = e.target.src; // 이미지 파일

  //console.log(dropParent);
  dropParent.appendChild(dragStartTag);
  dragStartParent.appendChild(drop);
  //console.log(dest);
  //console.log(e);
  //console.log("setDataIndex :", setDataIndex);

  //검증 로직 구현하기
  correct();

  //drag한 이미지태그의 data-index 값과 items의 forEach문을 돌려서 index 값
  //을 비교했을때 9개 모두 맞았을때 알럿창 띄어주는 코드
}

function correct() {
  let item = document.querySelector("#puzzle-wrapper-target");
  let items = document.querySelectorAll(".puzzle-item1");

  // 반복문 9번을 돌껀데, 중간에 검증 오류가 나면 바로 break할거 아닌가?
  var isCorrect = true;

  for (var index = 0; index < 9; index++) {
    // 위 items의 자식인 img태그와 forEach의 idx와 비교

    //console.log(items[index].childNodes[0]);
    // console.log(items[index].childNodes[0].getAttribute("data-index"));

    var dataIndex = items[index].childNodes[0].getAttribute("data-index");
    if (dataIndex == index) {
      // 검증에 성공했을 떄
    } else {
      // 검증에 실패했을 떄
      isCorrect = false;
      break;
    }
  }

  if (isCorrect == true) {
    alert("맞추셨습니다 !");
    window.location.reload();
  } else {
    console.log("아직 못맞춤");
  }
}

// start버튼을 눌렀을 때 발생하는 이벤트 함수
const changeImgEvent = () => {
  const startBtn = document.querySelector(".start-btn");
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
  startBtn.disabled = "true";
};

//reset버튼을 눌렀을때 초기화 되는 함수
const resetBtnEvent = () => {
  window.location.reload();
};
