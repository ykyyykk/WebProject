<template>
  <div class="input-group mb-3 w-50">
    <button
      class="input-group-text btn btn-outline-secondary"
      @click="decrease"
    >
      -
    </button>
    <input
      type="number"
      class="form-control text-center border border-secondary"
      v-model="amount"
      placeholder="數量"
      value="1"
    />
    <button class="input-group-text btn btn-outline-primary" @click="increase">
      +
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lastAmount: 5,
      amount: 1,
    };
  },
  methods: {
    increase() {
      if (this.amount < this.lastAmount) {
        this.amount++;
      }
      console.log("file: inputIncrease.js:11  increase  amount: ", this.amount);
    },
    decrease() {
      if (this.amount > 1) {
        this.amount--;
      }
      console.log("file: inputIncrease.js:15  decrease  amount: ", this.amount);
    },
  },
};
</script>
