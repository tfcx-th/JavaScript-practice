(function () {
  const link = $('wrap').getElementsByTagName('a');

  for (let i = 0; i < link.length; i++) {
    link[i].onclick = function () {
      const src = this.href;
      let cur = i;

      $('black').style.display = 'block';
      console.log($('black'))
      $('big').style.display = 'block';
      $('big').style.left = '50%';
      $('big').style.top = '50%';
      $('big').style.marginLeft = -$('big').offsetWidth / 2 + 'px';
      $('big').style.marginTop = -$('big').offsetHeight / 2 + 'px';

      $('bigImg').src = src;

      $('left').onclick = function () {
        cur--;
        if (cur < 0) {
          cur = link.length - 1;
        }
        $('bigImg').src = link[cur].href;
      }
      $('right').onclick = function () {
        cur++;
        if (cur >= link.length) {
          cur = 0;
        }
        $('bigImg').src = link[cur].href;
      }
      return false;
    }
  }

  $('black').onclick = function () {
    $('black').style.display = 'none';
    $('big').style.display = 'none';
  }
})()

function $(firstClass) {
  return document.getElementsByClassName(firstClass)[0];
}