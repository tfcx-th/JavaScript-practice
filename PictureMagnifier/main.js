window.onload = function() {
  var objDemo = document.getElementById("demo");
  var objSmall = document.getElementById("small");
  var objMark = document.getElementById("mark");
  var objFloat = document.getElementById("float");
  var objBig = document.getElementById("big");
  var objBigImage = objBig.getElementsByTagName("img")[0];

  // 鼠标移入
  objMark.onmouseover = function() {
    objFloat.style.display = "block";
    objBig.style.display = "block";
  }

  // 鼠标移出
  objMark.onmouseout = function() {
    objFloat.style.display = "none";
    objBig.style.display = "none";
  }

  // 鼠标移动
  objMark.onmousemove = function(ev) {
    var _event = ev || window.event;    // 兼容

    var left = _event.clientX - objDemo.offsetLeft - objSmall.offsetLeft - objFloat.offsetWidth / 2;
    var top = _event.clientY - objDemo.offsetTop - objSmall.offsetTop - objFloat.offsetHeight / 2;
        
    if (left < 0) {
        left = 0;   // 左侧越界
    } else if (left > (objMark.offsetWidth - objFloat.offsetWidth)) {
      left = objMark.offsetWidth - objFloat.offsetWidth;  // 右侧越界
    }

    if (top < 0) {
      top = 0;    // 上侧越界
    } else if (top > (objMark.offsetHeight - objFloat.offsetHeight)) {
      top = objMark.offsetHeight - objFloat.offsetHeight;  // 下侧越界
    }

    objFloat.style.left = left + "px";
    objFloat.style.top = top + "px";
    
    var percentX = left / (objMark.offsetWidth - objFloat.offsetWidth);
    var percentY = top / (objMark.offsetHeight - objFloat.offsetHeight);
    
    objBigImage.style.left = -percentX * (objBigImage.offsetWidth - objBig.offsetWidth) + "px";
    objBigImage.style.top = -percentY * (objBigImage.offsetHeight - objBig.offsetHeight) + "px";
  }
}