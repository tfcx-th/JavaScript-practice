// 用于区分鼠标点击事件和鼠标移动事件
var drawflag = false;

var beginX = 0,
    beginY = 0;

// 初始色调
var hue = 0;

var context = '';

var lineWidth = 60;

var direction = true;

window.onload = function () {
  let canvas = document.querySelector('#rainbow');
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  context = canvas.getContext('2d');

  canvas.addEventListener('mousedown', beginlocation);
  canvas.addEventListener('mousemove', drawing);
  canvas.addEventListener('mouseup', () => drawflag = false);
  canvas.addEventListener('mouseout', () => drawflag = false);
}

// 设定初始点坐标，并开启绘图flag
function beginlocation(e) {
  beginX = e.offsetX;
  beginY = e.offsetY;
  drawflag = true;
}

// 绘图函数：实际上一段一段的直线连接而成，鼠标每移动一点就将该时刻的坐标转换成下一次的起始坐标，而鼠标移动后的位置作为该段直线结束的坐标
function drawing(e) {
  if (drawflag) {
    let moveX = e.offsetX;
    let moveY = e.offsetY;

    // 色相值改变
    if (hue <= 360) {
      hue++;
    } else {
      hue = 0;
    }
    context.strokeStyle = `hsl(${hue}, 100%, 50%)`;

    // 达到边界反弹
    if (lineWidth > 100 || lineWidth < 10) {
      direction = !direction;
    }
    if (direction) {
      lineWidth++;
    } else {
      lineWidth--;
    }
    context.lineWidth = lineWidth;

    context.lineCap = 'round';
    context.lineJoin = 'round';

    context.beginPath();
    context.moveTo(beginX, beginY);
    context.lineTo(moveX, moveY);
    context.closePath();
    [beginX, beginY] = [moveX, moveY];

    context.stroke();
  } else {
    return;
  }

}