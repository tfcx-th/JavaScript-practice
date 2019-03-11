window.onload = function() {
  var div = document.getElementById('div1');
  var li = document.getElementsByTagName('li');
  var p = document.getElementsByTagName('p')[0];
  var array = ['1分', '2分', '3分', '4分', '5分'];
  var num = 0;
  var flag = false;

  for (var i = 0; i < li.length; i++) {
    li[i].index = i;
    li[i].onmouseover = function() {
      cancelStar();
      num = this.index;
      mark();
    };

    li[i].onclick = function() {
      mark();
      flag = true;
      alert('评分完成，您的评分为' + (num + 1) + '分');
    };

    li[i].onmouseout = function() {
      if (flag) {
        flag = false;
      } else {
        cancelStar();
      }
    };
  }

  function mark() {
    for (var i = 0; i <= num; i++) {
      li[i].className = 'active';
    }
    p.innerHTML = array[num];
  }

  function cancelStar() {
    for (var i = 0; i <= num; i++) {
      li[i].className = '';
    }
    p.innerHTML = '点击✨✨评分';
  }
}