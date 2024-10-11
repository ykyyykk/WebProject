<template>
  <div class="d-flex justify-content-center shadow-sm mt-3 p-3">
    <div
      class="d-flex justify-content-between col-sm-10 col-12 overflow-x-auto gap-3"
    >
      <div v-for="job in jobs" :key="job">
        <!-- 在這裡可以放置捲動區域的內容 -->
        <div class="d-block">
          <div class="text-nowrap">公司名稱：{{ job.company }}</div>
          <div class="text-nowrap">職位：{{ job.position }}</div>
          <div class="text-nowrap">年資：{{ job.duration }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      jobs: [
        {
          company: "宏國室內裝修",
          position: "學徒",
          duration: "2017/8~2020/6 2年11個月",
        },
        {
          company: "曉兔科技",
          position: "前端遊戲程式設計",
          duration: "2021/1~2021/7 7個月",
        },
        {
          company: "奧奇盟科技",
          position: "全端遊戲程式設計",
          duration: "2021/8~2021/9 2個月",
        },
        {
          company: "村宏室內裝修",
          position: "師傅",
          duration: "2022/9~2023/10 1年2個月",
        },
      ],
    };
  },
};
</script>
