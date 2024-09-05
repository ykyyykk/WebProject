<!-- script template style之間的順序 沒有固定可以隨意調動 -->
<template>
  <!-- 不要嘗試在這邊 :items="items" 改用vuex的getter 或 computed 來抓items -->
  <router-view />
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      items: [],
    };
  },
};
</script>

<style>
/* 全域讓預設ScorllBar 瘦一點好看點 */
html {
  scrollbar-width: thin;
  scrollbar-color: #888 #f1f1f1;
}

body::-webkit-scrollbar {
  width: 12px;
}

body::-webkit-scrollbar-track {
  background: #f1f1f1;
}

body::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 10px;
  border: 3px solid #f1f1f1;
}

body::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
