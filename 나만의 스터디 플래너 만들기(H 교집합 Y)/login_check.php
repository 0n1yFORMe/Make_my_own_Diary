<?php
  session_start();
  $id = $_POST['username'];
  $pw = $_POST['password'];
  $pwsh= hash("sha256", $pw);
  require $_SERVER["DOCUMENT_ROOT"].'/scripts/dbconnect.php';
  $result = mysqli_query($connect, "SELECT * FROM users WHERE username = '$id'");
  if(mysqli_num_rows($result)==1){
    $row=mysqli_fetch_array($result);
    if($row['password'] == $pwsh){
      $_SESSION['username']= $id;
      if(isset($_SESSION['username'])){
        header('Location: mainPlanner.php');
      }
      else{
        echo "<script>alert(\"세션 저장 실패(관리자에게 문의)\"); history.go(-1);</script>";
      }
    }
    else{
      echo "<script>alert(\"잘못 입력하셨습니다\"); history.go(-1);</script>";
    }
  }
  else{
    echo "<script>alert(\"존재하지 않는 아이디 입니다\"); history.go(-1);</script>";;
  }
 ?>
