(function(){
  var leftInBtn = document.getElementById("left-in-btn"),
    rightInBtn = document.getElementById("right-in-btn"),
    leftOutBtn = document.getElementById("left-out-btn"),
    rightOutBtn = document.getElementById("right-out-btn"),
    sortBtn = document.getElementById('sort-btn'),
    input = document.getElementById('input'),
    list = document.getElementById('list');

    var arr = [];
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

      if (Number(value) < 10 || Number(value) >= 61) {
        alert("输入数字必须大于10或者小于60");
        input.value = "";
        return false;
      }
      // list的子节点不超过60个
      if (list.childElementCount > 60) {
        alert('添加总数不能超过60个');
        return false;
      }

      var span = document.createElement("span");
      var h = Number(value) + 10;     
      span.innerHTML = value;
      span.style.height = h + 'px';
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
        arr.unshift(input.value);
        input.value = "";
      }
    };
    // 右侧添加
    var appendToRight = function() {
      var node = createElement();
      if (node) {
        list.appendChild(node);
        arr.push(input.value);
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
      arr.shift();
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
      arr.pop();
      list.removeChild(element);
    };

    // 删除任何一个元素，使用事件代理
    var deleteAnyChild = function(e) {
      var e = event || window.event;
      deleteElementAlert(e.target);
      // var spans = list.getElementsByTagName('span')
      // console.log(spans)

      list.removeChild(e.target);
    }

    var sortAppend = function() {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < arr.length; i++) {
        var span = document.createElement("span");
        var h = Number(arr[i]) + 10;                    
        span.innerHTML += arr[i];
        span.style.height = h + "px";
        fragment.appendChild(span);
      }
      list.innerHTML = '';
      list.appendChild(fragment);
    }

    // 排序
    var sort = function() {
      var temper;
      for(var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr.length-i-1; j++) {
          if (arr[j] > arr[j + 1]) {
            temper = arr[j];
            arr[j] = arr[j + 1];
            arr[j+1] = temper;
          }
        }
      }
      sortAppend();
    }

  
    // 插入事件
    leftInBtn.onclick = appendToLeft;
    rightInBtn.onclick = appendToRight;

    // 移除事件
    leftOutBtn.onclick = deleteFisrtChild;
    rightOutBtn.onclick = deleteLastChild;
    // 点击任何一个元素，相应删除。
    list.onclick = deleteAnyChild;

    // 排序
    sortBtn.onclick = sort;
})()