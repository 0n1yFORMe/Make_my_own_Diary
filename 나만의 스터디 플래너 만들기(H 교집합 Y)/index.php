<html>
  <head>
    <meta charset = "utf-8">
     <link href="https://fonts.googleapis.com/css?family=Sunflower:300,700&display=swap" rel="stylesheet">
     <link href="css/main.css" rel="stylesheet"> <!-- main.css에 추가 효과 모아두었습니다.-->
     <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
     <!-- Bootstrap CSS -->
     <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
     <title>나만의 스터디 플래너 만들기</title>
  </head>
  <body>
  <div class="container">
      <div class="row">
          <div class="col"> <!-- 왼쪽 내용들입니다-->
            <header style="font-family: 'BRBA_B';font-size: 45; text-align: center; margin-top: 5%; margin-bottom: 2.5%; text-shadow: 2px 2px 2px gray;">나만의 플래너 만들기</header>
            <p>이 사이트에서는 자신만의 <strong>스터디 플래너</strong>를 제작할 수 있습니다!</p>
            <p> 아래 <b>시작하기 버튼</b>을 누르고 나만의 스터디 플래너를 제작해보세요!!</p>
            <p> <b>어디서나 계정만 있다면</b> 내가 만들었던 디자인을 인쇄, 수정할 수 있어요 </p>
          </div>
        <div class="col"> <!-- 오른쪽 내용들입니다-->
          <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </p>
        </div>
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
  <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
  </body>
</html>
