window.onload = function() {
  var verify = document.getElementsByClassName("verify")[0],
    button = verify.lastElementChild,
    input = verify.getElementsByTagName('input')[0];
  var placehold = document.getElementById("placehold");

  var getLength = function(val) {
    var len = 0;
    for (var i = 0; i < val.length; i++) {
      var a = val.charAt(i);
      if (a.match(/[^\x00-\xff]/gi) !== null) {
        len += 2;
      } else {
        len += 1;
      }
    }
    return len;
  };

  var verify = function() {
    if (!input.value) {
      placehold.innerHTML = "请输入姓名";
      placehold.style.color = "red";
      input.style.borderColor = "red";
      return;
    }

    if (getLength(input.value) > 16 || getLength(input.value) < 4) {
      placehold.innerHTML = "长度为4~16个字符";
      input.style.borderColor = "red";
      placehold.style.color = "red";
      return;
    }

    placehold.innerHTML = "名字格式正确";
    placehold.style.color = "green";
    input.style.borderColor = "#ccc";
  };

  button.onclick = verify;
};
