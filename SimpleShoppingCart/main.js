var app = new Vue({
  el: '#app',
  data: {
    allChecked: false,
    title: '全选',
    list: 
      [
        [
          {
            id: '电子产品',
            checked: false,
            name: 'iPhone XR',
            price: 6499,
            count: 1
          },
          {
            id: '电子产品',
            checked: false,
            name: 'iPad Air',
            price: 3999,
            count: 1
          },
          {
            id: '电子产品',
            checked: false,
            name: 'Mackbook Pro',
            price: 15788,
            count: 1
          }
        ],
        [
          {
            id: '水果',
            checked: false,
            name: 'apple',
            price: 5,
            count: 1
          },
          {
            id: '水果',
            checked: false,
            name: 'banana',
            price: 3,
            count: 1
          },
          {
            id: '水果',
            checked: false,
            name: 'orange',
            price: 15,
            count: 1
          }
        ]
      ]
  },

  computed: {
    totalPrice: function() {
      var total = 0;
      for (var i = 0; i < this.list.length; i++) {
        for (var j = 0; j < this.list[i].length; j++) {
          var item = this.list[i][j];
          if (item.checked === true) {
            total += item.price * item.count;
          } 
        }
      }
      return total.toString().replace(/\B(?=(\d{3})+$)/g, ',');
    }
  },

  methods: {
    handleReduce: function(index, _index) {
      if (this.list[index][_index].count === 1)
        return;
      this.list[index][_index].count--;
    },

    handleAdd: function(index, _index) {
      this.list[index][_index].count++;
    },

    handleRemove: function(index, _index) {
      this.list[index].splice(_index, 1);
    },

    handleCheckbox: function(index, _index) {
      if (this.list[index][_index].checked === false) {
        this.list[index][_index].checked = true;
      } else {
        this.list[index][_index].checked = false;
      }
    },

    handleCheckAll: function() {
      if (!this.allChecked) {
        for (var i = 0; i < this.list.length; i++) {
          for (var j = 0; j < this.list[i].length; j++) {
            this.list[i][j].checked = true;
          }
        }
        this.allChecked = true;
        this.title = '全不选';
      } else {
        for (var i = 0; i < this.list.length; i++) {
          for (var j = 0; j < this.list[i].length; j++) {
            this.list[i][j].checked = false;
          }
        }
        this.allChecked = false;
        this.title = '全选';
      }
    }
  }
})