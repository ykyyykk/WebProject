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
      :value="amount"
      :max="max"
      placeholder="數量"
    />
    <!-- @input="updateAmount($event)" -->
    <!-- v-model="amount" -->
    <!-- value="1" -->
    <button class="input-group-text btn btn-outline-primary" @click="increase">
      +
    </button>
  </div>
</template>

<script>
export default {
  // 沒用還是不會更改
  props: {
    value: Number,
    max: Number,
  },
  data() {
    return {
      amount: this.value || 1,
    };
  },
  // 沒用還是不會更改
  // watch: {
  //   value(newValue) {
  //     this.amount = newValue; // Watch prop changes to update local data
  //   },
  // },
  methods: {
    increase() {
      if (this.amount < this.max) {
        this.amount++;
      }
      console.log("file: inputIncrease.js:11  increase  amount: ", this.amount);

      // 沒用還是不會更改
      //通知父物件 這個數值改變了 這樣在加入購物車時數值才是正確的
      // this.$emit("amount", this.amount);
    },
    decrease() {
      if (this.amount > 1) {
        this.amount--;
      }
      console.log("file: inputIncrease.js:15  decrease  amount: ", this.amount);

      // 沒用還是不會更改
      // this.$emit("amount", this.amount);
    },

    // 沒用還是不會更改
    // updateAmount(event) {
    //   const newValue = Number(event.target.value);
    //   if (newValue <= this.max && newValue >= 1) {
    //     this.amount = newValue;
    //     this.$emit("input", this.amount); // Emit updated amount
    //   }
    // },
  },
};
</script>
