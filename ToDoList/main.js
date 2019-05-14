(function() {

  let addItems = document.querySelector('.add-items');
  
  // ToDoList列表 
  let itemsList = document.querySelector('.plates');
  
  let buttons = document.querySelector('.buttons');
  
  // 获取本地缓存到的所有item，将一个对象字符串转换为对象
  let items = [];

  // 添加item
  function handleSubmit(e) {
    // 阻止默认事件的触发，防止在提交后页面自己刷新
    e.preventDefault();
    
    let name = this.querySelector('[name = item]').value;
    let item = {
      name: name,
      done: false
    };
    items.push(item);
    localStorage.setItem('items', JSON.stringify(items));
    updateList(items, itemsList);
    this.reset();
  }

  // 更新ToDo列表
  function updateList(plates, plateList) {
    plateList.innerHTML = plates.map((plate, i) => {
      let checked = plate.done ? 'checked' : '';
      return `<li>
                <input type="checkbox" data-index="${ i }" id="plate${ i }" ${ checked }/>
                <label for="plate${ i }">${ plate.name }</label>
              </li>`;
    }).join('');
  }

  // 选中单项
  function toggleChecked(e) {
    if (!e.target.matches('input')) return;
    let itemIndex = e.target.dataset.index;
    items[itemIndex].done = !items[itemIndex].done;
    localStorage.setItem('items', JSON.stringify(items));
    updateList(items, itemsList);
  }

  // 添加button事件
  function doButtonPress(e) {
    var action = e.target.dataset.action;
    switch(action) {
      case 'clear':
        items = [];
        break;
      case 'check':
        items.map(item => (item.done = true));
        break;
      case 'uncheck':
        items.map(item => (item.done = false));
        break;
      default:
        return;
    }
    localStorage.setItem('items', JSON.stringify(items));
    updateList(items, itemsList);
  }

  addItems.addEventListener('submit',handleSubmit);
  itemsList.addEventListener('click', toggleChecked);
  buttons.addEventListener('click', doButtonPress);

  updateList(items, itemsList);
})();