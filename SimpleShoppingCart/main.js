var app = new Vue({
  el: '#app',
  data: {
    allChecked: false,
    title: '全选',
    list: [
      {
        id: 1,
        checked: false,
        name: 'iPhone XR',
        price: 6499,
        count: 1
      },
      {
        id: 2,
        checked: false,
        name: 'iPad Air',
        price: 3999,
        count: 1
      },
      {
        id: 3,
        checked: false,
        name: 'Mackbook Pro',
        price: 15788,
        count: 1
      }
    ]
  },

  computed: {
    totalPrice: function() {
      var total = 0;
      for (var i = 0; i < this.list.length; i++) {
        var item = this.list[i];
        if (item.checked === true) {
          total += item.price * item.count;
        } 
      }
      return total.toString().replace(/\B(?=(\d{3})+$)/g, ',');
    }
  },

  methods: {
    handleReduce: function(index) {
      if (this.list[index].count === 1)
        return;
      this.list[index].count--;
    },

    handleAdd: function(index) {
      this.list[index].count++;
    },

    handleRemove: function(index) {
      this.list.splice(index, 1);
    },

    handleCheckbox: function(index) {
      if (this.list[index].checked === false) {
        this.list[index].checked = true;
      } else {
        this.list[index].checked = false;
      }
    },

    handleCheckAll: function() {
      if (!this.allChecked) {
        for (var i = 0; i < this.list.length; i++) {
          this.list[i].checked = true;
        }
        this.allChecked = true;
        this.title = '全不选';
      } else {
        for (var i = 0; i < this.list.length; i++) {
          this.list[i].checked = false;
        }
        this.allChecked = false;
        this.title = '全选';
      }
    }
  }
})