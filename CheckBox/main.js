window.onload = function() {
  var a = document.getElementsByTagName("a")[0];
  var input = document.getElementsByTagName("input");
  var label = document.getElementsByTagName("label")[0];

  // 判断是否被全选
  var isCheckAll = function() {
    var count = 0;
    for (var i = 2; i < input.length; i++) {
      if (input[i].checked) {
        count++;
      }
    }
    //label.innerHTML = (count == input.length - 1 ? '全不选' : '全选');
    if (count === 0) {
      label.innerHTML = '全选';
    } else if (count === input.length - 2) {
      label.innerHTML = '全不选';
    }
  }
    
  // 全选与全不选
  input[0].onclick = function() {
    for (var i = 0; i < input.length; i++) {
      if (i !== 1) {
        input[i].checked = this.checked;
      }
    }
    isCheckAll();
  }

  // 反选
  input[1].onclick = function() {
    for (var i = 2; i < input.length; i++) {
      input[i].checked = (input[i].checked === true) ? false : true;
    }
  }
}