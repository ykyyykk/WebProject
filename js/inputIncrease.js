Vue.createApp({
  data() {
    return {
      amount: 1,
    };
  },
  methods: {
    increase() {
      this.amount++;
      console.log("file: inputIncrease.js:11  increase  amount: ", this.amount);
    },
    decrease() {
      if (this.amount > 1) {
        this.amount--;
      }
      console.log("file: inputIncrease.js:15  decrease  amount: ", this.amount);
    },
  },
}).mount("#app");
