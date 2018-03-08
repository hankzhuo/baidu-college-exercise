(function(){
  var leftInBtn = document.getElementById("left-in-btn"),
    rightInBtn = document.getElementById("right-in-btn"),
    leftOutBtn = document.getElementById("left-out-btn"),
    rightOutBtn = document.getElementById("right-out-btn"),
    input = document.getElementById('input'),
    list = document.getElementById('list');

    // 创建元素
    var createElement = function() {
      var value = input.value;
      if (value == "") {
        alert("请先输入内容");
        return false;
      }
      if (isNaN(value*1)) {
        alert("请输入数字");
        input.value = '';
        return false;
      }

      var span = document.createElement("span");
      span.innerHTML = value;
      return span;
    };
    // 删除元素时弹窗
    var deleteElementAlert = function(element) {
      var text = '即将删除元素：' + element.innerHTML;
      alert(text);
    }

    // 左侧添加
    var appendToLeft = function() { 
      var node = createElement();
      if (node) {
        list.insertBefore(node, list.firstElementChild || null);
        input.value = "";
      }
    };
    // 右侧添加
    var appendToRight = function() {
      var node = createElement();
      if (node) {
        list.appendChild(node);
        input.value = "";
      }
    };

    // 左侧删除
    var deleteFisrtChild = function() {
      if (list.childElementCount === 0) {
        alert("没有元素可删");
        return false;
      }
      var element = list.firstElementChild;
      deleteElementAlert(element);
      list.removeChild(element);
    };
    // 右侧删除
    var deleteLastChild = function() {
      if (list.childElementCount === 0) {
        alert("没有元素可删");
        return false;
      }
      var element = list.lastElementChild;
      deleteElementAlert(element);
      list.removeChild(element);
    };

    // 删除任何一个元素，使用事件代理
    var deleteAnyChild = function(e) {
      var e = event || window.event;
      deleteElementAlert(e.target);
      list.removeChild(e.target);
    }   
    
    // 插入事件
    leftInBtn.onclick = appendToLeft;
    rightInBtn.onclick = appendToRight;

    // 移除事件
    leftOutBtn.onclick = deleteFisrtChild;
    rightOutBtn.onclick = deleteLastChild;
    // 点击任何一个元素，相应删除。
    list.onclick = deleteAnyChild;
})()