(function() {
    var datepicker = {};
    datepicker.getMonthDate = function(year, month) {
        var ret = [];
        if (!year || !month) {
            var today = new Date();
            year = today.getFullYear();
            month = today.getMonth() + 1;
        }

        // 获取当月第一天 new Date(year, month - 1, 1)
        var firstDay = new Date(year, month - 1, 1);
        // 获取星期几，判断是否为周日
        var firstDayWeekDay = firstDay.getDay();
        if (firstDayWeekDay === 0) {
            firstDayWeekDay = 7;
        }

        year = firstDay.getFullYear();
        month = firstDay.getMonth() + 1;

        // 获取上月最后一天 new Date(year, month - 1, 0)
        var lastDayOfLastMonth = new Date(year, month - 1, 0);
        var lastDateOfLastMonth = lastDayOfLastMonth.getDate();

        // 本月1号前空缺几天
        var preMonthDayCount = firstDayWeekDay - 1;
        var lastDay = new Date(year, month, 0);
        var lastDate = lastDay.getDate();

        // 日历每月最多7 * 6个格子
        for (var i = 0; i < 7 * 6; i++) {
            // 判断是上月，本月还是下个月
            var date = i + 1 - preMonthDayCount;
            var showDate = date;
            var thisMonth = month;

            if (date <= 0) {    // 上月
                thisMonth = month - 1;
                showDate = lastDateOfLastMonth + date;
            } else if (date > lastDate) {   // 下月
                thisMonth = month + 1;
                showDate = showDate - lastDate;
            }

            // 判断月份是否在1-12
            if (thisMonth === 0) {
                thisMonth = 12;    // 1月前一月
            }
            if (thisMonth === 13) {
                thisMonth = 1;
            }

            ret.push({
                month: thisMonth,
                date: date,
                showDate: showDate
            });
        }
        return {
            year: year,
            month: month,
            days: ret
        };
    }
    window.datepicker = datepicker;
})();