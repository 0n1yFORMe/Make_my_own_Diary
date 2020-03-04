// <----------------------------------------- jQuery UI 영역 --------------------------------------------------->

// inTagBox: 기능 박스에 있는 파츠들(이미 A4 위에 놓여있는 애들은 포함 x), 속성: 자기를 복제해서 드래그되게 하되 이상한 데 가면 제자리로 돌아옴.(revert)
$( ".inTagBox" ).draggable({
   revert: "invalid",
   helper: "clone",
   appendTo: "#realMainBox"
   //ㅋsㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ
});

$( "#accordion" ).accordion({
  collapsible: true,
  heightStyle: "content"
});


// 왜 클래스로 했지 암튼 droppable이라는 건 용지 위에 파츠들(draggable)을 드롭할 수 있게 만드는 코드
$( ".droppable_mainBox" ).droppable({
  tolerance: 'fit', //테두리 안에 완전히 들어와야 drop으로 인식(걸치는 거 허용 ㄴ)
  classes: { // 뭔지 몰라요
    "ui-droppable-active": "ui-state-active",
    "ui-droppable-hover": "ui-state-hover"
  },
  drop: function( event, ui ) { // 드롭했을 때 실행할 함수: 드래그하는 대상을 복제해서 복제한 걸 드롭하는 코드

    // 복제해야 하는 오브젝트인가? 아니라면 -1을 반환함
    var isCopieable = $.inArray('inTagBox', ui.draggable.prop('classList'));
    if(isCopieable == -1) return 0;


    // 드래그하는 대상을 복제하고 클래스 넣기
    var newClone = $(ui.helper).clone();
    newClone.removeClass('inTagBox').addClass('draggable');

    // 표일 경우에는 표만, 메모칸일 경우에는 네모만 사이즈 조절하게 하는 코드
    if($.inArray('memo', newClone.prop('classList')) != -1)
    {
      var child = $(newClone).children('div');
      child.addClass('resizable');
    }
    else if ($.inArray('plan', newClone.prop('classList')) != -1) {
      var child = $(newClone).children('table');
      child.addClass('resizable');
    }
    else if ($.inArray('reflection', newClone.prop('classList')) != -1) {
      var child = $(newClone).children('table');
      child.addClass('resizable');
    }
    else if ($.inArray('time-table', newClone.prop('classList')) != -1) {
      var child = $(newClone).children('table');
      child.addClass('resizable');
    }
    else if ($.inArray('weekPlan', newClone.prop('classList')) != -1) {
      var child = $(newClone).children('table');
      child.addClass('resizable');
    }
    else if ($.inArray('logo', newClone.prop('classList')) != -1) {
      var child = $(newClone).children('img');
      child.addClass('resizable');
    }
    else newClone.addClass('resizable');


    $(this).append(newClone);

    $(".resizable").resizable();

    $(".draggable").draggable({
      revert: 'invalid'
    });

  }

});


// droppable_tagBox는 원래 파츠들 있던 표! 여기로 드래그하면 삭제!
$(".droppable_tagBox").droppable({
  drop: function(event, ui) {
    var isCopieable = $.inArray('inTagBox', ui.draggable.prop('classList'));
    if(isCopieable !== -1) return 0;
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
  heightStyle: "auto" //조금 생각해봐야...
});

// <----------------------------------------- 자바스크립트 함수 영역 --------------------------------------------------->


const classList = ['studyTime', 'phrase', 'date', 'sticker', 'plan', 'reflection', 'time-table', 'memo', 'd-day', 'anything-text', 'anything-table', 'anything-img', 'weekPlan', 'sun', 'night', 'shine-time', 'waterdrop_time', 'logo'];
let children = []; //a4지 위에 배치된 파츠들

let eleList; // 불러오기로 불러온 내용
let newCloneList; // 불러온 내용으로 만든 파츠들

let bgColor = "#B3001F"; // 여백 색깔

let tagBoxOn = false;


// 표에서 버튼 누르면 행 추가하는 거
function addColumn(btn) {
  var btnName = btn.name;
  var table = document.querySelectorAll(btnName)[document.querySelectorAll(btnName).length - 1];
  var column;
  if(btnName == '#planTable')
  column = document.querySelector('#column');
  else if(btnName == '#reflectionTable')
  column = document.querySelector('#column2');
  var newColumn = column.cloneNode(true);
  table.appendChild(newColumn);
}

// 표에서 버튼 누르면 행 삭제하는 거
function removeColumn(btn) {
  var btnName = btn.name;
  var table = document.querySelectorAll(btnName)[document.querySelectorAll(btnName).length - 1];
  var lastColumn = table.lastChild;
  //console.log(table.children);
  if(table.children.length <=3) return 0;
  table.removeChild(lastColumn);
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

        $(childObject).css('margin', 0);

        width = $(childObject).css('width');
        height = $(childObject).css('height');

        if(!width) width = childObject.offsetWidth.toString() + 'px';
        if(!height) height = childObject.offsetHeight.toString() + 'px';

        $(childObject).css('margin', '10px 10px 0 0');

        newList.push(width, height);

        // 뉴리스트에 들어가는 거: 클래스명, 가로, 세로, left, top, (선택)(행 또는 이름 또는 이미지 링크 또는 ...)

        //console.log('if cleared '+classList[k]);
        newList.push(child.style.left, child.style.top);
        if(currentClass == 'plan' || currentClass == 'reflection')
          newList.push($(childObject).children()[0].childElementCount);

        if(currentClass == 'anything-text')
          newList.push(child.innerText);

        if(currentClass == 'logo')
          newList.push(child.src);

        newList.push('/');
        elementList.push(newList);

      }


    }
    // 임시로 array를 만들어서 정보들 다 넣고 그걸 elementList에 넣어야 함.

    // elementList 보면 대충 클래스명, 크기, 위치, (행 개수)가 담긴 배열이 나올 거임


  }

  // elementList.push(document.querySelector("#colorPicker").value);
  elementList.push(bgColor);

// className, width, height, left, top, (column)
  /*
  클래스 이름이랑 클래스 리스트랑 대조해서 일치하는 걸 뽑아내야 함.

  */

  return elementList;
}

// 여백 색 바꾸는 거
function watchColorPicker(event) {
  targetColor = event.target.value;
  document.querySelector("#mainBox").style.backgroundColor = targetColor;
  document.querySelector("caption").style.backgroundColor = targetColor;
}

// 하하하하하하하
function changeMinWidth() {
  /* 사용자가 300px보다 큰 이미지를 등록할 경우
  그 이미지 크기+100px을
  accordion이랑 태그박스의 최소 너비로 지정
  즉 이미지 등록 기능 만들기 전까진 무쓸모 */
}

function toggleTagBox() {
  if(tagBoxOn == true) {
    $("#align").css("overflow-x", "hidden");
    $("#tagBox").css("animation-name", "slideout");
    $("#tagBox").css("animation-duration", "0.4s");
    setTimeout('$("#tagBox").css("display", "none"); $("#functions").css("display", ""); tagBoxOn = false;', 400);
    $("#align").css("overflow-x", "");

  }
  else {
    $("#tagBox").css("display", "");
    $("#functions").css("display", "none");
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
  $('#myselect').css("font-family", fFamily);
  //도대체 왜 안되는 것일까 -> stackoverflow에 검색해보니 해결책이 없다...
  //select 말고 다른 방법으로 구현하는 걸 검토해봅시다
  //$('td').css("font-size", fSize);

}

// pdf 파일로 저장하는 거(html2canvas로 캡처를 떠서 jspdf 이용해서 저장)
function savePDF() {
  let title = prompt("파일의 이름을 입력하세요.");

  if(title == null) return 0;
  if(title == "") title = "plannerPDF";

  $("#realMainBox").css("transform", "scale(1)");

  html2canvas(document.querySelector("#realMainBox"), {
    dpi: 300,
    onrendered: function(canvas) {
      var imgData = canvas.toDataURL('image/png');
      //console.log('Report Image URL: '+imgData);
      var doc = new jsPDF('landscape', 'mm', 'a4'); //210mm wide and 297mm high

      var imgWidth = 148.5;
      var imgHeight = 210;

      doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      doc.addImage(imgData, 'PNG', 148.5, 0, imgWidth, imgHeight);
      doc.save(title + '.pdf');
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

    settingColor = eleList.pop().toString();
    console.log("settingColor is "+settingColor);
    colorPicker.addColor(settingColor, 0);
    colorPicker.removeColor(1);
    document.querySelector("#realMainBox").style.backgroundColor = settingColor;
    if(eleList.length === 0) return false;

    if(eleList[eleList.length - 1].indexOf('/') != -1)
    eleList[eleList.length - 1].splice(eleList[eleList.length - 1].indexOf('/'));

    newCloneList = Array(eleList.length);

    for(i=0; i<eleList.length; i++) {
      newCloneList[i] = document.getElementsByClassName(eleList[i][0])[0].cloneNode(true);

      newCloneList[i].style.position = "absolute";

      $(newCloneList[i]).addClass("draggable");
      $(newCloneList[i]).removeClass("inTagBox");

      switch(eleList[i][0]) {
        case("plan"):
          $(newCloneList[i]).children("table").css('width',eleList[i][1]);
          $(newCloneList[i]).children("table").css('height',eleList[i][2]);
          $(newCloneList[i]).children("table").addClass("resizable");
          break;
        case("reflection"):
          $(newCloneList[i]).children("table").css('width',eleList[i][1]);
          $(newCloneList[i]).children("table").css('height',eleList[i][2]);
          $(newCloneList[i]).children("table").addClass("resizable");
          break;
        case("memo"):
          $(newCloneList[i]).children("div").css('width',eleList[i][1]);
          $(newCloneList[i]).children("div").css('height',eleList[i][2]);
          $(newCloneList[i]).children("div").addClass("resizable");
          break;
        case("time-table"):
          $(newCloneList[i]).children("table").css('width',eleList[i][1]);
          $(newCloneList[i]).children("table").css('height',eleList[i][2]);
          $(newCloneList[i]).children("table").addClass("resizable");
          break;
        default:
          $(newCloneList[i]).css('width',eleList[i][1]);
          $(newCloneList[i]).css('height',eleList[i][2]);
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

    $(".draggable").draggable({
      revert: "invalid"
    });

    $(".resizable").resizable();


  };

  var input = this;
  //console.log(this);

  if(!/safari/i.test(navigator.userAgent)){
    input.type = '';
    input.type = 'file';
  }

}

// 새로운 기능 추가하는 거(원리: 사실.. 기능란에 안 보이게 해놓은 파츠 하나 있어서 그거 복제해서 만듦)
function addNewTag() {
  var value = prompt('기능의 내용을 입력하세요.')
  if(value == "" || value == null) return 0;
  var newClone = document.querySelector('#anything-text').cloneNode(true);

  newClone.style.display = "";
  newClone.removeAttribute("id");
  newClone.children[0].innerHTML = value; //이 부분을 바꿔야 함.
  document.querySelector('#favorite').appendChild(newClone);

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

document.querySelector("#zoomIn").addEventListener('click', function() {
  if(mainBoxScale>=1) return;

  mainBoxScale += 0.1;
  $("#realMainBox").css("transform", "scale("+mainBoxScale.toString()+")")
  $("#scale").html(parseInt(mainBoxScale*100));
});

document.querySelector("#zoomOut").addEventListener('click', function() {
  if(mainBoxScale<=0.6) return;

  mainBoxScale -= 0.1;
  $("#realMainBox").css("transform", "scale("+mainBoxScale.toString()+")")
  $("#scale").html(parseInt(mainBoxScale*100));
});

var colorPicker = new iro.ColorPicker('#iroColorPicker', {
  // Set the size of the color picker
  width: 100,
  // Set the initial color to pure red
  color: "#B3001F"
});

colorPicker.on('color:change', function(color) {
  // log the current color as a HEX string
  // console.log(color.hexString);
  bgColor = color.hexString;
  document.querySelector("#mainBox").style.backgroundColor = bgColor;
  document.querySelector("caption").style.backgroundColor = bgColor;
});


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
    document.querySelector("#realMainBox").style.backgroundColor = settingColor;
    if(eleList.length === 0) return false;

    if(eleList[eleList.length - 1].indexOf('/') != -1)
    eleList[eleList.length - 1].splice(eleList[eleList.length - 1].indexOf('/'));

    newCloneList = Array(eleList.length);

    for(i=0; i<eleList.length; i++) {
      newCloneList[i] = document.getElementsByClassName(eleList[i][0])[0].cloneNode(true);

      newCloneList[i].style.position = "absolute";

      $(newCloneList[i]).addClass("draggable");
      $(newCloneList[i]).removeClass("inTagBox");

      switch(eleList[i][0]) {
        case("plan"):
          $(newCloneList[i]).children("table").css('width',eleList[i][1]);
          $(newCloneList[i]).children("table").css('height',eleList[i][2]);
          $(newCloneList[i]).children("table").addClass("resizable");
          break;
        case("reflection"):
          $(newCloneList[i]).children("table").css('width',eleList[i][1]);
          $(newCloneList[i]).children("table").css('height',eleList[i][2]);
          $(newCloneList[i]).children("table").addClass("resizable");
          break;
        case("memo"):
          $(newCloneList[i]).children("div").css('width',eleList[i][1]);
          $(newCloneList[i]).children("div").css('height',eleList[i][2]);
          $(newCloneList[i]).children("div").addClass("resizable");
          break;
        case("time-table"):
          $(newCloneList[i]).children("table").css('width',eleList[i][1]);
          $(newCloneList[i]).children("table").css('height',eleList[i][2]);
          $(newCloneList[i]).children("table").addClass("resizable");
          break;
        default:
          $(newCloneList[i]).css('width',eleList[i][1]);
          $(newCloneList[i]).css('height',eleList[i][2]);
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

    $(".draggable").draggable({
      revert: "invalid"
    });

    $(".resizable").resizable();


  var input = this;
  //console.log(this);

}


//서버에서 불러오기 버튼
