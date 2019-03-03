var body = document.getElementsByTagName('body')[0];
var banner = document.getElementsByClassName('banner');
var span = document.getElementsByClassName('tab')[0].getElementsByTagName('span');
var nNext = document.getElementsByClassName('next')[0];
var prev = document.getElementsByClassName('prev')[0];
var on = document.getElementsByClassName('on')[0];

// 初始化界面，第一张图
banner[0].style.opacity = '1';
span[0].className = 'on';
var num = 0;

for (var i = 0; i < span.length; i++) {
  span[i].index = i;
  span[i].onclick = function() {
    for (var j = 0; j < span.length; j++) {
      num = this.index;
      span[j].className = '';
      banner[j].style.opacity = '0';
    }
    span[num].className = 'on';
    banner[num].style.opacity = '1';
  }
  
  // 点击切换下一张
  nNext.onclick = function() {
    for (var j = 0; j < span.length; j++) {
      if (span[j].className == 'on') {
        span[j].className = '';
        banner[j].style.opacity = '0';
        num++;
        j++;
        // 最后一张
        if (j > 4) {
          j = 0;
        }
        span[j].className = 'on';
        banner[j].style.opacity = '1';
      }
    }
  }

  // 点击切换上一张
  prev.onclick = function() {
    for (var j = 0; j < span.length; j++) {
      if (span[j].className == 'on') {
        span[j].className = '';
        banner[j].style.opacity = '0';
        num--;
        j--;
        // 第一张
        if (j < 0) {
          j = 4;
        }
        span[j].className = 'on';
        banner[j].style.opacity = '1';
      }
    }
  }

  // 定时器运行函数
  function Time() {
    num++;
    if (num < 5) {
      for (var j = 0; j < span.length; j++) {
        span[j].className = '';
        banner[j].style.opacity = '0';
      }
      span[num].className = 'on';
      banner[num].style.opacity = '1';
    } else {
      num = -1;
    }
  }
  clearInterval(timer);
  var timer = setInterval(Time(), 2000);

  body.onmouseover = function() {
    clearInterval(timer);
  };

  body.onmouseout = function() {
    clearInterval(timer);
    timer = setInterval(Time(), 2000);
  }
}