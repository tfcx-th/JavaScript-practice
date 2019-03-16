var num = 0, result = 0, numShow = '0';

// 判断输入状态，非操作符为true，操作符为false
var operate = true;

// 判断操作符
// 1+，2-，3*，4/，5%
var calcu = 0;

// 防止重复按键，按过操作符后设置为true
var quit = false;

// 获取显示的数字并转换为字符
function getScreenNum() {
  var str = document.getElementById('calculator').getElementsByClassName('screen')[0].value;
  return String(str);
}

// 将数字字符显示在屏幕上
function putScreenNum(str) {
  document.getElementById('calculator').getElementsByClassName('screen')[0].value = str;
}

// 按下数字键的响应
function command(num) {
  var str = getScreenNum();
  // 判断首位是否为零
  if (str !== '0') {
    // 判断输入是否为数字  
    if (operate === false) {
      str = '';
    }  
  } else {
    str = '';
  }
  str = str + String(num);
  putScreenNum(str);
  operate = true;
  quit = false;
}

// 末尾加00
function doubleZero() {
  var str = getScreenNum();
  // 判断首位是否为零
  if (str !== '0') {
    // 判断输入是否为数字  
    if (operate === true) {
      str = str + '00';
    } else {
      str = '0';
    }
  } else {
    str = '0';
  }
  putScreenNum(str);
  operate = true;
}

// 添加小数点
function dot() {
  var str = getScreenNum();
  if (operate !== true) {
    str = 0;
  }
  for (var i = 0; i <= str.length; i++) {
    if (str.substr(i, 1) === '.')
      return false;
  }
  str = str + '.';
  putScreenNum(str);
  operate = true;
}

// 退格
function del() {
  var str = getScreenNum();
  if (str.length === 1) {
    str = '0';
  } else {
    str = str.substr(0, str.length - 1);
  }
  putScreenNum(str);
  operate = true;
}

// 清除数据
function clearScreen() {
  num = 0;
  result = 0;
  numShow = '0';
  putScreenNum('0');
}

// 加法
function plus() {
  calcu = 1;
  calculate();
  operate = false;
}

// 减法
function minus() {
  calcu = 2;
  calculate();
  operate = false;
}

// 乘法
function times() {
  calcu = 3;
  calculate();
  operate = false;
}

// 除法
function divide() {
  calcu = 4;
  calculate();
  operate = false;
}

// 求余
function persent() {
  calcu = 5;
  calculate();
  operate = false;
}

function equal(){
  calculate(); //等于
  operate = false;
  num = 0;
  result = 0;
}

// 计算
function calculate() {
  numShow = parseFloat(getScreenNum());
  if (num !== 0 && quit === false) {
    switch(calcu) {
      case 1: 
        result = num + numShow;
        break;
      case 2: 
        result = num - numShow;
        break;
      case 3: 
        result = num * numShow;
        break;
      case 4:
        if (numShow !== 0) {
          result = num / numShow;
        } else {
          document.getElementById('note').innerHTML = '被除数不能为0'
        }
        break;
      case 5: 
        result = num % numShow;
        break;
    }
    quit = true;
  } else {
    result = numShow;
  }
  putScreenNum(result.toString());
  num = result;
  console.log(result);
}