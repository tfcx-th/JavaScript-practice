(function() {
  var Router = function() {
    this.routes = {};
    this.curUrl = '';
  }
  
  Router.prototype.init = function() {
    // hashchange时间，当hash变化时，调用reloadPage方法
    // 第一个this指向window，bind里的this指向调用这个函数的对象
    window.addEventListener('hashchange', this.reloadPage.bind(this));
  }

  Router.prototype.reloadPage = function() {
    this.curUrl = location.hash.substring(1) || '/';
    this.routes[this.curUrl]();
  }

  Router.prototype.map = function(key, callback) {
    this.routes[key] = callback;
  }

  window.oRou = Router;
})();

var oRouter2 = new oRou();
oRouter2.init();
oRouter2.map('/', function() {
  var oSidebar = document.querySelector('sidebar');
  oSidebar.innerHTML = '吃啥';
});

oRouter2.map('/apple', function() {
  var oSidebar = document.querySelector('sidebar');
  oSidebar.innerHTML = '吃苹果';
});

oRouter2.map('/banana', function() {
  var oSidebar = document.querySelector('sidebar');
  oSidebar.innerHTML = '吃香蕉';
});

oRouter2.map('/orange', function() {
  var oSidebar = document.querySelector('sidebar');
  oSidebar.innerHTML = '吃橘子';
});

