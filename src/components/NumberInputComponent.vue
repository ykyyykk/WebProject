<template>
  <div class="input-group mb-3 w-50">
    <button
      class="input-group-text btn btn-outline-secondary"
      @click="Decrease()"
    >
      -
    </button>
    <input
      type="text"
      class="form-control text-center border border-secondary"
      :value="amount || 1"
      :max="max"
      placeholder="數量"
      @input="UpdateAmount"
    />
    <button
      class="input-group-text btn btn-outline-primary"
      @click="Increase()"
    >
      +
    </button>
  </div>
</template>

<script>
export default {
  // 沒用還是不會更改
  props: {
    amount: { type: Number, default: 1 },
    max: Number,
  },
  methods: {
    Increase() {
      if (this.amount < this.max) {
        this.$emit("update:amount", this.amount + 1);
      }
    },
    Decrease() {
      if (this.amount > 1) {
        this.$emit("update:amount", this.amount - 1);
      }
    },
    UpdateAmount(event) {
      console.log(event);
      let newValue = Number(event.target.value);
      if (isNaN(newValue) || newValue < 1) {
        newValue = 1;
      } else if (newValue > this.max) {
        newValue = this.max;
      }
      this.$emit("update:amount", newValue);
    },
  },
};
</script>
