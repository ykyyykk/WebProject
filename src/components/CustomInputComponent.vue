<template>
  <div id="cool_input">
    <input
      :type="type"
      :value="modelValue"
      @input="onInput"
      @blur="onBlur"
      @keyup.enter="onEnter"
      required
      spellcheck="false"
    />
    <label>{{ placeholder }}</label>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: { type: String, required: true }, // 綁定 v-model 的值
    placeholder: { type: String, required: true },
    type: { type: String, default: "text" },
  },
  emits: ["update:modelValue", "enter"], // 使用 v-model 需要 emit 更新
  methods: {
    onInput(event) {
      this.$emit("update:modelValue", event.target.value); // 傳回輸入的值
      this.$emit("input"); // 若要觸發 @input 事件
    },
    onBlur(event) {
      this.$emit("update:modelValue", event.target.value); // 傳回輸入的值
      this.$emit("blur"); // 若要觸發 @blur 事件
    },
    onEnter() {
      this.$emit("enter"); // 觸發 enter 事件
    },
  },
};
</script>

<style scoped>
#cool_input {
  position: relative;
  width: 100%;
}

#cool_input input {
  width: 100%;
  height: 2.5rem;
  border-radius: 6px;
  font-size: 18px;
  padding: 0px 15px;
  border: 2px #1cd679 solid;
  background-color: white;
  /* onClick的時候不會有預設藍色的outline */
  outline: none;
  color: black;
}

#cool_input label {
  position: absolute;
  top: 50%;
  left: 15px;
  transform: translateY(-50%);
  color: black;
  font-size: 19px;
  pointer-events: none;
  transition: 0.3s;
}

/* 有點像if eles if(input is focus) label執行以下動作 if(input is valid) label則回復 */
#cool_input input:focus ~ label,
#cool_input input:valid ~ label {
  top: 0px;
  font-size: 16px;
  padding: 0px 10px;
  /* 這裡要用background一樣的顏色 不能用transparent 會蓋不住border */
  background-color: white;
}
</style>
