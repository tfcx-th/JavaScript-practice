const url = 'https://gist.githubusercontent.com/liyuechun/f00bb31fb8f46ee0a283a4d182f691b4/raw/3ea4b427917048cdc596b38b67b5ed664605b76d/TangPoetry.json';
const poetrys = [];

// 通过fetch获取后台数据，并处理
fetch(url)
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject({
        status: response.status,
        statusText: response.statusText
      });
    }
  })
  .then(data => { poetrys.push(...data); })
  .catch(e => {
    console.log("status: ", e.status);
    console.log("statusText: ", e.statusText);
  });

var search = document.querySelector('.search');
var suggestions = document.querySelector('.suggestions');

// 输入框中文本改变
search.addEventListener('change', debounce(findMatches, 500));

// 按键结束触发，防抖
search.addEventListener('keyup', debounce(findMatches, 500));

// 防抖函数
function debounce(func, wait) {
  let timeout;
  return function () {
    let _this = this,
        args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(func.bind(_this, args), wait);
  }
}

// 关键字匹配
function findMatches() {
  if (this.value) {
    let regexp = new RegExp(this.value, 'gi');
    let matched = poetrys.filter(item => {
      return regexp.test(item.title) || regexp.test(item.detail_author) || regexp.test(item.detail_text);
    });

    if (matched.length > 0) {
      createDom(matched);
    } else {
      suggestions.innerHTML = '';
      suggestions.innerHTML = `<li>没有查找到匹配项</li>`;
    }
  } else {
    suggestions.innerHTML = `<li>输入诗人名字</li><li>输入关键字，找一首诗</li>`;
  }
}

// 将匹配到的显示
function createDom(matched) {

  // 用文本片段的形式进行一次性添加，减少回流重绘
  let frag = document.createDocumentFragment();

  matched.forEach(item => {
    let li = document.createElement('li'),
        p = document.createElement('p');
    let regexp = new RegExp(search.value, 'gi');

    // 将匹配到的关键字用带样式的形式替换
    let detailText   = item.detail_text.replace(regexp,`<span style="color:green">${search.value}</span>`),
        title        = item.title.replace(regexp,`<span style="color:green">${search.value}</span>`),
        detailAuthor = item.detail_author[0].replace(regexp,`<span style="color:green">${search.value}</span>`);
    li.innerHTML = detailText;
    p.innerHTML = title + "-" +detailAuthor;
    li.appendChild(p);
    frag.appendChild(li);
  });
  suggestions.innerHTML = '';
  suggestions.appendChild(frag);
}