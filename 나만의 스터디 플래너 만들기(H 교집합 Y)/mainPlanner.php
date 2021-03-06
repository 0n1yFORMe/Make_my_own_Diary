<!DOCTYPE html>
<html lang = "kr">
  <head>
    <meta charset = "utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <title>나만의 스터디플래너 만들기</title>
      <link rel="stylesheet" href="css/style.css">
    </head>
    <body>
     <!-- The Modal -->
     <div id="myModal" class="modal">

       <!-- Modal content -->
           <div class="modal-content">
                     <p style="text-align: center; font-family: 'BRBA_B';"><span style="font-size: 3em;"><b><span style="font-size: 24pt;">주의사항!</span></b></span></p><br>
                     <p style="text-align: center; line-height: 1.5; font-family: 'Nanum Gothic', sans-serif;"><br>왼쪽 작업란(A4 절반)에서 붉은색 부분(인쇄 여백)을 제외한 흰색 부분에 <br> 추가하고 싶은 요소를 오른쪽 기능란에서 클릭하고 끌고 와 붙여주세요!<br>요소의 오른쪽 모서리를 잡아당겨 크기를 조절하세요!<br>요소를 삭제하기 위해서는 기능란 위에 드래그하세요!<br><br></p>
                 <div style="cursor:pointer;background-color:#DDDDDD;text-align: center; margin-top: 10px; padding-bottom: 10px;padding-top: 10px;" onClick="close_pop();">
                     <span class="pop_bt" style="font-size: 13pt;" >
                          닫기
                     </span>
                 </div>
           </div>

      </div>
      <!--End Modal-->

    <link href="https://fonts.googleapis.com/css?family=Gaegu|Nanum+Gothic|Nanum+Myeongjo|Nanum+Pen+Script|Noto+Serif+KR|Poor+Story|Yeon+Sung&display=swap" rel="stylesheet">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css">
    <link rel="stylesheet" type="text/css" href="css/style.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
    <script src = "https://rawgit.com/eKoopmans/html2canvas/develop/dist/html2canvas.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.0.272/jspdf.debug.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui-touch-punch/0.2.3/jquery.ui.touch-punch.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@jaames/iro@5"></script>

  </head>
  <body style="position: relative;">
     <?php
       session_cache_expire(1);
       session_start();
       $sessionusername = $_SESSION['username'];
       if(!isset($sessionusername)){
         header ('Location: index.php');
       }
       require $_SERVER["DOCUMENT_ROOT"].'/scripts/dbconnect.php';
       $formserver = mysqli_query($connect, "SELECT formdata FROM form WHERE username = '$sessionusername'");
       $formserverrow = mysqli_fetch_array($formserver);

       function encode_image($url) {
         $img = file_get_contents($url);
         $imgData = base64_encode($img);

         return $imgData;
       }
      ?>
      <ul>
        <li><a href="#" id= "home"><?php
              echo $_SESSION['username']."님의 플래너";
            ?></a></li>
        <li style="float:right"><a href="#" onclick="location.href = 'http://3.17.25.159/logout.php'">로그아웃</a></li>
<
        <li style="float:right"><a id="default"><p><p id="scale">100</p>%</p></a></li>
        <!--<li style="float:right"><a id="feedback">feedback</a><li>-->

        <!-- 나중에 scale 누르면 100%로 돌아오게 하는 기능 추가 할 것 -->
        <li style="float:right"><a id = "zoomOut">-</a></li>
        <li style="float:right"><a id = "zoomIn">+</a></li>
        <li style="float:right"><a href="#" id = "readfromserver">서버에서 불러오기</a></li>
        <li style="float:right"><a href="#" id = "saveTxttoserver">서버에 저장하기</a></li>
        <li style="float:right"><a onclick="historyy.redo();">REDO</a></li>
        <li style="float:right"><a onclick="historyy.undo();">UNDO</a></li>
      </ul>

    <!--  feedback 창 구현
      <div id="feedback-main">
        <div id="feedback-div">
          <form action="contact.php" method="post" class="form" id="feedback-form1" name="form1" enctype="multipart/form-data">

            <p class="name">
              <input name="name" type="name" class="validate[required,custom[onlyLetter],length[0,100]] feedback-input" required placeholder="ID" id="feedback-name" />
            </p>

            <p class="email">
              <input name="email" type="email" class="validate[required,custom[email]] feedback-input" id="feedback-email" placeholder="Email" required />
            </p>

            <p class="text">
              <textarea name="comment" type="comment" class="validate[required,length[6,300]] feedback-input" id="feedback-comment" required placeholder="Comment"></textarea>
            </p>

            <div class="feedback-submit">
              <input type="submit" value="SEND" id="feedback-button-blue" />
              <div class="feedback-ease"></div>
            </div>
          </form>
        </div>
      </div>

      <button id="popup" class="feedback-button" onclick="toggle_visibility()">Feedback</button>
      <script src="_include/js/feedback.js"></script><div id="feedback-main">-->




    <!-- <div class="button" style="box-shadow: -60px 0px 100px -90px #000000, 60px 0px 100px -90px #000000;">여백 색상 정하기&nbsp;<input type="color" value = "#B3001F" id = "colorPicker"></div> -->

    <input type="button" value="기능" onclick="toggleTagBox()" style="position: fixed; top: 0; right: 0; font-size: 20px;">

    <div id="myModal2" class="modal">

      <!-- Modal content -->
      <div class="modal-content" style="border-radius:10px;">
        <a title="Ricktu / CC BY-SA (https://creativecommons.org/licenses/by-sa/3.0)" href="https://commons.wikimedia.org/wiki/File:Sierpinski_zoom_2.gif"><img width="256" alt="Sierpinski zoom 2" src="https://upload.wikimedia.org/wikipedia/commons/6/6b/Sierpinski_zoom_2.gif"></a>
        <p style="text-align: center; line-height: 1.5; font-family: 'Nanum Gothic', sans-serif;"><br>파일을 다운로드 중입니다.<br>그동안 1.58차원의 프랙탈 도형을 감상해봅시다.</p>
      </div>
    </div>
   <!--End Modal-->

    <div class = "align">
      <div style="width: 50vw; background-color: transparent; transform-origin: top;">
        <div id = "realMainBox" class = "droppable_mainBox" style = "position: relative; width: 148.5mm; height: 210mm; min-width: 148.5mm; background-color: white; display: flex; align-items: center; justify-content: center; margin: auto; z-index: 2; transform-origin: top;">
          <!-- 컨테이너에 배경을 줄 경우 transform-origin: center -->
         <!-- <div id = "realMainBox" class = "droppable_mainBox" style = "width: 125.1mm; height: 203.2mm; background-color: white; border: 2px solid black; z-index: 1;"> -->
         <!-- </div> -->
        </div>

      </div>


     <div id="functions">
       <h3>바탕색</h3>
       <div id="iroColorPicker"></div>
       <h3>글꼴</h3> <!--글꼴은 다른 걸로 해도 됩니다-->
       <!-- Surround the select box within a "custom-select" DIV element.
       Remember to set the width: -->
        <div class="selectbox">
          <label for="select">글꼴</label>
          <select name = "fonts" onchange = "changeFont()" id = "mySelect"  style="">
            <option value = "Nanum Myeongjo" style="font-family:'Nanum Myeongjo';">나눔명조</option>
            <option value = 'Nanum Pen Script' style="font-family:'Nanum Pen Script';">나눔손글씨 펜</option>
            <option value = "Nanum Gothic" style="font-family:'Nanum Gothic';">나눔고딕</option>
            <option value = 'Noto Serif KR' style="font-family:'Noto Serif KR';">본명조</option>
            <option value = 'Gaegu' style="font-family:'Gaegu';">개구쟁이</option>
            <option value = 'Yeon Sung' style="font-family:'Yeon Sung';">연성체</option>
            <option value = 'Poor Story' style="font-family:'Poor Story';">서툰 이야기</option>
          </select>
        </div>

       <div>
         <h3>파일로 중간 저장</h3> <button class="button-hidden" id = "saveTxt"> <p>(저장하기)</p></button><br>
         <h3>최종 PDF 저장</h3><button class="button-hidden" id = "savePDF"> <p>(저장하기) </p></button><br>
         <h3>파일 중간 저장 불러오기</h3><button class="button-hidden"><input type="file" id="upload" accept = ".txt" style =  "font-size: 15px;"></button>
       </div>
     </div>

    <div id="tagBoxParent" style="width: max-content; position: absolute; right: 1%; overflow-x: visible; overflow-y: scroll; height: 90vh; width: fit-content;">
      <table border = "1" summary = "sbs" id = "tagBox" style = "/* style.css에 정의 */display: none;" class = "droppable_tagBox">
        <caption style = "/* style.css에 정의 */">기능</caption>
        <tbody>
          <tr id="hover">
            <!-- <td style = "border-bottom: black 2px dotted; padding: 10px; border-top: 0;">
              [안내] 이렇게 만들면 됩니다! (마우스 올리기)
              <div id = "example" style = "display: none;">
                <img style = "margin-top: 15px; margin-bottom: 15px;" src = "https://live.staticflickr.com/65535/49007065268_c57ccc55cb.jpg">
                <br>
                <button class="button" id = "video">동영상 가이드</button>
              </div>
            </td> -->
          </tr>

          <tr>
            <td style = "border: 0;">
              <button class = "button" id = "addNewTag" style = "margin-top: 10px; margin-left: 0;">새로운 기능 추가하기</button>
            </td>
          </tr>

          <tr>
            <td>
              <div id="accordion">
                <h3>즐겨찾기</h3>
                <div class = "accordion-title" id = "favorite">

                </div>

                <h3>사용자가 추가한 기능</h3>
                <div class = "accordion-title" id = "madebyuser">

                    <div id = "anything-text" class='inTagBox-hover' style = "display: none;">
                      <span class = "inTagBox elements anything-text"></span>
                    </div>

                </div>

                <h3>기본</h3>
                <div class = "accordion-title">

                  <div class='inTagBox-hover'>
                    <span class = "inTagBox elements studyTime"> 공부 시간: </span>
                  </div>

                  <div class='inTagBox-hover'>
                    <span class = " inTagBox elements phrase" style = "padding-right: 20px;"> 공부 자극 문구:
                    </span>
                  </div>


                  <div class='inTagBox-hover'>
                    <span class = " inTagBox elements date"> 날짜: </span>

                  </div>

                  <div class='inTagBox-hover'>
                    <span class = "inTagBox elements sticker"> <p style = "position: relative; top: 43%; left: 3%; font-size: 10pt;">스티커</p> </span>
                  </div>

                  <div class='inTagBox-hover'>
                    <span class = " inTagBox elements d-day"> D&nbsp;- </span>
                  </div>




                  <div class='inTagBox-hover'>
                    <span class = "inTagBox elements memo"> Memo <br>
                      <div style = "width: 100px; height: 100px; border: 1px solid black; margin-top: 10px;"></div>
                    </span>
                  </div>
                </div>

                <h3>표</h3>
                <div class = "accordion-title">
                  <div class='inTagBox-hover'>
                    <span class = " inTagBox elements plan">계획 <br>
                      <table border = "1" summary = "sbs" style = "flex-grow: 1; table-layout: fixed; width: 200px; height: 50px;">
                          <tbody id = "planTable">

                            <tr id = "column">
                              <td style = "width: 20%;">&nbsp;</td>
                              <td style = "width: 60%;">&nbsp;</td>
                              <td style = "width: 10%;">&nbsp;</td>
                            </tr>

                            <tr>
                              <td>&nbsp;</td>
                              <td>&nbsp;</td>
                              <td>&nbsp;</td>
                            </tr>

                            <tr>
                              <td>&nbsp;</td>
                              <td>&nbsp;</td>
                              <td>&nbsp;</td>
                            </tr>

                          </tbody>
                        </table>
                    </span>
                  </div>
                  <div>
                    <span style="border: 0; float: left;">
                      <input type = "button" class = "button" value = "+" name = "#planTable" onclick = "addColumn(this)">
                      <input type = "button" class = "button" value = "-" name = "#planTable" onclick = "removeColumn(this)">
                    </span>
                  </div>



                  <div class='inTagBox-hover'>
                    <span class = " inTagBox elements reflection"> *오늘의 나, 성찰*<br>
                      <table border = "1" summary = "sbs" style = "flex-grow: 1; table-layout: fixed; width: 200px; height: 50px;">
                        <tbody id = "reflectionTable">

                          <tr id = 'column2'>
                            <td style = "width: 70%;">&nbsp;</td>
                            <td style = "width: 10%; text-align: center;">◎</td>
                            <td style = "width: 10%; text-align: center;">△</td>
                            <td style = "width: 10%; text-align: center;">✕</td>
                          </tr>

                          <tr>
                            <td style = "width: 70%;">&nbsp;</td>
                            <td style = "width: 10%; text-align: center;">◎</td>
                            <td style = "width: 10%; text-align: center;">△</td>
                            <td style = "width: 10%; text-align: center;">✕</td>
                          </tr>

                          <tr>
                            <td style = "width: 70%;">&nbsp;</td>
                            <td style = "width: 10%; text-align: center;">◎</td>
                            <td style = "width: 10%; text-align: center;">△</td>
                            <td style = "width: 10%; text-align: center;">✕</td>
                          </tr>
                        </tbody>
                      </table>
                    </span>
                  </div>
                  <div>
                    <span style="border: 0; float: left;">
                      <input type = "button" class = "button" value = "+" name = "#reflectionTable" onclick = "addColumn(this)">
                      <input type = "button" class = "button" value = "-" name = "#reflectionTable" onclick = "removeColumn(this)">
                    </span>
                  </div>

                  <div class='inTagBox-hover'>
                    <span class="inTagBox elements weekPlan"> 한 주 계획 <br>
                      <table border = "1" summary = "sbs" style = "flex-grow: 1; table-layout: fixed; width: 300px; height: 50px;" id = "weekPlanTable">

                          <thead style="border: 1px solid black;">
                            <tr>
                              <th class="plan-day">Sun</th>
                              <th class="plan-day">Mon</th>
                              <th class="plan-day">Tue</th>
                              <th class="plan-day">Wed</th>
                              <th class="plan-day">Thu</th>
                              <th class="plan-day">Fri</th>
                              <th class="plan-day">Sat</th>
                            </tr>
                          </thead>



                          <tbody id = "weekPlan">
                            <tr style = "height: 35%;">
                              <td>&nbsp;</td>
                              <td>&nbsp;</td>
                              <td>&nbsp;</td>
                              <td>&nbsp;</td>
                              <td>&nbsp;</td>
                              <td>&nbsp;</td>
                              <td>&nbsp;</td>
                            </tr>

                            <tr style = "height: 65%;">
                              <td colspan="7" style="text-align: left; vertical-align: text-top;">
                                <span>&lt; 한 주 정리 &gt;</span><br><br><br>
                              </td>
                            </tr>

                          </tbody>

                      </table>
                    </span>
                  </div>









                </div>

                <h3>타임테이블</h3>
                <div class = "accordion-title">
                  <div class='inTagBox-hover'>


                        <span class = "inTagBox elements time-table"> Time-Table <br>

                          <table border = "1" summary = "sbs" style = "flex-grow: 1; table-layout: fixed; width: 200px; height: 50px;">
                            <tbody id = "timeTable">

                              <tr>
                                <td class = "plan-time">&nbsp;</td>
                                <td class = "plan-time firstRow">10</td>
                                <td class = "plan-time firstRow">20</td>
                                <td class = "plan-time firstRow">30</td>
                                <td class = "plan-time firstRow">40</td>
                                <td class = "plan-time firstRow">50</td>
                                <td class = "plan-time firstRow">60</td>
                              </tr>
                              <tr>
                                <td class = "plan-time">6</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                              </tr>

                              <tr>
                                <td class = "plan-time">7</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                              </tr>

                              <tr>
                                <td class = "plan-time"> 8</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                              </tr>
                              <tr>
                                <td class = "plan-time">9 </td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                              </tr>
                              <tr>
                                <td class = "plan-time">10</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                              </tr>
                              <tr>
                                <td class = "plan-time">11</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                              </tr>
                              <tr>
                                <td class = "plan-time">12</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                              </tr>
                              <tr>
                                <td class = "plan-time">1</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                              </tr>
                              <tr>
                                <td class = "plan-time">2</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                              </tr>
                              <tr>
                                <td class = "plan-time">3</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                              </tr>
                              <tr>
                                <td class = "plan-time">4</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                              </tr>
                              <tr>
                                <td class = "plan-time">5</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                              </tr>
                              <tr>
                                <td class = "plan-time">6</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                              </tr>
                              <tr>
                                <td class = "plan-time">7</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                              </tr>
                              <tr>
                                <td class = "plan-time">8</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                              </tr>
                              <tr>
                                <td class = "plan-time">9</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                              </tr>
                              <tr>
                                <td class = "plan-time">10</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                              </tr>
                              <tr>
                                <td class = "plan-time">11</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                              </tr>
                              <tr>
                                <td class = "plan-time">12</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                              </tr>
                              <tr>
                                <td class = "plan-time">1</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                              </tr>
                              <tr>
                                <td class = "plan-time">2</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                              </tr>
                            </tbody>
                          </table>
                        </span>


                  </div>
                </div>

                <h3>스페셜 기능</h3>
                <div class="accordion-title">

                  <div class='inTagBox-hover'>
                    <span class = "inTagBox elements"> <img src='data:image/png;base64,<?php echo encode_image("images/cat.png");?>' alt=""><span style="vertical-align: 100%;">&nbsp;&nbsp;오늘의 고양이 일지: </span></span>
                  </div>

                  <div class='inTagBox-hover'>
                    <span class = "inTagBox elements sun"> <img src='data:image/png;base64,<?php echo encode_image("images/img_sun_60.png");?>' alt=""><span style="vertical-align: 100%;">&nbsp;&nbsp;: </span></span>
                  </div>

                  <div class='inTagBox-hover'>
                    <span class = "inTagBox elements night"> <img src='data:image/png;base64,<?php echo encode_image("images/img_night_50.png");?>' alt=""><span style="vertical-align: 100%;">&nbsp;&nbsp;: </span></span>
                  </div>

                  <div class='inTagBox-hover'>
                    <span class = "inTagBox elements shine-time" style="border:0;"> <span style="vertical-align: 100%;">걸린</span><img src='data:image/png;base64,<?php echo encode_image("images/img_shine2_25.png")?>' alt="" style="vertical-align: 130%;"><span style="vertical-align: 100%;">시간: </span></span>
                  </div>

                  <div class='inTagBox-hover'>
                    <span class = "inTagBox elements waterdrop-time" style="border:0;"> <span style="vertical-align: 100%;">걸린</span><img src='data:image/png;base64,<?php echo encode_image("images/img_waterdrop_20.png")?>' alt="" style="vertical-align: 130%;"><span style="vertical-align: 100%;">시간: </span></span>
                  </div>

                </div>

                <h3>대학 로고</h3>
                <div class="accordion-title">
                  <div class='inTagBox-hover'>
                    <span class = "inTagBox elements logo logo-seoul" name = "logo-seoul" style="display:inline-block"><img src='data:image/png;base64,<?php echo encode_image("images/s_dae.png")?>' style="width: 300px;" alt=""></span>

                  </div>

                  <div class='inTagBox-hover'>
                    <span class = "inTagBox elements logo logo-korea" style="display:inline-block">
                      <img src='data:image/png;base64,<?php echo encode_image("images/k_dae.png")?>' style="width: 300px;" alt="">
                    </span>
                  </div>

                  <div class='inTagBox-hover'>
                    <span class = "inTagBox elements logo logo-yonsei" style="display:inline-block">
                      <img src='data:image/png;base64,<?php echo encode_image("images/y_dae.png")?>' style="width: 300px;" alt="">

                    </span>
                  </div>

                </div>

                <h3>추가한 파츠들(귀찮아서 미분류)</h3>
                <div class="accordion-title">
                  <div class='inTagBox-hover'>
                    <span class = "inTagBox elements img-only img_bit_clock" name = "img_bit_clock" style="display:inline-block"><img src='images/img_bit_clock.png' style="width: 200px;" alt=""></span>
                  </div>
                  <div class='inTagBox-hover'>
                    <span class = "inTagBox elements img-only" name = "img_bit_clock2" style="display:inline-block"><img src='data:image/png;base64,<?php echo encode_image("images/img_bit_clock2.png")?>' style="width: 200px;" alt=""></span>
                  </div>
                  <div class='inTagBox-hover'>
                    <span class = "inTagBox elements img-only" name = "img_bit_date" style="display:inline-block"><img src='data:image/png;base64,<?php echo encode_image("images/img_bit_date.png")?>' style="width: 200px;" alt=""></span>
                  </div>
                  <div class='inTagBox-hover'>
                    <span class = "inTagBox elements img-only" name = "img_bit_dday" style="display:inline-block"><img src='data:image/png;base64,<?php echo encode_image("images/img_bit_dday.png")?>' style="width: 200px;" alt=""></span>
                  </div>
                  <div class='inTagBox-hover'>
                    <span class = "inTagBox elements todo-list"> TO DO LIST <br>
                      <div style = "width: 100px; height: fit-content; border: 1px solid black; margin-top: 10px;">
                        <ul class="todo-list-ul" id="todolist">
                          <li id="li1">&nbsp;</li>
                          <li>&nbsp;</li>
                          <li>&nbsp;</li>
                        </ul>
                      </div>
                    </span>
                  </div>
                  <div>
                    <span style="border: 0; float: left;">
                      <input type = "button" class = "button" value = "+" name = "#todolist" onclick = "addColumn(this)">
                      <input type = "button" class = "button" value = "-" name = "#todolist" onclick = "removeColumn(this)">
                    </span>
                  </div>

                  <div class='inTagBox-hover'>
                    <span class = " inTagBox elements this-week">
                      <table border = "1" summary = "sbs" style = "flex-grow: 1; table-layout: fixed; width: 340px; height: 43px;">
                        <tbody>

                          <tr>
                            <td style="text-align: center;">Sun</td>
                            <td style="text-align: center;">Mon</td>
                            <td style="text-align: center;">Tue</td>
                            <td style="text-align: center;">Wed</td>
                            <td style="text-align: center;">Thu</td>
                            <td style="text-align: center;">Fri</td>
                            <td style="text-align: center;">Sat</td>
                          </tr>

                        </tbody>
                      </table>
                    </span>
                  </div>

                </div>



              </div>
            </td>
          </tr>

          </tbody>
        </table>
      </div>
    </div>
    <form>
      <input type="hidden" name="name" id="name" value="<?php echo $formserverrow[0]; ?>">
    </form>

    <!-- 이거 왜 넣은 건지 아는 사람..? <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /> -->
    <footer style = "text-align: center; margin-top: 50px; font-size: 15px;">
      Copyright ⓒ 2020. 0nlyF0RMe All Rights Reserved.

    </footer>
  </body>
  <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
  <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
  <script>
  jQuery(document).ready(function() {
       $('#myModal').show();
  });
  //팝업 Close 기능
  function close_pop(flag) {
       $('#myModal').fadeOut();
  };
  </script>
  <script src = "js/planner.js"></script>
  <script src = "js/img_src.js"></script>
  <script src = "js/serversave.js"></script>


</html>
