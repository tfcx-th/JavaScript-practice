function createDiv() {
  for (var i = 0; i < 20; i++) {
    var div = document.createElement('div');
    // div的高度在50-350之间
    var rnd = Math.floor(Math.random() * 300 + 50);
    div.style.height = rnd + 'px';
    div.innerHTML = i;
    document.body.appendChild(div);
  }
  change();
}

createDiv();

function change() {
  var div = document.getElementsByTagName('div');
  // 窗口宽度
  var windowClientWidth = document.documentElement.clientWidth;
  // 一行容纳多少个div
  var n = Math.floor(windowClientWidth / 210);

  if (n <= 0)
    return;
  
  var t = 0;
  var center = (windowClientWidth - n * 210) / 2;
  var divHeight = [];
  for (var i = 0; i < div.length; i++) {
    var j = i % n;
    if (divHeight.length == n) {
      // 从最矮的排起
      var min = findMin(divHeight);
      
      div[i].style.left = center + min * 210 + 'px';
      div[i].style.top = divHeight[min] + 10 + 'px';

      divHeight[min] += div[i].offsetHeight + 10;
    } else {
      divHeight[j] = div[i].offsetHeight;
      div[i].style.left = center + 200 * j + 10 * j + 'px';
      div[i].style.top = 0;
    }
  }
}

window.onresize = function() {
  change();
}

window.onscroll = function() {
  // 页面总高度
  var bodyHeight = document.documentElement.offsetHeight;
  // 可视区高度
  var windowHeight = document.documentElement.clientHeight;
  // 滚动条高度
  var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  var scrollHeight = document.body.scrollHeight;
  if (scrollTop + windowHeight >= scrollHeight - 20) {
    createDiv();
  }
}

function findMin(arr) {
  var m = 0;
  for (var i = 0; i < arr.length; i++) {
    m = Math.min(arr[m], arr[i]) === arr[m] ? m : i;
  }
  return m;
}