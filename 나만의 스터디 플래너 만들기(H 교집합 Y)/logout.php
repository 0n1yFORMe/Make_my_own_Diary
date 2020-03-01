<?php
session_start();       //세션시작
session_unset();     // 현재 연결된 세션에 등록되어 있는 모든 변수의 값을 삭제한다
session_destroy();  //현재의 세션을 종료한다

 echo "<script>alert(\"로그아웃 성공\"); location.href='index.php';</script>";
?>
