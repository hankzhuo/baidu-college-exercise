(function() {
  var wrapper = document.getElementById('wrapper'),
      preOrder = document.getElementById('pre-order'),
      inOrder = document.getElementById('in-order'),
      postOrder = document.getElementById('post-order');
  
  var nodeArr = []; // 把子节点放在一个数组里
  var animation = false; // 加一个状态锁，防止短时间内重复点击

  // 先序遍历
  var inOrderTraverseNode = function(node, callback) {
    if (node !== null) {
      inOrderTraverseNode(node.firstElementChild, callback); // 先访问左树
      callback(node); // 再访问根节点
      inOrderTraverseNode(node.lastElementChild, callback); // 最后访问右树
    }
  };
  // 先序遍历
  var preOrderTraverseNode = function(node, callback) {
    if (node !== null) {
      callback(node);
      preOrderTraverseNode(node.firstElementChild, callback);
      preOrderTraverseNode(node.lastElementChild, callback);
    }
  };
  // 后序遍历
  var postOrderTraverseNode = function(node, callback) {
    if (node !== null) {
      postOrderTraverseNode(node.firstElementChild, callback);
      postOrderTraverseNode(node.lastElementChild, callback);
      callback(node);
    }
  };    

  var pushNode = function (node) {
    nodeArr.push(node);
  }

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
      if (i === nodeArr.length) {
        clearInterval(id);
        nodeArr[nodeArr.length - 1].style.backgroundColor = "#fff";
        nodeArr = [];
        animation = false;
        return false;
      }

      nodeArr[i - 1].style.backgroundColor = "#fff";
      nodeArr[i].style.backgroundColor = "blue";
    }, 500);
  }

  preOrder.onclick = function() {
    preOrderTraverseNode(wrapper, pushNode);
    render();
  };
  inOrder.onclick = function() {
    inOrderTraverseNode(wrapper, pushNode);
    render();
  };
  postOrder.onclick = function() {
    postOrderTraverseNode(wrapper, pushNode);
    render();
  };
})()