function readfromserver(reader) {

    //console.log('File content:', event.target.result);
    const mainBox = document.querySelector("#realMainBox");

    $(mainBox).children('span').remove();

    eleList = reader.split(',/,');

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
document.querySelector('#readfromserver').addEventListener('click', readfromserver, input);
