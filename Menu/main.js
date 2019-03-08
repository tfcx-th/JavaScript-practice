window.onload = function() {
  var menu = document.getElementById('menu');
  var h2 = menu.getElementsByTagName('h2');
  var ul = menu.getElementsByTagName('ul');

  for (var i = 0; i < h2.length; i++) {
    h2[i].index = i;
    h2[i].onclick = function() {
      for (var j = 0; j < ul.length; j++) {
        if (j == this.index) {
          if (ul[j].style.display == 'block') {
            ul[j].style.display = 'none';
            h2[j].className = 'active11';
          } else {
            ul[this.index].style.display = 'block';
            h2[this.index].className = 'active';
          }
        } else {
          ul[j].style.display = 'none';
          h2[j].className = 'active11';
        }
      }
    };
  }
}