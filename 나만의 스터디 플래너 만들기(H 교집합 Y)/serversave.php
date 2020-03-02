<?php
require $_SERVER["DOCUMENT_ROOT"].'/scripts/dbconnect.php';
session_start();
$sessionusername = $_SESSION['username'];
$result = $_POST['SaveTxttoserver'];
if($result){
  $makeform = mysqli_query($connect, "UPDATE form SET formdata = '$result' WHERE username = '$sessionusername'");
}
else{
  header('Location: http://3.17.25.159/');
}
?>
