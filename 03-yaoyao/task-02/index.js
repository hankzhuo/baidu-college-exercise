window.onload = function() {
  var name = document.getElementsByClassName("name")[0],
    password = document.getElementsByClassName("password")[0],
    confirmPassword = document.getElementsByClassName("confirm-password")[0],
    email = document.getElementsByClassName("email")[0],
    telephone = document.getElementsByClassName("telephone")[0];

  var nameInput = name.getElementsByTagName("input")[0],
    passwordInput = password.getElementsByTagName("input")[0],
    confirmPasswordInput = confirmPassword.getElementsByTagName("input")[0],
    emailInput = email.getElementsByTagName("input")[0],
    telephoneInput = telephone.getElementsByTagName("input")[0];

  var nameTipText = name.getElementsByTagName("span")[0],
    passwordTipText = password.getElementsByTagName("span")[0],
    confirmPasswordTipText = confirmPassword.getElementsByTagName("span")[0],
    emailTipText = email.getElementsByTagName("span")[0],
    telephoneTipText = telephone.getElementsByTagName("span")[0];

  var submitBtn = document.getElementsByClassName("submit")[0];

  // 计算输入的长度
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

  var setOpacity = function(tipText) {
    tipText.style.opacity = "1";
  };

  var setNotice = function(input, tipText0, tipText, color) {
    input.style.borderColor = color || "red";
    tipText0.style.color = color || "red";
    input.removeAttribute("data-verify");
    tipText0.innerHTML = tipText;
  };

  /**
   * 验证各个表单
   * @param {*} tipText0 初始文字提示
   * @param {*} input 输入框
   * @param {*} tipText1 文字提示1
   * @param {*} tipText2 文字提示2
   * @param {*} tipText3 文字提示3
   * @param {*} reg 正则表达式
   */

  var verify = function(tipText0, input, tipText1, tipText2, tipText3, reg) {
    // 值为空
    if (!input.value) {
      setNotice(input, tipText0, tipText1);
      return;
    }
    // 验证姓名
    if (tipText0 === nameTipText) {
      if (getLength(input.value) > 16 || getLength(input.value) < 4) {
        setNotice(input, tipText0, tipText2);
        return;
      }
    }
    // 验证密码
    if (tipText0 === passwordTipText && !reg.test(input.value)) {
      setNotice(input, tipText0, tipText2);
      return;
    }
    // 验证两次密码是否相同
    if (tipText0 === confirmPasswordTipText) {
      if (confirmPasswordInput.value !== passwordInput.value) {
        setNotice(input, tipText0, tipText2);
        return;
      }
    }
    // 验证邮箱、验证手机号码
    if ((tipText0 === emailTipText && !reg.test(input.value)) ||(tipText0 === telephoneTipText && !reg.test(input.value))) {
      setNotice(input, tipText0, tipText2);
      return;
    }
    setNotice(input, tipText0, tipText3, "#30a930");
    input.setAttribute("data-verify", "true");
  };

  /**
   * 各个表单绑定事件
   */

  // 姓名验证
  nameInput.onblur = function() {
    var tipText1 = "请输入姓名",
      tipText2 = "名字长度为4~16个字符",
      tipText3 = "名字格式正确";
    verify(nameTipText, nameInput, tipText1, tipText2, tipText3);
  };
  nameInput.onfocus = function() {
    setOpacity(nameTipText);
  };

  // 密码验证
  passwordInput.onblur = function() {
    var tipText1 = "请输入密码",
      tipText2 = "密码为字母数字下划线，长度为4~16",
      tipText3 = "密码可用";
    var reg = /^(\w){4,16}$/g;
    verify(passwordTipText, passwordInput, tipText1, tipText2, tipText3, reg);
  };
  passwordInput.onfocus = function() {
    setOpacity(passwordTipText);
  };

  // 验证两次密码是否相同
  confirmPasswordInput.onblur = function() {
    var tipText1 = "请输入密码",
      tipText2 = "两次密码输入不一致",
      tipText3 = "密码两次输入一致";
    verify(confirmPasswordTipText, confirmPasswordInput, tipText1, tipText2, tipText3);
  };
  confirmPasswordInput.onfocus = function() {
    setOpacity(confirmPasswordTipText);
  };

  // 验证邮箱
  emailInput.onblur = function() {
    var tipText1 = "请输入邮箱",
      tipText2 = "邮箱格式不正确",
      tipText3 = "邮箱格式正确";
    var reg = /^\w+(@)\w+/g;
    verify(emailTipText, emailInput, tipText1, tipText2, tipText3, reg);
  };
  emailInput.onfocus = function() {
    setOpacity(emailTipText);
  };

  telephoneInput.onblur = function() {
    var tipText1 = "请输入手机号码",
      tipText2 = "手机号码输入不符合要求",
      tipText3 = "手机号码格式正确";
    var reg = /^1[3568]\d{9}$/g;
    verify(telephoneTipText, telephoneInput, tipText1, tipText2, tipText3, reg);
  };
  telephoneInput.onfocus = function() {
    setOpacity(telephoneTipText);
  };

  /**
   * 点击按钮提交
   */
  
  submitBtn.onclick = function(event) {
    var e = event || window.event;
    e.preventDefault;
    var isAllVerified =
      nameInput.getAttribute("data-verify") &&
      passwordInput.getAttribute("data-verify") &&
      confirmPasswordInput.getAttribute("data-verify") &&
      emailInput.getAttribute("data-verify") &&
      telephoneInput.getAttribute("data-verify");
    if (isAllVerified) {
      alert("提交成功");
    } else {
      alert("提交失败");
    }
  };
};
