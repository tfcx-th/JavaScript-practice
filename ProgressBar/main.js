(function() {
  var progressbar = {
    init: function() {
      var fill = document.getElementById('fill');
      var count = 0;
      var timer = setInterval(() => {
        count++;
        fill.innerHTML = count + '%';
        if (count === 100) {
          clearInterval(timer);
        }
      }, 17);
    }
  };
  progressbar.init();
})();