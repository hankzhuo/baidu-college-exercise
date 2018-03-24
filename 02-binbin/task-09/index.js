(function() {
  var wrapper = document.getElementById("wrapper"),
    deepTraverseBtn = document.getElementById("deep-traverse"),
    rangeTraverseBtn = document.getElementById("range-traverse"),
    deepSearchBtn = document.getElementById("deep-search-btn"),
    rangeSearchBtn = document.getElementById("range-traverse-btn"),
    deleteBtn = document.getElementById('delete-btn'),
    addBtn = document.getElementById('add-btn'),
    input = document.getElementById("input-number");

  var nodeArr = []; // 把子节点放在一个数组里
  var animation = false; // 加一个状态锁，防止短时间内重复点击
  var index = 0;
  var text;

  // 深度优先遍历，前序遍历
  var deepTraverseNode = function(node, callback) {
    if (node !== null) {
      callback(node);
      for (var i = 0; i < node.children.length; i++) {
        deepTraverseNode(node.children[i], callback);
      }
    }
  };

  // 广度优先遍历
  var rangeTraverseNode = function(node, callback) {
    if(node !== null) {
      callback(node);
      rangeTraverseNode(node.nextElementSibling, callback);    
      node = nodeArr[index++];
      rangeTraverseNode(node.firstElementChild, callback);
    }
  };

  var pushNode = function (node) {
    nodeArr.push(node);
  };

  // 监听input输入的值
  input.addEventListener("change", function() {
    text = this.value;
  }, false)
    
  var render = function() {
    if (animation) {
      alert('动画还没执行完。。。');
      return false;
    }
    var i = 0;
    animation = true;
    nodeArr[i].style.backgroundColor = "blue";
    var id = setInterval(function() {
      i++;
      // 遍历
      if (i === nodeArr.length && !text) {
        clearInterval(id);
        nodeArr[nodeArr.length - 1].style.backgroundColor = "#fff";
        nodeArr = [];
        animation = false;
        return false;
      }
      // 查询
      if (text && nodeArr[i].firstChild.nodeValue.replace(/(^\s*)|(\s*$)/g, "") === text) {
        clearInterval(id);
        nodeArr[i - 1].style.backgroundColor = "#fff";
        nodeArr = [];
        animation = false;
        alert('查询到内容：',text);
        return false;
      } else if (text) {
        if (i === (nodeArr.length - 1)) {
          clearInterval(id);
          alert('没有找到对应的内容');
          nodeArr[i - 1].style.backgroundColor = "#fff";
          nodeArr = [];
          animation = false;
          return false;  
        }
      }

      nodeArr[i - 1].style.backgroundColor = "#fff";
      nodeArr[i].style.backgroundColor = "blue";
    }, 500);
  };
  
  deepTraverseBtn.onclick = function() {
    if (!nodeArr.length) {
      nodeArr = [];
    }
    deepTraverseNode(wrapper, pushNode);
    render();
  };

  rangeTraverseBtn.onclick = function() {
    if (!nodeArr.length) {
      nodeArr = [];
      index = 0;
    }
    rangeTraverseNode(wrapper, pushNode);
    render();
  };

  deepSearchBtn.onclick = function() {
    if (text) {
      deepTraverseNode(wrapper, pushNode);
      render(text);
    } else {
      alert('请输入字符')
    }
  };

  rangeSearchBtn.onclick = function() {
    if (text) {
      rangeTraverseNode(wrapper, pushNode);
      render(text);
    } else {
      alert("请输入字符");
    }
  }

  var setBG = function(target) {
    target.style.backgroundColor = "#fff";
  }

  wrapper.onclick = function(e) {
    var target = e.target || e.srcElement;
    deepTraverseNode(wrapper, setBG);
    target.style.backgroundColor = "red";

    deleteBtn.onclick = function() {
      deleteElement(target);
    };

    addBtn.onclick = function() {
      if (text) {
        addElement(target);
      } else {
        alert('请输入内容')
      }
    };
  }

  var deleteElement = function(target) {
    target.parentElement.removeChild(target);
  }

  var addElement = function(target) {
    var div = document.createElement('div');
    div.className = 'layer'
    div.innerHTML = text;
    target.appendChild(div);
  }
})()
