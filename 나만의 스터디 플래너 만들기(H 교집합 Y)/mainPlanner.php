<!DOCTYPE html>
<html lang = "kr">
  <head>
    <meta charset = "utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">



    <title>나만의 스터디 플래너 만들기</title>

    <script>

       alert("*주의사항*\n왼쪽 작업란(A4 절반)에서 붉은색 부분(인쇄 여백)을 제외한 흰색 부분에 추가하고 싶은 요소를 오른쪽 기능란에서 클릭하고 끌고 와 붙여주세요!\n요소의 오른쪽 모서리를 잡아당겨 크기를 조절하세요!\n요소를 삭제하기 위해서는 기능란 위로 드래그하세요!")

    </script>

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

  <body>
    <div style = "display: flex;">
      <button class="button" id = "saveTxt"> <span>중간 저장하기 </span></button>
      <button class="button" id = "savePDF"> <span>pdf로 저장하기 </span></button>
      <button class="button"> <p style = "display: inline;">불러오기 :&nbsp;</p><input type="file" id="upload" accept = ".txt" style =  "font-size: 15px;"></button>
    </div>

    <!-- <div class="button" style="box-shadow: -60px 0px 100px -90px #000000, 60px 0px 100px -90px #000000;">여백 색상 정하기&nbsp;<input type="color" value = "#B3001F" id = "colorPicker"></div> -->

    <div id="iroColorPicker"></div>

    <div class = "button" style="box-shadow: -60px 0px 100px -90px #000000, 60px 0px 100px -90px #000000;">
    글꼴 정하기 <!-- 글꼴은 다른 걸로 해도 됩니다 -->
    <select name = "fonts" onchange = "changeFont()" id = "mySelect" style="">
      <option value = "Nanum Gothic" style="font-family:'Nanum Gothic';">나눔고딕</option>
      <option value = "Nanum Myeongjo" style="font-family:'Nanum Myeongjo';">나눔명조</option>
      <option value = 'Nanum Pen Script' style="font-family:'Nanum Pen Script';">나눔펜 뭐시기</option>
      <option value = 'Noto Serif KR' style="font-family:'Noto Serif KR';">노토 세리프가 뭐임</option>
      <option value = 'Gaegu' style="font-family:'Gaegu';">개구</option>
      <option value = 'Yeon Sung' style="font-family:'Yeon Sung';">연성</option>
      <option value = 'Poor Story' style="font-family:'Poor Story';">불쌍한 이야기</option>
    </select>
  </div>


    <div class = "align">
     <div id = "mainBox" style = "width: 148.5mm; height: 210mm; min-width: 148.5mm; background-color: brown; display: flex; align-items: center; justify-content: center; margin: 0;">
      <div id = "realMainBox" class = "droppable_mainBox" style = "width: 125.1mm; height: 203.2mm; background-color: white; border: 2px solid black; z-index: 1;">

      </div>
     </div>


      <table border = "1" summary = "sbs" id = "tagBox" style = "flex-grow: 1; table-layout: fixed; margin-left: 30px; margin-right: 50px; background-color: white; padding: 10px; border: 2px solid transparent; border-radius: 10px; box-shadow: -60px 0px 100px -90px #000000, 60px 0px 100px -90px #000000;" class = "droppable_tagBox">
        <caption style = "height: 50px; line-height: 50px; background-color: brown; margin-bottom: 10px; border: 2px solid transparent; border-radius: 10px; color: white; vertical-align: middle; font-size: 20px; box-shadow: -60px 0px 100px -90px #000000, 60px 0px 100px -90px #000000;">기능</caption>
        <tbody>
          <tr id="hover">
            <td style = "border-bottom: black 2px dotted; padding: 10px; border-top: 0;">
              [안내] 이렇게 만들면 됩니다! (마우스 올리기)
              <div id = "example" style = "display: none;">
                <img style = "margin-top: 15px; margin-bottom: 15px;" src = "https://live.staticflickr.com/65535/49007065268_c57ccc55cb.jpg">
                <br>
                <button class="button" id = "video">동영상 가이드</button>
              </div>
            </td>
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
                <div class = "accordion-title">
                  으핫핫 즐겨찾기 기능 같은 건 만들지 않았다
                </div>

                <h3>사용자가 추가한 기능</h3>
                <div class = "accordion-title" id = "favorite">

                    <div id = "anything-text" style = "display: none;">
                      <span class = "inTagBox elements anything-text"></span>
                    </div>

                </div>

                <h3>기본</h3>
                <div class = "accordion-title">

                  <div>
                    <span class = "inTagBox elements studyTime"> 공부 시간: </span>
                  </div>

                  <div>
                    <span class = " inTagBox elements phrase" style = "padding-right: 20px;"> 공부 자극 문구:
                    </span>
                  </div>


                  <div>
                    <span class = " inTagBox elements date"> 날짜: </span>

                  </div>

                  <div>
                    <span class = "inTagBox sticker"> <p style = "position: relative; top: 43%; left: 3%; font-size: 10pt;">스티커</p> </span>
                  </div>

                  <div>
                    <span class = " inTagBox elements d-day"> D&nbsp;- </span>
                  </div>




                  <div>
                    <span class = "inTagBox elements memo"> Memo <br>
                      <div style = "width: 100px; height: 100px; border: 1px solid black; margin-top: 10px;"></div>
                    </span>
                  </div>
                </div>

                <h3>표</h3>
                <div class = "accordion-title">
                  <div>
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
                    <span style="border: 0; float: left;">
                      <input type = "button" class = "button" value = "+" name = "#planTable" onclick = "addColumn(this)">
                      <input type = "button" class = "button" value = "-" name = "#planTable" onclick = "removeColumn(this)">
                    </span>
                  </div>


                  <div>
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
                    <span style="border: 0; float: left;">
                      <input type = "button" class = "button" value = "+" name = "#reflectionTable" onclick = "addColumn(this)">
                      <input type = "button" class = "button" value = "-" name = "#reflectionTable" onclick = "removeColumn(this)">
                    </span>
                  </div>

                  <div>
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
                  <div>


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

                  <div>
                    <span class = "inTagBox elements"> <img src="images/cat.png" alt=""><span style="vertical-align: 100%;">&nbsp;&nbsp;오늘의 고양이 일지: </span></span>
                  </div>

                  <div>
                    <span class = "inTagBox elements sun"> <img src="images/img_sun_60.png" alt=""><span style="vertical-align: 100%;">&nbsp;&nbsp;: </span></span>
                  </div>

                  <div>
                    <span class = "inTagBox elements night"> <img src="images/img_night_50.png" alt=""><span style="vertical-align: 100%;">&nbsp;&nbsp;: </span></span>
                  </div>

                  <div>
                    <span class = "inTagBox elements shine-time" style="border:0;"> <span style="vertical-align: 100%;">걸린</span><img src="images/img_shine2_25.png" alt="" style="vertical-align: 130%;"><span style="vertical-align: 100%;">시간: </span></span>
                  </div>

                  <div>
                    <span class = "inTagBox elements waterdrop-time" style="border:0;"> <span style="vertical-align: 100%;">걸린</span><img src="images/img_waterdrop_20.png" alt="" style="vertical-align: 130%;"><span style="vertical-align: 100%;">시간: </span></span>
                  </div>

                </div>

                <h3>대학 로고</h3>
                <div class="accordion-title">
                  <div>
                    <span class = "inTagBox logo logo-seoul">&nbsp;<img src="images/s_dae.png" style="width: 300px;" alt=""></span>

                  </div>

                  <div>
                    <span class = "inTagBox logo logo-korea">&nbsp;
                      <img src="images/k_dae.png" style="width: 300px;" alt="">
                    </span>
                  </div>

                  <div>
                    <span class = "inTagBox logo logo-yonsei">&nbsp;
                      <img src="images/y_dae.png" style="width: 300px;" alt="">
                      &nbsp;
                    </span>
                  </div>

                </div>


              </div>
            </td>
          </tr>

        </tbody>
    </table>

    </div>
    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    <footer style = "text-align: center; margin-top: 50px; font-size: 15px;">
      Copyright ⓒ 2020. 0nlyF0RMe All Rights Reserved.
    </footer>

  </body>
  <script src = "js/planner.js"></script>
  <script src = "js/img_src.js"></script>

</html>
