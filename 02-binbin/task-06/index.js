(function(){
  var leftInBtn = document.getElementById("left-in-btn"),
    rightInBtn = document.getElementById("right-in-btn"),
    leftOutBtn = document.getElementById("left-out-btn"),
    rightOutBtn = document.getElementById("right-out-btn"),
    sortBtn = document.getElementById('sort-btn'),
    input = document.getElementById('input'),
    inputSearch = document.getElementById('input-search'),
    list = document.getElementById('list');

    var arr = [];
    // 创建元素
    var createElement = function() {
      var value = input.value;

      if (value == "") {
        alert("请先输入内容");
        return false;
      }

      // list的子节点不超过60个
      if (list.childElementCount > 60) {
        alert('添加总数不能超过60个');
        return false;
      }

      var fragment = document.createDocumentFragment();
      var newArr = createNewArr(value);
      
      for (var i = 0; i < newArr.length; i++) {
        var span = document.createElement("span");
        span.innerHTML += newArr[i];
        fragment.appendChild(span);
      }
      return fragment;
    };

    var createNewArr = function(value) {
       var reg = /\，|\n|\、|\,/g;
       value = value.replace(reg, " ");
       var newArr = value.split(" ");
       return newArr;
    }

    // 删除元素时弹窗
    var deleteElementAlert = function(element) {
      var text = '即将删除元素：' + element.innerHTML;
      alert(text);
    }

    // 左侧添加
    var appendToLeft = function() { 
      var node = createElement();
      var newArr = createNewArr(input.value);

      if (node) {
        list.insertBefore(node, list.firstElementChild || null);
        newArr.forEach(function(item) {
          arr.unshift(item);
        })
        input.value = "";
      }
    };
    // 右侧添加
    var appendToRight = function() {
      var node = createElement();
      var newArr = createNewArr(input.value);

      if (node) {
        list.appendChild(node);
        newArr.forEach(function(item) {
          arr.push(item);
        });
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

    var getIndex = function(target) {
      var spans = list.getElementsByTagName("span");
      for (var i = 0; i < spans.length; i++) {
        if (spans[i] == target) {
          return i;
        }
      }
    }

    // 删除任何一个元素，使用事件代理
    var deleteAnyChild = function(e) {
      var e = event || window.event;
      var target = e.target || e.srcElement;
      if (list.childElementCount == 0) {
        return false;
      }
      
      if (target !== e.currentTarget) {
        deleteElementAlert(target);
        arr.splice(getIndex(target), 1);
        list.removeChild(target);
      }
    }

    // 查询
    var search = function() {
      var searchText = inputSearch.value;
      for (var i = 0; i < arr.length; i++) {
        if(arr[i].indexOf(searchText) !== -1) {
          var spans = list.getElementsByTagName("span");
          for (var j = 0; j < spans.length; j++) {
            if (spans[j].innerHTML == arr[i]) {
                spans[j].style.backgroundColor = "#5e5ee4";
            }
          }
        }
      }
    }

    // 插入事件
    leftInBtn.onclick = appendToLeft;
    rightInBtn.onclick = appendToRight;

    // 移除事件
    leftOutBtn.onclick = deleteFisrtChild;
    rightOutBtn.onclick = deleteLastChild;
    // 点击任何一个元素，相应删除。
    list.onclick = deleteAnyChild;

    // 查询
    sortBtn.onclick = search;
})()