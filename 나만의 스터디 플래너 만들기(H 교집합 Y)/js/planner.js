// <----------------------------------------- jQuery UI 영역 --------------------------------------------------->

var originPosition; //draggable이 drag 시작할 때 값이 들어옴
var originSize;
var click = {
  x: 0,
  y: 0
};

// inTagBox: 기능 박스에 있는 파츠들(이미 A4 위에 놓여있는 애들은 포함 x), 속성: 자기를 복제해서 드래그되게 하되 이상한 데 가면 제자리로 돌아옴.(revert)
$( function() {

  $( ".inTagBox" ).draggable({
     revert: "invalid",
     helper: "clone",
     appendTo: "#realMainBox"
  });



  // 왜 클래스로 했지 암튼 droppable이라는 건 용지 위에 파츠들(draggable)을 드롭할 수 있게 만드는 코드
  $( ".droppable_mainBox" ).droppable({
    tolerance: 'fit', //테두리 안에 완전히 들어와야 drop으로 인식(걸치는 거 허용 ㄴ)
    drop: function(event, ui) {
      // 복제해야 하는 오브젝트인가? 아니라면 -1을 반환함
      var isCopieable = $.inArray('inTagBox', ui.draggable.prop('classList'));

      if(isCopieable == -1) {
        // console.log("input originposition is "+ originPosition.top)
        historyy.dragged(ui.draggable[0], originPosition);
        return 0;
      }

      // 드래그하는 대상을 복제하고 클래스 넣기
      var newClone = $(ui.helper).clone();
      newClone.removeClass('inTagBox').addClass('draggable');

      var type = getType(newClone[0]);
      // console.log(type);

      // 표일 경우에는 표만, 메모칸일 경우에는 네모만 사이즈 조절하게 하는 코드
      switch(type) {

        case('table'):
          $(newClone).children('table').addClass('resizable');
          break;
        case('div'):
          $(newClone).children('div').addClass('resizable');
          break;
        case('img'):
          $(newClone).children('img').addClass('resizable');
          break;
        default:
          $(newClone).addClass('resizable');
      }

      $(this).append(newClone);

      parts_refresh();
      historyy.added(newClone[0]);

    }

  });


  // droppable_tagBox는 원래 파츠들 있던 표! 여기로 드래그하면 삭제!
  $(".droppable_tagBox").droppable({
    drop: function(event, ui) {
      var isCopieable = $.inArray('inTagBox', ui.draggable.prop('classList'));
      if(isCopieable !== -1) return 0;
      // console.log("remove originposition is "+originPosition.top);
      historyy.removed(ui.draggable[0], originPosition);
      $(ui.draggable).remove();


    }
  });

  // 마우스 올리면 예시 이미지 띄우는 거
  $("#hover").hover(function() {
    $("#example").show();
  }, function() {
    $("#example").hide();
  });

  $( "#accordion" ).accordion({
    collapsible: true,
    heightStyle: "content" //조금 생각해봐야... content
  });

  var setFavBtn = "<button type='button' class='setFavBtn not-fav' onclick='setFav(this);'><img src='images/img_star_inactive.png'></button>"
  var setLineBtn = "<button type='button' class='setLineBtn lined' onclick='setLine(this);'><img src='images/line_active.png'></button>"
  var btnDiv = document.createElement("div");
  btnDiv.setAttribute("class", "btnDiv");

  $(btnDiv).append(setFavBtn);
  $(btnDiv).append(setLineBtn);

  $(".inTagBox-hover").append(btnDiv);

  $(".inTagBox-hover").hover(function() {
    $(this).find(".setFavBtn").css("display", "block");
    $(this).find(".setLineBtn").css("display", "block");
  }, function() {
    $(this).find(".setFavBtn").hide();
    $(this).find(".setLineBtn").hide();
  });




});

// <----------------------------------------- 자바스크립트 함수 영역 --------------------------------------------------->


const classList = ['studyTime', 'phrase', 'date', 'sticker', 'plan', 'reflection', 'time-table', 'memo', 'd-day', 'anything-text', 'anything-table', 'anything-img', 'weekPlan', 'sun', 'night', 'shine-time', 'waterdrop_time', 'logo-seoul', 'logo-korea', 'logo-yonsei', 'img_bit_clock', 'this-week', 'todo-list'];
let children = []; //a4지 위에 배치된 파츠들

let eleList; // 불러오기로 불러온 내용
let newCloneList; // 불러온 내용으로 만든 파츠들

let bgColor = "#B3001F"; // 여백 색깔

let tagBoxOn = false; //아코디언 창 열려있는가?


// 표에서 버튼 누르면 행 추가하는 거
function addColumn(btn) {
  var btnName = btn.name;
  var target = document.querySelectorAll(btnName)[document.querySelectorAll(btnName).length - 1];
  var column;
  if(btnName == '#planTable')
    column = document.querySelector('#column');
  else if(btnName == '#reflectionTable')
    column = document.querySelector('#column2');
  else if(btnName == '#todolist')
    column = document.querySelector('#li1');
  var newColumn = column.cloneNode(true);
  target.appendChild(newColumn);
}

// 표에서 버튼 누르면 행 삭제하는 거
function removeColumn(btn) {
  var btnName = btn.name;
  var target = document.querySelectorAll(btnName)[document.querySelectorAll(btnName).length - 1];
  var lastColumn = target.lastChild;
  //console.log(table.children);
  if(target.children.length <=3) return 0;
  target.removeChild(lastColumn);
}

// 현재 A4 위에 있는 아이들의 [클래스명, 가로, 세로, left, top] 불러오는 거 (표는 행 개수, 새로운 기능은 기능 이름을 추가로 불러옴)
function getElementList() {
  let elementList = Array();

  const c = document.getElementById("realMainBox").children;
  children = [];

  for(i=0; i<c.length; i++) {
    if(c[i].tagName == 'SPAN')
    children.push(c[i]);
  }

  for(i = 0; i < children.length; i++) {
    const child = children[i]; //현재 선택한 자식

    for(k = 0; k < classList.length; k++) {
      const currentClass = classList[k]; // 클래스 목록에서 한 놈 고른 거

      if(child.className.includes(currentClass)) { // 현재 선택한 자식의 클래스들 중 클래스 목록과 겹치는 걸 찾읍시다

        //뉴리스트는 현재 선택한 엘리먼트의 클래스 이름, 크기 등의 정보를 담은 배열입니다
        let newList = Array();
        newList.push(currentClass);

        //함수 개선
        /*
        let width;
        let height;

        let childObject;
        //그 가로 세로 길이 따와야 하는 친구를 childObject로 정하기.

        switch(currentClass) {
          case('plan'):
            childObject = $(child).children('table')[0];
            break;

          case('reflection'):
            //자식 중에서 table인가 찾아서 그 녀석 크기 넣으면 되는데 너무 귀찮당
            childObject = $(child).children('table')[0];
            break;

          case('time-table'):
            //자식 중에서 img 태그인가 그 녀석 크기 넣으면 되는데 너무 귀찮당
            childObject = $(child).children('table')[0];
            break;

          case('memo'):
            //자식 중에서 div였나 찾아서 그 녀석 크기 넣으면 되는데 너무 귀찮당
            childObject = $(child).children('div')[0];
            break;

          default:
            childObject = $(child);
        }

        // $(childObject).css('margin', 0);

        width = $(childObject).css('width');
        height = $(childObject).css('height');




        if(!width) width = childObject.offsetWidth.toString() + 'px';
        if(!height) height = childObject.offsetHeight.toString() + 'px';

        */

        size = getSize(getType(child), child);
        newList.push(size.width, size.height);

        // $(childObject).css('margin', '10px 10px 0 0');
        // 왜 넣었는지 까먹어서 지움...

        // 뉴리스트에 들어가는 거: 클래스명, 가로, 세로, left, top, (선택)(행 또는 이름 또는 이미지 링크 또는 ...)

        //console.log('if cleared '+classList[k]);
        newList.push(child.style.left, child.style.top);
        if(currentClass == 'plan' || currentClass == 'reflection')
          newList.push($(child).find('tbody')[0].childElementCount);

        if(currentClass == 'anything-text')
          newList.push(child.innerText);

        if(currentClass == 'logo')
          newList.push(child.getAttribute('name')); //undefined

        newList.push('/');
        elementList.push(newList);

      }


    }
    // 임시로 array를 만들어서 정보들 다 넣고 그걸 elementList에 넣어야 함.

    // elementList 보면 대충 클래스명, 크기, 위치, (행 개수)가 담긴 배열이 나올 거임


  }

  // elementList.push(document.querySelector("#colorPicker").value);
  elementList.push(prevColor);

// className, width, height, left, top, (column)
  /*
  클래스 이름이랑 클래스 리스트랑 대조해서 일치하는 걸 뽑아내야 함.

  */

  return elementList;
}

function getElementList2() { //just for test
  // let elementList = Array();

  const c = document.getElementById("realMainBox").children;
  children = [];

  for(i=0; i<c.length; i++) {
    if(c[i].tagName == 'SPAN')
    children.push(c[i]);
  }

  var elementList = {};

  for(i = 0; i < children.length; i++) {
    const child = children[i]; //현재 선택한 자식

    for(k = 0; k < classList.length; k++) {
      const currentClass = classList[k]; // 클래스 목록에서 한 놈 고른 거

      if(child.className.includes(currentClass)) { // 현재 선택한 자식의 클래스들 중 클래스 목록과 겹치는 걸 찾읍시다

        //뉴리스트는 현재 선택한 엘리먼트의 클래스 이름, 크기 등의 정보를 담은 배열입니다
        // let newList = Array();

        var type = getType(child);

        var newele = {
          "design_type": "", //구분 가능한 요소(text,  plantable, reflectable, logo, memo, ...)
          "class": "",
          "width": "",
          "height": "",
          "top": "",
          "left": ""
          // "column": "",
          // "content": "",
          // "img_name": "",
        };

        newele.design_type = currentClass;

        size = getSize(type, child);
        newele.width = size.width;
        newele.height = size.height;

        // 뉴리스트에 들어가는 거: 클래스명, 가로, 세로, left, top, (선택)(행 또는 이름 또는 이미지 링크 또는 ...)

        //console.log('if cleared '+classList[k]);
        newele.left = child.style.left;
        newele.top = child.style.top;

        switch(type){
          case('table'):
            newele.column = $(child).find('tbody')[0].childElementCount;
            break;
          case('div'):
            // newele.content = $(child)[0].innerText; // 보류(오류)
            break;
          case('img'):
            newele.img_name = $(child)[0].getAttribute("name");
            break;
          case('text'):
            newele.content = $(child)[0].innerText;
            break;
          default:
            console.log("error occured while disticting type");
            return;
        }

        elementList.push

      }


    }
    // 임시로 array를 만들어서 정보들 다 넣고 그걸 elementList에 넣어야 함.

    // elementList 보면 대충 클래스명, 크기, 위치, (행 개수)가 담긴 배열이 나올 거임


  }

  // elementList.push(document.querySelector("#colorPicker").value);
  elementList.push(prevColor);

// className, width, height, left, top, (column)
  /*
  클래스 이름이랑 클래스 리스트랑 대조해서 일치하는 걸 뽑아내야 함.

  */

  return elementList;
}

/* feedback
function toggle_visibility() {
   var e = document.getElementById('feedback-main');
   if(e.style.display == 'block')
      e.style.display = 'none';
   else
      e.style.display = 'block';
}
*/

// 여백 색 바꾸는 거
function watchColorPicker(event) {
  targetColor = event.target.value;
  setColor(targetColor);
}

// 하하하하하하하
function changeMinWidth() {
  /* 사용자가 300px보다 큰 이미지를 등록할 경우
  그 이미지 크기+100px을
  accordion이랑 태그박스의 최소 너비로 지정
  즉 이미지 등록 기능 만들기 전까진 무쓸모 */
}

function toggleTagBox() {
  if(tagBoxOn == true) { //집어넣을 때
    $("body").css("overflow-x", "hidden");
    $("#tagBox").css("animation-name", "slideout");
    $("#tagBox").css("animation-duration", "0.4s");
    setTimeout('$("#tagBox").css("display", "none");$("#tagBoxParent").css("display", "none"); tagBoxOn = false;', 400);
    $("body").css("overflow-x", "");

  }
  else { //꺼낼 때
    document.querySelector("#tagBoxParent").style.left = document.querySelector("#functions").offsetLeft.toString()+"px";
    $("#tagBox").css("display", "");
    $("#tagBoxParent").css("display", "");
    // $("#functions").css("display", "none");
    tagBoxOn = true;
    $("#tagBox").css("animation-name", "slidein");
    $("#tagBox").css("animation-duration", "0.5s");

  }
}

// 폰트 바꾸는 거
function changeFont() {
  var fFamily;//, fSize;
  fFamily = mySelect.value;

  /*
  switch(mySelect.value) {
    case('Nanum Gothic'):
      fSize = "1em";
      break;
    case('Nanum Myeongjo'):
      fSize = "1em";
      break;
    case('Nanum Pen Script'):
      fSize = "1.4em";
      break;
    case('Noto Serif KR'):
      fSize = "1em";
      break;
    case('Gaegu'):
      fSize = "1em";
      break;
    case('Yeon Sung'):
      fSize = "1em";
      break;
    case('Poor Story'):
      fSize = "1em";
      break;
  }
  */

  $('span').css("font-family", fFamily);
  $('#mySelect').css("font-family", fFamily);
  //도대체 왜 안되는 것일까 -> stackoverflow에 검색해보니 해결책이 없다...
  //select 말고 다른 방법으로 구현하는 걸 검토해봅시다
  //$('td').css("font-size", fSize);
  }

  /*select*/
  $(function() {
  var selectTarget = $('.selectbox select');

  // focus 가 되었을 때와 focus 를 잃었을 때
  selectTarget.on({
    'focus': function() {
      $(this).parent().addClass('focus');
    },
    'blur': function() {
      $(this).parent().removeClass('focus');
    }
  });

  selectTarget.change(function() {
    var select_name = $(this).children('option:selected').text();
    $(this).siblings('label').text(select_name);
    $(this).parent().removeClass('focus');
  });
});

// pdf 파일로 저장하는 거(html2canvas로 캡처를 떠서 jspdf 이용해서 저장)
function savePDF() {

  let title = prompt("파일의 이름을 입력하세요.");

  if(title == null) return;
  if(title == "") title = "plannerPDF";

  $("#realMainBox").css("transform", "scale(1)");
  $("#realMainBox").parent().css("transform", "scale(1)");

  window.scrollTo(0,0);

  $('#myModal2').show();

  html2canvas(document.querySelector("#realMainBox"), {
    dpi: 300,
    onrendered: function(canvas) {
      var imgData = canvas.toDataURL('image/png');
      //console.log('Report Image URL: '+imgData);
      var doc = new jsPDF('landscape', 'mm', 'a4'); //210mm wide and 297mm high

      var imgWidth = 148.5;
      var imgHeight = 210;

      console.log("saving...");

      doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      doc.addImage(imgData, 'PNG', 148.5, 0, imgWidth, imgHeight);

      $.when(doc.save(title + '.pdf')).then(function() {
        console.log("success");
        $('#myModal2').fadeOut();
      });

      // pdf 로딩화면 부분 임시

    }
  });

  $("#realMainBox").css("transform", "scale("+mainBoxScale.toString()+")");
}




// 중간저장: getElementList 해서 구한 배열을 텍스트 파일로 저장하는 거
function saveTxt() {
  let title = prompt("파일의 이름을 입력하세요.");

  if(title == null) return 0;
  if(title == "") title = "plannerSave";

  var elementList = getElementList();

  var blob = new Blob([elementList], {
    type: "text/plain;charset=utf-8"
  });

  saveAs(blob, title+".txt");
}


// 중간저장 파일 읽고, 내용 잘 읽어서 파츠를 만드는 거(노가다 -.-)

function read() {

  var files = this.files;
  if (files.length === 0) {
    console.log('No file is selected');
    return;
  }

  var reader = new FileReader();
  reader.readAsText(files[0]);

  let settingColor;

  reader.onload = function(event) {
    //console.log('File content:', event.target.result);

    const mainBox = document.querySelector("#realMainBox");

    $(mainBox).children('span').remove();

    eleList = event.target.result.split(',/,');

    for(i=0; i<eleList.length; i++) {
      eleList[i] = eleList[i].split(',');
    }

    settingColor = eleList.pop().toString(); //color
    console.log("settingColor is "+settingColor);
    colorPicker.addColor(settingColor, 0);
    colorPicker.removeColor(1);
    setColor(settingColor);
    prevColor = settingColor;
    if(eleList.length === 0) return false;

    if(eleList[eleList.length - 1].indexOf('/') != -1)
      eleList[eleList.length - 1].splice(eleList[eleList.length - 1].indexOf('/'));

    newCloneList = Array(eleList.length);

    for(i=0; i<eleList.length; i++) {
      newCloneList[i] = document.getElementsByClassName(eleList[i][0])[0].cloneNode(true);

      newCloneList[i].style.position = "absolute";

      $(newCloneList[i]).addClass("draggable");
      $(newCloneList[i]).removeClass("inTagBox");

      var type = getType(newCloneList[i]);

      setSize(type, newCloneList[i], eleList[i][1], eleList[i][2]); //width, height

      switch(type) {
        case("table"):

          $(newCloneList[i]).children("table").addClass("resizable");
          break;
        case("div"):

          $(newCloneList[i]).children("div").addClass("resizable");
          break;
        case("img"):

          $(newCloneList[i]).children("img").addClass("resizable");
          break;
        default:

          $(newCloneList[i]).addClass("resizable");
      }

      newCloneList[i].style.left = eleList[i][3]; //left, top
      newCloneList[i].style.top = eleList[i][4];

      if(eleList[i][5]) {
        switch(eleList[i][0]) {
          case("plan"): //column
            for(j=0; j<eleList[i][5]-3; j++) {
              const columnClone = document.querySelector('#column').cloneNode(true);
              $(newCloneList[i]).find('tbody').append(columnClone);
            }
            break;

          case("reflection"):
            for(j=0; j<eleList[i][5]-3; j++) {
              const columnClone = document.querySelector('#column2').cloneNode(true);
              $(newCloneList[i]).find('tbody').append(columnClone);
            }
            break;

          case("anything-text"): //content
            newCloneList[i].innerHTML = eleList[i][5];
            break;

          case("logo"): //src
            newCloneList[i].src = eleList[i][5];
            break;
        }
      }

    }

    for(i=0; i<newCloneList.length; i++) {
      document.querySelector("#realMainBox").appendChild(newCloneList[i]);
    }

    parts_refresh();


  };

  var input = this;
  //console.log(this);

  if(!/safari/i.test(navigator.userAgent)){
    input.type = '';
    input.type = 'file';
  }

}

// 새로운 기능 추가하는 거(원리: 사실.. 기능란에 안 보이게 해놓은 파츠 하나 있어서 그거 복제해서 만듦) 미완성!!
function addNewTag() {
  var value = prompt('기능의 내용을 입력하세요.')
  if(value == "" || value == null) return 0;
  var newClone = document.querySelector('#anything-text').cloneNode(true);

  newClone.style.display = "";
  newClone.removeAttribute("id");
  newClone.setAttribute("class", randomstring);
  newClone.children[0].innerHTML = value; //이 부분을 바꿔야 함.
  document.querySelector('#madebyuser').appendChild(newClone);

  $( ".inTagBox" ).draggable({
    revert: "invalid",
    helper: "clone",
    appendTo: "#realMainBox"
  });

  alert("추가되었습니다.");
}

// <----------------------------------------- 실행 영역 --------------------------------------------------->

// 여백 색상
// document.querySelector("#colorPicker").addEventListener("change", watchColorPicker, false);

// pdf 저장 버튼
document.querySelector('#savePDF').addEventListener('click', savePDF);

// 중간저장 버튼
document.querySelector('#saveTxt').addEventListener('click', saveTxt);

// 불러오기 버튼
document.querySelector('#upload').addEventListener('change', read);

//서버에서 불러오기 버튼

// 새로운 기능 추가하기 버튼
document.querySelector('#addNewTag').addEventListener('click', addNewTag);


// 예시 동영상 버튼
// document.querySelector('#video').addEventListener('click', function() {
//   window.open("https://youtu.be/s_Gw9Y71V7k", "_blank");
// });

document.querySelector('#weekPlanTable').style.height = "200px";

let mainBoxScale = 1;

function zoomIn() { // 머리 쓰기 싫어서 함수를 두 개 썼는데 머리 쓰고 싶을 때 수정
  if(mainBoxScale>=1) return;

  mainBoxScale += 0.1;
  // $("#realMainBox").css("transform", "scale("+mainBoxScale.toString()+")");
  $("#realMainBox").parent().css("transform", "scale("+mainBoxScale.toString()+")");
  $("#scale").html(parseInt(mainBoxScale*100));

  parts_refresh();
}

function zoomOut() {
  if(mainBoxScale<=0.6) return;

  mainBoxScale -= 0.1;
  // $("#realMainBox").css("transform", "scale("+mainBoxScale.toString()+")");
  $("#realMainBox").parent().css("transform", "scale("+mainBoxScale.toString()+")");
  $("#scale").html(parseInt(mainBoxScale*100));

  parts_refresh();
}

document.querySelector("#zoomIn").addEventListener('click', zoomIn);
document.querySelector("#zoomOut").addEventListener('click', zoomOut);

document.querySelector("#default").addEventListener('click', function() {
  mainBoxScale = 1;

  // $("#realMainBox").css("transform", "scale(1)");
  $("#realMainBox").parent().css("transform", "scale(1)");
  $("#scale").html(100);

  parts_refresh();
})

var colorPicker = new iro.ColorPicker('#iroColorPicker', {
  // Set the size of the color picker
  width: 100,
  // Set the initial color to pure red
  color: "FFFFFF"//"#B3001F"
});

colorPicker.on('input:change', function(color) {
  // log the current color as a HEX string
  // console.log(color.hexString);
  bgColor = color.hexString;
  setColor(bgColor);
});

// colorPicker.on('input:start', function(color) {
//   prevColor = color.hexString;
// })

colorPicker.on('input:end', function(color) {
  bgColor = color.hexString;
  historyy.colored(bgColor);

  prevColor = color.hexString;
});

window.addEventListener('resize', function(){
  document.querySelector("#tagBoxParent").style.left = document.querySelector("#functions").offsetLeft.toString()+"px";
  // document.querySelector("#tagBox").style.width = document.querySelector("#functions").offsetWidth.toString()+'px';
  // $(".accordion-title").css("width", document.querySelector("#functions").offsetWidth.toString()+'px');
  // document.querySelector("h3").style.width = document.querySelector("#functions").offsetWidth.toString()+'px';
})


var loadformdata = "";
loadformdata = $("#name").val()

const someInput = document.querySelector('#readfromserver');
someInput.addEventListener('click', readfromserver, false);
someInput.input = loadformdata;

function readfromserver(event) {

    //console.log('File content:', event.target.result);
    const mainBox = document.querySelector("#realMainBox");

    $(mainBox).children('span').remove();

    eleList = event.currentTarget.input.split(',/,');

    for(i=0; i<eleList.length; i++) {
      eleList[i] = eleList[i].split(',');
    }

    settingColor = eleList.pop().toString();
    console.log("settingColor is "+settingColor);
    colorPicker.addColor(settingColor, 0);
    colorPicker.removeColor(1);
    setColor(settingColor);
    prevColor = settingColor;
    if(eleList.length === 0) return false;

    if(eleList[eleList.length - 1].indexOf('/') != -1)
    eleList[eleList.length - 1].splice(eleList[eleList.length - 1].indexOf('/'));

    newCloneList = Array(eleList.length);

    for(i=0; i<eleList.length; i++) {
      newCloneList[i] = document.getElementsByClassName(eleList[i][0])[0].cloneNode(true);

      newCloneList[i].style.position = "absolute";

      $(newCloneList[i]).addClass("draggable");
      $(newCloneList[i]).removeClass("inTagBox");

      var type = getType(newCloneList[i]);

      setSize(type, newCloneList[i], eleList[i][1], eleList[i][2]);

      switch(type) {
        case("table"):

          $(newCloneList[i]).children("table").addClass("resizable");
          break;
        case("div"):

          $(newCloneList[i]).children("div").addClass("resizable");
          break;
        case("img"):

          $(newCloneList[i]).children("img").addClass("resizable");
          break;
        default:

          $(newCloneList[i]).addClass("resizable");
      }

      newCloneList[i].style.left = eleList[i][3];
      newCloneList[i].style.top = eleList[i][4];

      if(eleList[i][5]) {
        switch(eleList[i][0]) {
          case("plan"):
            for(j=0; j<eleList[i][5]-3; j++) {
              const columnClone = document.querySelector('#column').cloneNode(true);
              $(newCloneList[i]).find('tbody').append(columnClone);
            }
            break;

          case("reflection"):
            for(j=0; j<eleList[i][5]-3; j++) {
              const columnClone = document.querySelector('#column2').cloneNode(true);
              $(newCloneList[i]).find('tbody').append(columnClone);
            }
            break;

          case("anything-text"):
            newCloneList[i].innerHTML = eleList[i][5];
            break;

          case("logo"):
            newCloneList[i].src = eleList[i][5];
            break;
        }
      }

    }

    for(i=0; i<newCloneList.length; i++) {
      document.querySelector("#realMainBox").appendChild(newCloneList[i]);
    }

    parts_refresh();


  var input = this;
  //console.log(this);

}

// 서버에서 불러오기 버튼

/*
var text = {
  content: "hello",
  size: {
    width: "100px",
    height: "200px"
  },
  position: {
    top: 25,
    left: 50
  },
  add: function(element){
    //추가
  },
  resize: {
    //사이즈 변경
  },
  drag: {
    //위치 변경
  },
  remove: {
    //삭제
  }
}
*/

/*

element의 state 값을 변경시키고 그 엘리먼트를 stack에 넣자.
add 이벤트 발생(drop으로 볼 수 있겠네..) -> state = add, stack 추가
드롭 -> state=drop, stack 추가
resize -> state=resize, stack 추가
삭제 -> state = remove, stack 추가, 진짜로 remove

*/

/*

var img = {
  src: "",
  size: {
    width:,
    height:
  },
  position: {
    top:,
    left:
  },
  add: function(element){
    //추가, addnewtag 반영..
  },
  resize: {
    //사이즈 변경
  },
  drag: {
    //위치 변경
  },
  remove: {
    //삭제
  }
}

*/

// var a = new history.add();
// getelementlist = 문자열 말고 객체를 만들어서 JSON으로 저장하자 관리하기 쉬움


var historyy = {
  stack: [], //스택, 객체 보관용!
  tempstack: [], //undo한 것들

  undo: function() {

    if(this.stack.length == 0) {
      console.log("undo is not available.");
      return;
    }

    stackobj = this.stack.pop();

    console.log(stackobj);

    //역과정
    switch(stackobj.state) {
      case('add'):
        //대충 table 찾아서 크기 바꿈..
        this.remove(stackobj);
        break;

      case('resize'):
        var targetWidth = stackobj.prevWidth;
        var targetHeight = stackobj.prevHeight;
        this.resize(stackobj, targetWidth, targetHeight);
        break;

      case('drag'):
        var targetTop = stackobj.prevTop;
        var targetLeft = stackobj.prevLeft;
        this.drag(stackobj, targetTop, targetLeft);
        break;

      case('remove'):
        this.drag(stackobj, stackobj.prevTop, stackobj.prevLeft); //삭제 전 위치
        this.add(stackobj);
        break;

      case('color'):
        this.color(stackobj.prevColor);
        prevColor = stackobj.prevColor;
        break;

      //case('default'):
        //색상 변경
    }

    this.tempstack.push(stackobj);

    parts_refresh();


  },
  redo: function() {
    //순과정
    if(this.tempstack.length == 0) {
      console.log("redo is not available.");
      return;
    }

    var stackobj = this.tempstack.pop();

    switch(stackobj.state) {
      case('add'):
        this.add(stackobj);
        break;

      case('resize'):
        this.resize(stackobj, stackobj.width, stackobj.height);
        break;

      case('drag'):
        this.drag(stackobj, stackobj.top, stackobj.left);
        break;

      case('remove'):
        this.remove(stackobj);
        break;

      case('color'):
        this.color(stackobj.color);
        break;
    }

    this.stack.push(stackobj);

    parts_refresh();

  },

  push2stack: function(obj) {
    // stack에 넣기
    // element, colorpicker가 element로 들어옴
    //tempstack 있으면 비울 것
    this.stack.push(obj);
    this.tempstack = [];
  },

  add: function(obj) { //스택에 있는 오브젝트를 생성
    $('#realMainBox').append(obj.ele);
  },

  resize: function(obj, width, height) { //스택에 있는 오브젝트의 크기 변경
    setSize(obj.type, obj.ele, width, height);
    // if(obj.ele.classList.contains('ui-wrapper')){ //ele로 span이 아니라 다른 게 들어온 경우의 처리
    //   setSize('text', obj.ele.children[0], width, height);
    // }
  },

  drag: function(obj, top, left) { //스택에 있는 오브젝트의 위치 변경
    obj.ele.style.top = top;
    obj.ele.style.left = left;
  },

  remove: function(obj) { //스택에 있는 오브젝트를 삭제
    $(obj.ele).remove();
  },

  color: function(color) {
    setColor(color);
  },

  added: function(element) {
    var obj = {
      ele: element,
      // clone: element.cloneNode(true),
      // type: getType(element),
      width: getSize(getType(element), element).width,
      height: getSize(getType(element), element).height,
      top: element.style.top,
      left: element.style.left,
      type: getType(element),
      state: 'add'
    }
    this.push2stack(obj);
    console.log(obj.ele);
  },

  resized: function(element, prevSize) {
    var obj = {
      ele: element,
      width: getSize(getType(element), element).width,
      height: getSize(getType(element), element).height,
      prevWidth: prevSize.width,
      prevHeight: prevSize.height,
      type: getType(element),
      state: 'resize'
    }
    this.push2stack(obj);
    console.log('width is '+getSize(getType(element), element).width);
    console.log('height is '+getSize(getType(element), element).height);

    console.log(obj.ele);
  },

  dragged: function(element, prevPosition) {
    //위치 변경
    var obj = {
      ele: element,
      top: element.style.top,
      left: element.style.left,
      prevTop: prevPosition.top,
      prevLeft: prevPosition.left,
      type: getType(element),
      state: 'drag'
    }
    this.push2stack(obj);
    console.log(obj.ele);
  },

  removed: function(element, prevPosition) {
    //삭제
    var obj = {
      ele: element,
      prevTop: prevPosition.top,
      prevLeft: prevPosition.left,
      state: 'remove'
    }
    this.push2stack(obj);
    console.log(obj.ele);
  },

  colored: function(color) {
    var obj = {
      ele: colorPicker,
      prevColor: prevColor,
      color: color,
      state: 'color'
    }

    this.push2stack(obj);
  }

}

var prevColor = colorPicker.color.hexString;

function getType(ele) {
  //ele.classList.contains('plan') || ele...contains('reflection') || ...
  if(ele.classList.contains('plan') ||
   ele.classList.contains('reflection') ||
    ele.classList.contains('weekPlan') ||
    ele.classList.contains('time-table')) {
      return 'table';
    }
  else if(ele.classList.contains('memo') || ele.classList.contains('todo-list'))
    return 'div';
  else if(ele.classList.contains('logo') || ele.classList.contains('img-only'))
    return 'img';
  else {
    return 'text';
  }
}

function getSize(type, ele) { //return size 객체
  //걍 만들어봄...
  // width 있으면 반환, 없으면 offsetwidth 반환

  switch(type) {
    case('table'):
      childobj = $(ele).children('table')[0];
      break;
    case('div'):
      childobj = $(ele).children('div')[0];
      break;
    case('img'):
      childobj = $(ele).find('img')[0];
      break;
    default: //text 포함
      childobj = $(ele)[0];
      break;
  }

  console.log('childobj is '+childobj);

  var size = {
    width: "",
    height: ""
  }


  size.width = childobj.getBoundingClientRect().width.toString() + "px";
  size.height = childobj.getBoundingClientRect().height.toString() + "px";

  return size;
}

function setSize(type, ele, width, height) {
  switch(type) {
    case('table'):
      $(ele).children('table').css('width', width);
      $(ele).children('table').css('height', height);
      break;
    case('div'):
      $(ele).children('div').css('width', width);
      $(ele).children('div').css('height', height);
      break;
    case('img'):
      $(ele).find('img').css('width', width);
      $(ele).find('img').css('height', height);
      $(ele).find('.ui-wrapper').css('width', width).css('height', height);
      break;
    case('text'): //text 포함
      $(ele).css('width', width);
      $(ele).css('height', height);
      break;
    default:
      console.log('타입 값이 똑바로 안 들어와서 에러가 걸렸읍니다. ㅅㄱ');
  }
}

function setColor(color) {
  colorPicker.addColor(color, 0);
  colorPicker.removeColor(1);
  document.querySelector("#realMainBox").style.backgroundColor = color;
  document.querySelector("caption").style.backgroundColor = color;
}

function selectObj(type, ele) { //버려진 함수...
  switch(type) {
    case('table'):
      return ele.children('table')[0];
      break;
    default:
      return ele;
      //sdfsdfsd
  }
}

function setFav(btn) { //사용자별로 저장되면 좋겠당~ 아님 local storage
  var targetDiv = $(btn).parent("div").parent(".inTagBox-hover")[0];

  if(btn.classList.contains('not-fav')) {
    var newClone = targetDiv.cloneNode(true);
    $(newClone).find(".setFavBtn").css('display', 'none');
    // $(newClone).children(".setFavBtn").switchClass('not-fav', 'fav');
    $(newClone).find(".setLineBtn").css('display', 'none');
    document.querySelector("#favorite").appendChild(newClone);

    $( ".inTagBox" ).draggable({
      revert: "invalid",
      helper: "clone",
      appendTo: "#realMainBox"
    });

    $(".inTagBox-hover").hover(function() {
      $(this).find(".setFavBtn").css("display", "block");
      $(this).find(".setLineBtn").css("display", "block");
    }, function() {
      $(this).find(".setFavBtn").hide();
      $(this).find(".setLineBtn").hide();
    });

    console.log("짜잔~ 즐겨찾기 추가!");

    var myclass;

    for(k = 0; k < classList.length; k++) {
      myclass = classList[k];
      if(targetDiv.children[0].classList.contains(classList[k])) {
        $("."+myclass).parent(".inTagBox-hover").find(".not-fav").switchClass('not-fav', 'fav');
        break;
      }
    }

    $("."+myclass).parent(".inTagBox-hover").find(".fav").children("img").attr("src", "images/img_star_active.png");



    // btn.removeAttribute('class', 'not-fav');
    // btn.setAttribute('class', 'fav');
  }
  else if(btn.classList.contains('fav')) {
    var targetSpan = $(btn).parent("div").parent(".inTagBox-hover").children("span")[0];
    var myclass;
    for(k = 0; k < classList.length; k++) {
      myclass = classList[k];
      if(targetSpan.classList.contains(myclass)) {
        var targetDiv = $("#favorite").find("."+myclass).parent(".inTagBox-hover")[0];
        document.querySelector("#favorite").removeChild(targetDiv);
        // $("#favorite").remove(targetDiv);
        $("."+myclass).parent(".inTagBox-hover").find(".fav").switchClass('fav', 'not-fav');
        // btn.removeAttribute('class', 'fav');
        // btn.setAttribute('class', 'not-fav');
        // $(btn).switchClass('fav', 'not-fav');
        break;
      }
    }

    console.log("띠용~ 즐겨찾기 삭제!");
    $("."+myclass).parent(".inTagBox-hover").find(".not-fav").children("img").attr("src", "images/img_star_inactive.png");


  }
}

function setLine(btn) {
  var targetSpan = $(btn).parent("div").parent(".inTagBox-hover").children("span")[0];

  if(btn.classList.contains('lined')) {
    // targetSpan.style.border = 0;

    var myclass;

    for(k = 0; k < classList.length; k++) {
      myclass = classList[k];
      if(targetSpan.classList.contains(myclass)) {
        $("."+myclass).parent(".inTagBox-hover").find(".lined").switchClass('lined', 'not-lined');
        // console.log($("."+myclass).parent(".inTagBox-hover").children(".lined"));
        $("."+myclass).css('border', '0');
        break;
      }
    }
    $("."+myclass).parent(".inTagBox-hover").find(".not-lined").children("img").attr("src", "images/line_inactive.png");
  }
  else if(btn.classList.contains('not-lined')) {

    var myclass;

    for(k = 0; k < classList.length; k++) {
      myclass = classList[k];
      if(targetSpan.classList.contains(myclass)) {

        if(targetSpan.classList.contains('sticker')) {
          $("."+myclass).css('border', '1.5px solid black');
        }

        else if(targetSpan.classList.contains('elements')) {
          $("."+myclass).css('border-top', '1.5px solid black');
          $("."+myclass).css('border-bottom', '1.5px solid black');
          // $(targetSpan).css('border-top', '1.5px solid black');
          // $(targetSpan).css('border-bottom', '1.5px solid black');
        }

        else {
          alert("띠용? 얘는 선 버튼이 생기면 안 되는데");
          return;
        }

        $("."+myclass).parent(".inTagBox-hover").find(".not-lined").switchClass('not-lined', 'lined');
        $("."+myclass).parent(".inTagBox-hover").find(".lined").children("img").attr("src", "images/line_active.png");
        break;
      }
    }
  }


}

function parts_refresh() { //클론을 만들든가 하면 드래그가 안 되는 등의 문제로..
  $(".resizable").resizable({
    start: function(event, ui) {
      originSize = getSize(getType(ui.element[0]), ui.element[0]);
    },
    stop: function(event, ui) {
      var resizeTarget; //should be span element
      console.log($(ui.element[0]).find('img')[0])
      if(ui.element[0].classList.contains('ui-wrapper')) {
        resizeTarget = ui.element[0].parentElement;
      }
      else {
        resizeTarget = ui.element[0];
      }
      historyy.resized(resizeTarget, originSize);
    }
  });

  $(".draggable").draggable({
    start: function(event, ui) {
      originPosition = {
        top: ui.position.top.toString() + 'px',
        left: ui.position.left.toString() + 'px'
      };
      click.x = event.clientX;
      click.y = event.clientY;
      // console.log("originPosition.top is " + originPosition.top);
    },
    drag: function(event, ui) {
        // This is the parameter for scale()
        var zoom = mainBoxScale;

        var original = ui.originalPosition;

        // jQuery will simply use the same object we alter here
        ui.position = {
            left: (event.clientX - click.x + original.left) / zoom,
            top:  (event.clientY - click.y + original.top ) / zoom
        };
    },
    revert: 'invalid',
    stack: ".elements"
  });
}
//약간 함수 떡칠잼
