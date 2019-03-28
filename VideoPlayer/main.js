var speed = document.querySelector('.speed');
var bar = speed.querySelector('.speed-bar');
var video = document.querySelector('.flex');

function handleMove(e) {
  var y = e.pageY - this.offsetTop;
  var percent = y / this.offsetHeight;
  var min = 0.4;
  var max = 4;
  var height = Math.round(percent * 100) + '%';
  var playbackRate = percent * (max - min) + min;
  bar.style.height = height;
  bar.textContent = playbackRate.toFixed(2) + '倍';
  video.playbackRate = playbackRate;
}

speed.addEventListener('mousemove', handleMove);