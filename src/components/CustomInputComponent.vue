<template>
  <div id="cool_input">
    <input type="text" required spellcheck="false" />
    <!-- 不知道怎麼用props動態調整 -->
    <label>label</label>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: { type: String, required: true },
  },
};
</script>

<style scoped>
#cool_input {
  position: relative;
}

#cool_input input {
  height: 2.5rem;
  border-radius: 6px;
  font-size: 18px;
  padding: 0px 15px;
  border: 2px #1cd679 solid;
  background-color: transparent;
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
  /* 這裡要用background一樣的顏色 不能用transparent 會蓋不住border*/
  background-color: white;
}
</style>
