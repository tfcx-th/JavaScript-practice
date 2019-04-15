window.onload = function() {
  // 原始数据
  var seaboard = [
    { "stop": "Washington",     "latitude": 38.895111, "longitude": -77.036667, "duration":  77, "offset": [-30,-10] },
    { "stop": "Fredericksburg", "latitude": 38.301806, "longitude": -77.470833, "duration":  89, "offset": [  6,  4] },
    { "stop": "Richmond",       "latitude": 37.533333, "longitude": -77.466667, "duration":  29, "offset": [  6,  4] },
    { "stop": "Petersburg",     "latitude": 37.21295,  "longitude": -77.400417, "duration":  93, "offset": [  6,  4] },
    { "stop": "Henderson",      "latitude": 36.324722, "longitude": -78.408611, "duration":  44, "offset": [  6,  4] },
    { "stop": "Raleigh",        "latitude": 35.818889, "longitude": -78.644722, "duration": 116, "offset": [  6,  4] },
    { "stop": "Hamlet",         "latitude": 34.888056, "longitude": -79.706111, "duration":  74, "offset": [  6,  6] },
    { "stop": "Monroe",         "latitude": 34.988889, "longitude": -80.549722, "duration":  58, "offset": [  6, -8] },
    { "stop": "Chester",        "latitude": 34.705556, "longitude": -81.211667, "duration":  54, "offset": [  6,  6] },
    { "stop": "Clinton",        "latitude": 34.471389, "longitude": -81.875,    "duration":  34, "offset": [  6,  6] },
    { "stop": "Greenwood",      "latitude": 34.189722, "longitude": -82.154722, "duration":  22, "offset": [ 10, -2] },
    { "stop": "Abbeville",      "latitude": 34.178611, "longitude": -82.379167, "duration":  39, "offset": [  4, 10] },
    { "stop": "Elberton",       "latitude": 34.109722, "longitude": -82.865556, "duration":  41, "offset": [  6, 10] },
    { "stop": "Athens",         "latitude": 33.95,     "longitude": -83.383333, "duration":  75, "offset": [  6,  6] },
    { "stop": "Emory",          "latitude": 33.791111, "longitude": -84.323333, "duration":  25, "offset": [ 10,  4] },
    { "stop": "Atlanta",        "latitude": 33.755,    "longitude": -84.39,     "duration":   0, "offset": [-21, 10] }
  ];

  var southern = [
    { "stop": "Washington",      "latitude": 38.895111, "longitude": -77.036667, "duration":  14, "offset": [-30,-10] },
    { "stop": "Alexandria",      "latitude": 38.804722, "longitude": -77.047222, "duration": 116, "offset": [  4,  4] },
    { "stop": "Charlottesville", "latitude": 38.0299,   "longitude": -78.479,    "duration":  77, "offset": [-85,  0] },
    { "stop": "Lynchburg",       "latitude": 37.403672, "longitude": -79.170205, "duration":  71, "offset": [-62,  0] },
    { "stop": "Danville",        "latitude": 36.587238, "longitude": -79.404404, "duration":  64, "offset": [-48, -1] },
    { "stop": "Greensboro",      "latitude": 36.08,     "longitude": -79.819444, "duration":  18, "offset": [-69, -4] },
    { "stop": "High Point",      "latitude": 35.970556, "longitude": -79.9975,   "duration":  47, "offset": [  5,  7] },
    { "stop": "Salisbury",       "latitude": 35.668333, "longitude": -80.478611, "duration":  50, "offset": [-57,  0] },
    { "stop": "Charlotte",       "latitude": 35.226944, "longitude": -80.843333, "duration":  25, "offset": [  8,  0] },
    { "stop": "Gastonia",        "latitude": 35.255278, "longitude": -81.180278, "duration":  63, "offset": [-26,-10] },
    { "stop": "Spartanburg",     "latitude": 34.946667, "longitude": -81.9275,   "duration":  43, "offset": [-80, -7] },
    { "stop": "Greenville",      "latitude": 34.844444, "longitude": -82.385556, "duration": 187, "offset": [-70,  2] },
    { "stop": "Atlanta",         "latitude": 33.755,    "longitude": -84.39,     "duration":   0, "offset": [-21, 10] }
  ];

  var map = L.map('map',{

    // 确定地图中心
    center: [36.3, -80.6],

    // 确定地图四角
    maxBounds: [ [33.32134852669881, -85.20996093749999], [39.16414104768742, -75.9814453125] ],

    // 将最小缩放级别、最大缩放级别和初始缩放级别设置成相等
    zoom: 7,
    minZoom: 7,
    maxZoom: 7,

    // 禁止鼠标拖拽地图
    dragging: false,

    // 禁用缩放组件
    zoomControl: false,

    // 禁止用户的缩放交互
    touchZoom: false,
    scrollWheelZoom: false,
    doubleClickZoom: false,
    boxZoom: false,

    // 禁止用键盘拖拽地图的功能
    keyboard: false
  });

  L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
    maxZoom: 16
  }).addTo(map);

  // 添加两条路线
  L.polyline(
    seaboard.map(function(stop) {
      return [stop.latitude, stop.longitude];
    }),{
      color: '#88020b',
      weight: 1,
      clickable: false
  }).addTo(map);
  
  L.polyline(southern.map(
    function(stop) {
      return [stop.latitude, stop.longitude];
    }), {
      color: '#106634',
      weight: 1,
      clickable: false
  }).addTo(map);

  // 添加动画效果
  L.Control.Animate = L.Control.extend({

    // 动画控制器选项
    options: {

      // 控制器位置
      position: 'bottomleft',

      // 按钮状态和文字描述
      animateStartText: '▶︎',
      animateStartTitle: 'Start animation',
      animatePauseText: '◼︎',
      animatePauseTitle: 'Pause animation',
      animateResumeText: '▶︎',
      animateResumeTitle: 'Resume animation',

      // 动画开始和结束函数
      animateStartFn: null,
      animateStopFn: null
    },

    // 让控制器显示在地图上
    onAdd: function () {
      var animateName = 'leaflet-control-animate',
          container = L.DomUtil.create('div', animateName + ' leaflet-bar'),
          options = this.options;
      this._button  = this._createButton(
        options.animateStartText,
        options.animateStartTitle,
        animateName,
        container,
        this._clicked
      );
      return container;
    },

    _createButton: function (html, title, className, container, fn) {
      var link = L.DomUtil.create('a', className, container);
      link.innerHTML = html;
      link.href = '#';
      link.title = title;

      L.DomEvent
        .on(link, 'mousedown dblclick', L.DomEvent.stopPropagation)
        .on(link, 'click', L.DomEvent.stop)
        .on(link, 'click', fn, this);

      return link;
    },

    // 监听动画是否在执行
    _running: false,

    // 根据回调函数决定是否执行
    _clicked: function() {
      if (this._running) {
        this._button.innerHTML = this.options.animateResumeText;
        this._button.title = this.options.animateResumeTitle;
        if (this.options.animateStopFn) {
          this.options.animateStopFn();
        }
      } else {
        this._button.innerHTML = this.options.animatePauseText;
        this._button.title = this.options.animatePauseTitle;
        if (this.options.animateStartFn) {
            this.options.animateStartFn();
        }
      }
      this._running = !this._running;
    },

    // 复位为原始状态
    reset: function() {
      this._running = false;
      this._button.innerHTML = this.options.animateStartText;
      this._button.title = this.options.animateStartTitle;
    }
  });

  L.control.animate = function(options) {
    return new L.Control.Animate(options);
  };

  // 创建自定义的标签对象
  L.Label = L.Class.extend({
    initialize: function(latLong, label, options) {
      this._latLong = latLong;
      this._label = label;
      L.Util.setOptions(this, options);
      this._status = 'hidden';
    },

    // 标签位置
    options: {
      offset: new L.Point(0, 0)
    },

    // 给地图添加标签
    onAdd: function(map){

      // 创建div元素
      this._container = L.DomUtil.create('div', 'leaflet-label');

      // 将line-height和opacity设置为0
      this._container.style.lineHeight = "0";
      this._container.style.opacity = "0";

      // 将上面的元素添加到markerPane层
      map.getPanes().markerPane.appendChild(this._container);
      
      // 获取HTML内部的文本作为标签的文本
      this._container.innerHTML = this._label;
      
      // 计算标签位置
      let pos = map.latLngToLayerPoint(this._latLong);
      let op = new L.Point(
        pos.x + this.options.offset.x,
        pos.y + this.options.offset.y
      );

      // 在地图上定位
      L.DomUtil.setPosition(this._container, op);
    },

    // 获取和设置标签状态
    getStatus: function() {
      return this._status;
    },

    setStatus: function(status) {
      switch (status) {
        case "hidden":
          this._status = "hidden";
          this._container.style.opacity = "0";
          break;
        case "shown":
          this._status = "shown";
          this._container.style.opacity = "1";
          break;
        case "dimmed":
          this._status = "dimmed";
          this._container.style.opacity = "0.5";
          break;
      }
    }
  })

  L.Control.Title = L.Control.extend({
    options: {
        position: "topleft"
    },

    initialize: function (title, options) {
        L.setOptions(this, options);
        this._title = title;
    },

    onAdd: function (map) {
        var container = L.DomUtil.create('div', 'leaflet-control-title');
        container.innerHTML = this._title;
        return container;
    }
  });

  L.control.title = function(title, options) {
    return new L.Control.Title(title, options);
  };

  L.control.title(
    "<h1>Geography as a Competitive Advantage</h1>" +
    "<p>In the 1940s, the route of Southern Railways’ <i>Southerner</i> " +
    "(<span class='southern'>━━━</span>) " +
    "was shorter than the rival " +
    "<i>Silver Comet</i> of the Seaboard Air Line " +
    "(<span class='seaboard'>━━━</span>)." +
    "Passengers traveling on the <i>Southerner</i> " +
    "could expect to arrive more than 90 minutes sooner " +
    "than those on the <i>Silver Comet</i>.</p>" +
    "<p>Click the play button below to trace the journeys " +
    "of both trains between Washington, DC and Atlanta, GA.</p>"
  ).addTo(map);

  // 在路径上添加动画
  var buildPathAnimation = function(route, options) {
    let animation = [];
    let prevStops = [];

    // 遍历每个站点
    for (let stopIdx = 0; stopIdx < route.length - 1; stopIdx++) {
      let stop = route[stopIdx];
      let nextStop = route[stopIdx + 1];
      prevStops.push([stop.latitude, stop.longitude]);

      // 遍历每段的耗时
      for (let minutes = 0; minutes < stop.duration; minutes++) {
        let position = [
          stop.latitude + (nextStop.latitude - stop.latitude) * (minutes / stop.duration),
          stop.longitude + (nextStop.longitude - stop.longitude) * (minutes / stop.duration)
        ];
        animation.push(L.polyline(prevStops.concat([position]), options));
      } 
    }
    return animation;
  };

  // 在标签上设置动画
  var buildLabelAnimation = function() {
    let args = Array.prototype.slice.call(arguments),
        labels = [];
    
    // 遍历每条路径
    args.forEach(function(route) {
      let minutes = 0;

      // 遍历每个站点
      route.forEach(function(stop, idx) {

        // 检查是否是第一个或最后一个
        if (idx !== 0 && idx < route.length - 1) {
          var label = new L.Label(
            [
              stop.latitude,
              stop.longitude
            ],
            stop.stop,
            { offset: new L.Point(stop.offset[0], stop.offset[1]) }
          );
          map.addLayer(label);

          // 到达站点
          labels.push({ minutes: minutes, label: label, status: "shown" });

          // 50min后
          labels.push({ minutes: minutes + 50, label: label, status: "dimmed" });
        }
      minutes += stop.duration;
      });
    });
    
    labels.sort(function(a,b) {
      return a.minutes - b.minutes;
    });

    return labels;
  }

  // 设置开始和终点标签
  var start = seaboard[0];
  var label = new L.Label(
      [
        start.latitude,
        start.longitude
      ],
      start.stop,
      { offset: new L.Point(start.offset[0], start.offset[1]) }
  );
  map.addLayer(label);
  label.setStatus('shown');
  var finish = seaboard[seaboard.length-1];
  label = new L.Label(
      [
        finish.latitude,
        finish.longitude
      ],
      finish.stop,
      { offset: new L.Point(finish.offset[0], finish.offset[1]) }
  );
  map.addLayer(label);
  label.setStatus('shown');

  var labels = buildLabelAnimation(seaboard, southern);
  var labelAnimation = labels.slice(0);

  var routeAnimations = [
    buildPathAnimation(seaboard, { clickable: false, color: "#88020B", weight: 8, opacity: 1.0 }),
    buildPathAnimation(southern, { clickable: false, color: "#106634", weight: 8, opacity: 1.0 })
  ];

  // 计算动画创建的最大步骤，为两个动画数组的最小长度
  var maxPathSteps = Math.min.apply(null, routeAnimations.map(function(animation) {
    return animation.length;
  }));
  
  var maxLabelSteps = labels[labels.length - 1].minutes;

  var maxSteps = Math.max(maxPathSteps, maxLabelSteps);

  // 使用step监听当前状态
  var step = 0;

  // 处理动画过程中的每个步骤
  var animateStep = function() {

    // 判断是否是第一步，如果不是，把之前的路线删除
    if (step > 0 && step < maxPathSteps) {
      routeAnimations.forEach(function(animation) {
        map.removeLayer(animation[step - 1]);
      });
    }

    // 重播，检查动画是否已结束
    if (step === maxPathSteps) {
      routeAnimations.forEach(function(animation) {
        map.removeLayer(animation[maxPathSteps - 1]);
      });
      step = 0;
      labelAnimation = labels.slice(0);
      labelAnimation.forEach(function(label) {
        label.label.setStatus('hidden');
      })
    }

    while (labelAnimation.length && step === labelAnimation[0].minutes) {
      var label = labelAnimation[0].label;
      if (label.getStatus() === "shown" || step < maxPathSteps) {
        label.setStatus(labelAnimation[0].status);
      }
      labelAnimation.shift();
    }

    // 将当前动画步骤的线段添加进地图中
    if (step < maxPathSteps) {
      routeAnimations.forEach(function(animation) {
        map.addLayer(animation[step]);
      });
    }

    return ++step === maxPathSteps;
  }

  var interval = null;

  // 动画开始
  var animate = function() {
    interval = window.setInterval(function() {
      
      // 判断动画是否结束
      if (animateStep()) {
        window.clearInterval(interval);
        control.reset();
      }
    }, 30);
  }

  // 动画暂停
  var pause = function() {
    window.clearInterval(interval);
  };

  // 将控制器添加到地图
  var control = L.control.animate({
    animateStartFn: animate,
    animateStopFn: pause
  });
  control.addTo(map);

}