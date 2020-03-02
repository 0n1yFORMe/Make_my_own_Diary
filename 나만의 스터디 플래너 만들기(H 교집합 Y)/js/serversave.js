function replaceAll(str, searchStr, replaceStr) {
  return str.split(searchStr).join(replaceStr);
}

$(document).ready(function(){
    $("#saveTxttoserver").click(function(){
        var jsonStr1 = JSON.stringify(getElementList());
        var jsonStr2 = replaceAll(jsonStr1,'"',"");
        var jsonStr3 = replaceAll(jsonStr2,'[',"");
        var jsonStr = replaceAll(jsonStr3,']',"");
        var post_data = "SaveTxttoserver="+jsonStr;

        $.ajax ({
            type:"POST",
            url:"./serversave.php",
            data:post_data,
            success:function(data) {
                alert (jsonStr);
            }
        });
    });
});
