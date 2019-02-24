(function() {
    var datepicker = window.datepicker;

    var monthData, $wrapper;

    datepicker.buildUI = function(year, month) {
        // 获取一个月的数据
        monthData = datepicker.getMonthDate(year, month);
        var html = '<div class="ui-datepicker-header">' + 
            '<a href="#" class="ui-datepicker-btn ui-datepicker-prev-btn">&lt;</a>' + 
            '<a href="#" class="ui-datepicker-btn ui-datepicker-next-btn">&gt;</a>' + 
            '<span class="ui-datepicker-curr-month">' + monthData.year + '-' + 
                monthData.month + '</span>' + 
        '</div>' + 
        '<div class="ui-datepicker-body">' + 
            '<table>' + 
                '<thead>' + 
                    '<tr>' + 
                        '<th>一</th>' + 
                        '<th>二</th>' + 
                        '<th>三</th>' + 
                        '<th>四</th>' + 
                        '<th>五</th>' + 
                        '<th>六</th>' + 
                        '<th>日</th>' + 
                    '</tr>' + 
                '</thead>' + 
                '<tbody>';
        for (var i = 0; i < monthData.days.length; i++) {
            var date = monthData.days[i];
            if (i % 7 === 0) {
                html += '<tr>';
            }
            html += '<td data-date="' + date.date + '">' + date.showDate + '</td>'
            if (i % 7 === 6) {
                html += '</tr>';
            }
        }
        html += '</tbody>' + '</table>' + '</div>';
        return html;
    }

    // 日历渲染
    datepicker.render = function(direction) {
        var year, month;
        if (monthData) {
            year = monthData.year;
            month = monthData.month;
        }

        if (direction === 'prev') {
            month--;
        }
        if (direction === 'next') {
            month++;
        }

        var html = datepicker.buildUI(year, month);

        $wrapper = document.querySelector('.ui-datepicker-wrapper');

        if (!$wrapper) {
            $wrapper = document.createElement('div');
            $wrapper.className = 'ui-datepicker-wrapper';
        }

        $wrapper.innerHTML = html;
        document.body.appendChild($wrapper);
    }

    // 初始化函数
    datepicker.init = function(input) {
        datepicker.render();
        
        // 控制显示和隐藏
        var $input = document.querySelector(input);
        var isOpen = false;
        $input.addEventListener('click', function() {
            if (isOpen) {
                $wrapper.classList.remove('ui-datepicker-wrapper-show');
                isOpen = false;
            } else {
                $wrapper.classList.add('ui-datepicker-wrapper-show');
                // 获取输入框位置设置日历位置
                var left = $input.offsetTop;
                var top = $input.offsetTop;
                var height = $input.offsetHeight;

                $wrapper.style.top = top + height + 2 + 'px';
                $wrapper.style.left = left + 'px';

                isOpen = true;
            }
        }, false);

        // 给按钮添加事件
        $wrapper.addEventListener('click', function(e) {
            var $target = e.target;
            
            if (!$target.classList.contains('ui-datepicker-btn')) {
                return false;
            }

            // 上月
            if ($target.classList.contains('ui-datepicker-prev-btn')) {
                datepicker.render('prev');
            }
            // 下月
            if ($target.classList.contains('ui-datepicker-next-btn')) {
                datepicker.render('next');
            }
        }, false);

        $wrapper.addEventListener('click', function(e) {
            var $target = e.target;

            if ($target.tagName.toLocaleLowerCase() !== 'td') {
                return false;
            }

            var date = new Date(monthData.year, monthData.month - 1, $target.dataset.date);

            $input.value = format(date);

            $wrapper.classList.remove('ui-datepicker-wrapper-show');
            isOpen = false;
        }, false);
    };

    // 格式化数据
    function format(date) {
        var ret = '';

        var padding = function(num) {
            if (num <= 9) {
                return '0' + num;
            }
            return num;
        };

        ret += date.getFullYear() + '-';
        ret += padding(date.getMonth() + 1) + '-';
        ret += padding(date.getDate());

        return ret;
    }
})();