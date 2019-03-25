(function () {
  var hourHand = document.querySelector('.hour-hand');
  var minHand = document.querySelector('.min-hand');
  var secondHand = document.querySelector('.second-hand');

  function update() {
    var now = new Date();
    
    var secondDegrees = now.getSeconds() * 6;
    secondHand.style.transform = `rotate(${secondDegrees}deg)`;
    
    var minDegrees = (now.getMinutes() * 6) + (now.getSeconds() / 60) * 6;
    minHand.style.transform = `rotate(${minDegrees}deg)`;

    var hourDegrees = (now.getHours() - 12) * 30 + (now.getMinutes() / 60) * 30;
    hourHand.style.transform = `rotate(${hourDegrees}deg)`;
  }

  setInterval(update, 1000);
  update();
})();

(function () {
  var date = document.querySelector('.date');
  var week = document.querySelector('.week');
  var time = document.querySelector('.time');

  function changeDate() {
    var now = new Date();
    var weekArray = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    var showDate = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
    date.innerHTML = showDate;
    week.innerHTML = weekArray[now.getDay()];
  }
  
  changeDate();
  setInterval(changeDate, 24 * 3600);

  function addZero(num) {
    if (num >= 10) {
      return num;
    } else {
      return '0' + num;
    }
  }

  function changeTime() {
    var now = new Date();
    var showTime = now.getHours() + ':' + addZero(now.getMinutes()) + ':' + addZero(now.getSeconds());
    time.innerHTML = showTime;
  }

  changeTime();
  setInterval(changeTime, 1000);
})();
