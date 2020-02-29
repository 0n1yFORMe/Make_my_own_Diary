<?php
  $id = $_POST['username'];
  $pw = $_POST['password'];
  $pwsh= hash("sha256", $pw);
  $pwc = $_POST['re_password'];
  $pwcsh= hash("sha256", $pwc);

  require $_SERVER["DOCUMENT_ROOT"].'/scripts/dbconnect.php';

  $result = mysqli_query($connect, "SELECT * FROM users WHERE username = '$id'");
  if(mysqli_num_rows($result)==1){
    echo "<script>alert(\"이미 존재하는 아이디입니다\"); history.go(-1);</script>";
    exit();
  }

  if($id == NULL || $pw == NULL || $pwc == NULL ) {
      echo "<script>alert(\"채우지 않은 칸이 존재합니다\"); history.go(-1);</script>";
      exit();
  }

  if($pwsh!=$pwcsh) {
      echo "<script>alert(\"비밀번호와 비밀번호 확인이 일치하지 않습니다\"); history.go(-1);</script>";
      exit();
  }

    $SIDcheck = mysqli_query($connect, "SELECT * FROM users");
    $SID = mysqli_num_rows($SIDcheck);
    $registerdate = date('Y-m-d');
    $signup = mysqli_query($connect, "INSERT INTO users (SID, username, password, settings, registerdate) VALUES ('$SID', '$id', '$pwsh',  null, now())");
    if($signup){
      echo "<script>alert(\"회원가입 성공! 로그인하세요\"); location.href='index.php';</script>";
    }
    else{
        echo "<script>alert(\"회원가입 실패, 재시도\"); history.go(-1);</script>";
    }

?>
