<html>
  <head>

    <meta charset = "utf-8">
     <link href="https://fonts.googleapis.com/css?family=Sunflower:300,700&display=swap" rel="stylesheet">
<title>나만의 스터디 플래너 만들기</title>

<style>
body {
  font-family: "Helvetica Neue", Helvetica, sans-serif;
 /* background: radial-gradient(white, #FFA328);*/
  background-image: url('  https://live.staticflickr.com/65535/49000661446_0391667246_h.jpg');
  /*
  https://live.staticflickr.com/65535/49000657526_90696dfcbb_h.jpg(에펠탑 확대)
  https://live.staticflickr.com/65535/49000661446_0391667246_h.jpg(커피 반투명)
  */

}

 .container {
 	 text-align: center;
   position: absolute;
   top: 48%;
   left: 43%;
   transform: translate(-10%, -50%);
 }

  #start_btn {
  	position: absolute;
    top: 80%;
    left: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    border-radius: 13px;
	  background-color: white ;
    color: black;
    border: 3px solid #7F574A;
    padding: 40px 80px;
    font-size: 40px;
    font-family: 'BRBA_B', sans-serif;
  }
  #start_btn:hover {
    background-color: #7F574A;
    color: white;
    border: 3px solid white;

  }

  p {
    	text-align: center;
    	font-family: 'GoyangIlsan', sans-serif;
    	font-size: 25;
    }

  @font-face { font-family: 'BRBA_B'; src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_seven@1.2/BRBA_B.woff') format('woff'); font-weight: normal; font-style: normal; }


  @font-face { font-family: 'SDMiSaeng'; src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_two@1.0/SDMiSaeng.woff') format('woff'); font-weight: normal; font-style: normal; }

  @font-face { font-family: 'YiSunShinDotumM'; src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_two@1.0/YiSunShinDotumM.woff') format('woff'); font-weight: normal; font-style: normal; }

@font-face { font-family: 'GoyangIlsan'; src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/GoyangIlsan.woff') format('woff'); font-weight: normal; font-style: normal; }
</style>
  </head>

  <body>
    <header style="font-family: 'BRBA_B';font-size: 85; text-align: center; margin-top: 5%; margin-bottom: 2.5%; text-shadow: 2px 2px 2px gray;">나만의 플래너 만들기</header>

<p>이 사이트에서는 자신만의 <strong>스터디 플래너</strong>를 제작할 수 있습니다!</p>



<p> 아래 <b>시작하기 버튼</b>을 누르고 나만의 스터디 플래너를 제작해보세요!!</p>


    <p> <b>pdf로 저장</b>시 인쇄가 가능하지만 다시 <b>수정</b>하지 못합니다!</p>

<p> <b>중간 저장</b>시 다시 불러와 수정할 수 있습니다!</p>


<input type = 'button' value = '시작하기' id = "start_btn" >




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


  </body>
</html>
