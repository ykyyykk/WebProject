<template>
  <div class="container d-block mt-5 p-3 border border-black">
    <!-- <div class="border border-black">
      <h1>本日營收</h1>
    </div> -->
    <div class="border border-black">
      <h1>本周營收</h1>
      <!-- <div id="weekChart" class="w-100" style="height: 400px"></div> -->
      <LineChart ref="weekChart" :xData="this.weekX" :yData="this.weekY" />
    </div>
    <div class="border border-black mt-5">
      <h1>本月營收</h1>
      <LineChart ref="monthChart" :xData="this.monthX" :yData="this.monthY" />
    </div>
    <!-- <div class="border border-black">
      <h1>本年營收</h1>
    </div> -->
  </div>
</template>

<script>
import LineChart from "../components/LineChart.vue";
import axios from "axios";
import { API_BASE_URL } from "../config/api";

export default {
  components: { LineChart },
  data() {
    return {
      revenues: null,
      weekChart: {},
      weekX: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      weekY: [1, 2, 3, 4, 5, 6, 7],
      monthX: [],
      monthY: [],
    };
  },
  async beforeMount() {
    await this.GetAllRevenue();
  },
  methods: {
    async GetAllRevenue() {
      const response = await axios.get(`${API_BASE_URL}/api/getallrevenue`);

      if (!response.data.success) {
        return;
      }
      this.revenues = response.data.revenues;
      this.Order();
    },
    Order() {
      // console.log(this.revenues);
      // 使用Map暫存日期 累加value
      const revenueMap = new Map();

      this.revenues.forEach((item) => {
        const dateSplit = item.date.split("-");
        const day = dateSplit[2].slice(0, 2); // 取得日期天數
        const value = item.value;

        // 如果已經有這個日期 累加value 否則設定為初始值
        if (revenueMap.has(day)) {
          revenueMap.set(day, revenueMap.get(day) + value);
        } else {
          revenueMap.set(day, value);
        }
      });

      // 將結果轉成Array
      this.monthX = Array.from(revenueMap.keys()); // 日期
      this.monthY = Array.from(revenueMap.values()); // 累加後的value
      // console.log(this.monthX);
      // console.log(this.monthY);
    },
  },
};
</script>
