<!-- script template style之間的順序 沒有固定可以隨意調動 -->
<template>
  <!-- <HeaderComponent /> -->
  <router-view :items="items" />
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      items: [],
    };
  },
  async mounted() {
    await this.GetAllItem();
  },
  methods: {
    async GetAllItem() {
      console.log("GetAllItem");
      try {
        const response = await axios.get(
          "http://localhost:3000/api/getallitem"
        );
        this.items = response.data.items;
        console.log("取得所有物品成功");
      } catch (error) {
        alert("取得所有物品失敗", error);
      }
    },
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
