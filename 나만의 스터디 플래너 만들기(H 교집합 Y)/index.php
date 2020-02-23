<html>
  <head>
    <meta charset = "utf-8">
     <link href="https://fonts.googleapis.com/css?family=Sunflower:300,700&display=swap" rel="stylesheet">
     <meta name="viewport" content="width=device-width, initial-scale=1">
     <!-- Bootstrap CSS -->
     <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
     <link href="css/main.css" rel="stylesheet"> <!-- main.css에 추가 효과 모아두었습니다.-->
     <style media="screen">
     .drawsvg, svg {
       width: 100%;
     }
     .stroke {stroke: #000; stroke-width: 1px; stroke-dasharray: 0 250; stroke-opacity: 1; fill: none; -webkit-animation: stroke_offset 20s infinite; animation: stroke_offset 20s infinite; -webkit-animation-timing-function: cubic-bezier(.25, .46, .45, .94); animation-timing-function: cubic-bezier(.25, .46, .45, .94) }
     @-webkit-keyframes stroke_offset { 100%, 25% {stroke-dasharray: 0 250; stroke-opacity: 1 } 50%, 75% {stroke-dasharray: 250 0; stroke-opacity: .75 } 55%, 70% {stroke-dasharray: 250 0; stroke-opacity: 0 } }
     @keyframes stroke_offset { 100%, 25% {stroke-dasharray: 0 250; stroke-opacity: 1 } 50%, 75% {stroke-dasharray: 250 0; stroke-opacity: .75 } 55%, 70% {stroke-dasharray: 250 0; stroke-opacity: 0 } }

      .fill {
        fill: #000;
        fill-opacity: 0;
        -webkit-animation: fill_offset 20s infinite;
        animation: fill_offset 20s infinite;
        -webkit-animation-timing-function: cubic-bezier(.25, .46, .45, .94);
        animation-timing-function: cubic-bezier(.25, .46, .45, .94) }
        @-webkit-keyframes fill_offset { 100%, 25%, 35%, 90% { fill-opacity: 0 } 50%, 70% { fill-opacity: 1 } }
        @keyframes fill_offset { 100%, 25%, 35%, 90% { fill-opacity: 0 } 50%, 70% { fill-opacity: 1 } } #fade-text { font-family: 'BRBA_B', cursive; font-size: 4em;}

     </style>

     <title>나만의 스터디 플래너 만들기</title>
  </head>
  <body>
  <div class="container">
      <div class="row">
          <div class="col-sm"> <!-- 왼쪽 내용들입니다-->
            <div class="drawsvg">
              <svg version="1.1" viewBox="0 0 700 300">
                <symbol id="fade-text">
                  <text x="45%" y="40%" text-anchor="middle">나만의</text>
                  <text x="50%" y="60%" text-anchor="middle">스터디 플래너</text>
                  <text x="50%" y="80%" text-anchor="middle">만들기</text>
                </symbol>
              <g>
                <use class="stroke" xlink:href="#fade-text"/>
                <use class="fill" xlink:href="#fade-text"/>
              </g>
            </svg>
          </div>

            <div class="descript">이 사이트에서는 자신만의 <strong>스터디 플래너</strong>를 제작할 수 있습니다!</div>
            <div class="descript"> 아래 <b>시작하기 버튼</b>을 누르고 나만의 스터디 플래너를 제작해보세요!!</div>
            <div class="descript"> <b>어디서나 계정만 있다면</b> 내가 만들었던 디자인을 인쇄, 수정할 수 있어요 </div>
            <br><br>
          </div>
          <div class="col-sm"> <!-- 왼쪽 내용들입니다-->
          </div>
        </div>
      </div>
  <script>

    window.onload = function() {
      const startBtn = document.querySelector("#start_btn");

      startBtn.addEventListener("click", function() {
        var body = document.getElementsByTagName('body')[0];
      	//$(body).animate({opacity: '0'}, {complete: d(body)}, 'slow');
  			body.outerHTML = '<h1 class = "container">Study Planner <br> Only For You</h1>'
     		setTimeout('window.open("mainPlanner.php", "_self")', 2000);
      });
    }
  </script>
  <!-- Optional Javascirpt -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
  </body>
</html>
