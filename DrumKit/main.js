// 音效播放，添加动画
function playSound(e) {
  let audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  let key = document.querySelector(`div[data-key="${e.keyCode}"]`);

  if (!audio) return;

  key.classList.add('playing');
  audio.currentTime = 0;
  audio.play();
}

// 动画结束后移除动画
function removeTransition(e) {
  if (e.propertyName !== 'transform') return;
  e.target.classList.remove('playing');
}

const keys = Array.from(document.querySelectorAll('.key'));
window.addEventListener('keydown', playSound);
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
