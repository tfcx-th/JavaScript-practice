var app = new Vue({
  el: '#app',
  data: {
    list: [
      {
        id: 1,
        name: 'iPhone XR',
        price: 6499,
        count: 1
      },
      {
        id: 2,
        name: 'iPad Air',
        price: 3999,
        count: 1
      },
      {
        id: 3,
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
          total += item.price * item.count;
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
      }
  }
})