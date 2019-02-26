"use strict";

// 从input中读取数据，计算贷款赔付信息，并显示在span中
// 保存用户数据，展示放贷人链接并绘制图表
function calculate() {
    var amount = document.getElementById("amount");
    var apr = document.getElementById("apr");
    var years = document.getElementById("years");
    var zipcode = document.getElementById("zipcode");
    var payment = document.getElementById("payment");
    var total = document.getElementById("total");
    var totalinterest = document.getElementById("totalinterest");

    // 假设输入合法，从input元素中获取输入数据
    // 将百分比转化为小数，年利率转换为月利率，年度赔付转换为月度赔付
    var principal = parseFloat(amount.value);    // 贷款总额
    var interest = parseFloat(apr.value) / 100 / 12;    // 月利率
    var paymentsMonths = parseFloat(years.value) * 12;    // 偿还月数

    // 计算每月支付的数据，等额本息法
    var x = Math.pow(1 + interest, paymentsMonths);
    var monthly = (principal * x * interest) / (x - 1);

    // 假设输入未超过范围限制
    if (isFinite(monthly)) {
        // 将数据填充到输出位置，小数点后取两位
        payment.innerHTML = monthly.toFixed(2);    // 每月支付总额
        total.innerHTML = (monthly * paymentsMonths).toFixed(2);    // 支付总额
        totalinterest.innerHTML = ((monthly * paymentsMonths) - principal).toFixed(2);    // 支付总利息

        // 保存用户输入的数据
        save(amount.value, apr.value, years.value, zipcode.value);

        // 找到并显示本地放贷人，忽略网络错误
        try {
            getLenders(amount.value, apr.value, years.value, zipcode.value);
        } catch(e) {}

        // 用图展示贷款余额、利息和资产收益
        chart(principal, interest, monthly, paymentsMonths);
    } else {
        // 输入数据超过范围时清空之前输入
        payment.innerHTML = "";
        total.innerHTML = "";
        totalinterest.innerHTML = "";
        chart();
    } 
}

// 将用户输入保存至localStorage对象的属性中
// 这些属性再次访问时还会保持在原位置
// 如果在浏览器中按照file://URL 的方式直接打开本地文件，则无法在某些浏览器中使用存储功能
// 通过HTTP打开文件是可行的
function save(amount, apr, years, zipcode) {
    // 只有在浏览器支持的时候才运行这里的代码
    if (window.localStorage) {
        localStorage.loan_amount = amount;
        localStorage.loan_apr = apr;
        localStorage.loan_years = years;
        localStorage.loan_zipcode = zipcode;
    }
}

// 在文档首次加载时，将会尝试还原输入字段
window.onload = function() {
    // 浏览器支持本地存储且上次保存的值是存在的
    if (window.localStorage && localStorage.loan_amount) {
        document.getElementById("amount").value = localStorage.loan_amount;
        document.getElementById("apr").value = localStorage.loan_apr;
        document.getElementById("years").value = localStorage.loan_years;
        document.getElementById("zipcode").value = localStorage.loan_zipcode;
    }
};

// 将用户的输入发送至服务器端脚本上将返回一个本地放贷人的链接列表
// 未实现
function getLenders(amount, apr, years, zipcode) {
    // 如果浏览器不支持XMLHttpRequest对象，则退出
    if (!window.XMLHttpRequest)
        return;
    
    // 找到要显示放贷人列表的元素
    var ad = document.getElementById("lenders");
    if (!ad)
        return;
    
    // 将用户的输入数据进行URL编码，并作为查询数据附加在URL里
    var url = "getLenders.php" + 
            "?amt=" + encodeURIComponent(amount) + 
            "&apr=" + encodeURIComponent(apr) + 
            "&yrs=" + encodeURIComponent(years) + 
            "&zip=" + encodeURIComponent(zipcode);

    // 通过XMLHttpRequest对象来提取返回数据
    var req = new XMLHttpRequest();    // 发起一个新的请求
    req.open("GET", url);    // 通过URL发起一个HTTP GET请求
    req.send(null);    // 不带任何正文发送这个请求

    // 返回数据之前，注册一个事件处理函数，在服务器的响应返回至客户端的时候调用
    // 异步编程模型
    req.onreadystatechange = function() {
        // 合法完整的HTTP响应
        if (req.readyState == 4 && req.status == 200) {
            // HTTP响应以字符串的形式呈现
            var response = req.responseText;
            var lenders = JSON.parse(response);

            // 将数组中的放贷人对象转换为HTML字符串形式
            var list = "";
            for (var i = 0; i < lenders.length; i++) {
                list += "<li><a href='" + lenders[i].url + "'>" + lenders[i].name + "</a>";
            }

            // 将数据在HTML中呈现出来
            ad.innerHTML = "<ul>" + list + "</ul>";
        }
    }
}

// 在HTML<canvas>元素中用图表展示月度贷款余额，利息，资产收益
// 不传入数据则清空之前的图表
function chart(principal, interest, monthly, paymentsMonths) {
    var graph = document.getElementById("graph");
    // 清除并重置画布
    graph.width = graph.width;

    // 如果不传入参数，或者浏览器不支持画布，则直接返回
    if (arguments.length == 0 || !graph.getContext)
        return;
    
    // 获得画布元素的context对象，所有绘画操作都将基于这个对象
    var g = graph.getContext("2d");
    var width = graph.width;
    var height = graph.height;

    // 将付款数字和美元数据转换为像素坐标
    function paymentToX(n) {
        return n * width / paymentsMonths;
    }
    function amountToY(a) {
        return height - (a * height / (monthly * paymentsMonths * 1.05));
    }

    // 付款数据是一条从(0, 0)到(payments, monthly*payments)的直线
    // 从左下方开始，绘至右上方，右下方
    g.moveTo(paymentToX(0), amountToY(0));
    g.lineTo(paymentToX(paymentsMonths), amountToY(monthly * paymentsMonths));
    g.lineTo(paymentToX(paymentsMonths), amountToY(0));
    // 将结尾连接至开头
    g.closePath();
    // 用亮红色填充矩形
    g.fillStyle = "#f88";
    g.fill();
    // 选择字体绘制图例
    g.font = "bold 12px sans-serif";
    g.fillText("Total Interest Payments", 20, 20);

    // 非线性的曲线
    var euqity = 0;
    // 从左下方绘制新图形
    g.beginPath();
    g.moveTo(paymentToX(0), amountToY(0));
    // 计算每一笔利息
    for (var p = 1; p <= paymentsMonths; p++) {
        var thisMonthInterest = (principal - euqity) * interest;
        euqity += (monthly - thisMonthInterest);
        g.lineTo(paymentToX(p), amountToY(euqity));        
    }
    g.lineTo(paymentToX(paymentsMonths), amountToY(0));
    g.closePath();
    g.fillStyle = "rgba(0, 155, 0, 0.4)";
    g.fill();
    g.fillText("Total Equity", 20, 35);

    // 计算余额，用黑色粗线条表示
    var bal = principal;
    g.beginPath();
    g.moveTo(paymentToX(0), amountToY(bal));
    for (var p = 1; p <= paymentsMonths; p++) {
        var thisMonthInterest = bal * interest;
        bal -= (monthly - thisMonthInterest);
        g.lineTo(paymentToX(p), amountToY(bal));        
    }
    g.lineWidth = 3;
    g.stroke();
    g.fillStyle = "black";
    g.fillText("Loan Balance", 20, 50);

    // 将年月标记在x轴
    g.textAlign = "center";
    var y = amountToY(0);
    // 遍历每年
    for (var year = 1; year * 12 <= paymentsMonths; year++) {
        var x = paymentToX(year * 12);
        g.fillRect(x - 0.5, y - 3, 1, 3);
        // x轴起始位置
        if (year == 1) {
            g.fillText("1", x, y - 5);
        }
        // 每五年标记一次
        if (year % 5 == 0 && year * 12 != paymentsMonths) {
            g.fillText(String(year), x, y - 5);
        }
    }

    // 将贷款相关数据标记在右边界
    g.textAlign = "right";
    g.textBaseline = "middle";
    var ticks = [monthly * paymentsMonths, principal];
    var rightEdge = paymentToX(paymentsMonths);
    for (var i = 0; i < ticks.length; i++) {
        var y = amountToY(ticks[i]);
        g.fillRect(rightEdge - 3, y - 0.5, 3, 1);
        g.fillText(String(ticks[i].toFixed(0)), rightEdge - 5, y);
    }
}