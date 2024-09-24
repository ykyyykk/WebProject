<template>
  <div class="container d-block my-5 p-3 shadow">
    <div class="shadow p-3">
      <h1>本周營收</h1>
      <LineChart :xData="this.weekX" :yData="this.weekY" />
    </div>
    <div class="shadow mt-5">
      <h1>本月營收</h1>
      <LineChart :xData="this.monthX" :yData="this.monthY" />
    </div>
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
      weekX: [],
      weekY: [],
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
      // console.log(this.revenues[0].date); // 2024-08-31T16:00:00.000Z
      // const date = new Date("2024/9/8"); //成功轉換
      // const date = new Date(this.revenues[0].date); //成功轉換
      // console.log(date); // Sun Sep 08 2024 00:00:00 GMT+0800 (台北標準時間)
      // console.log(date.getDay()); // 0 ~ 6 0是星期日
      // console.log(date.getDate()); // 1 ~ 31 日期
      this.MonthOrder();
      this.WeekOrder();
    },
    MonthOrder() {
      // 使用Map暫存日期 累加value
      const monthRevenue = new Map();

      this.revenues.forEach((item) => {
        const date = new Date(item.date);
        const day = date.getDate();
        const value = item.value;

        // 如果已經有這個日期 累加value 否則設定為初始值
        if (monthRevenue.has(day)) {
          monthRevenue.set(day, monthRevenue.get(day) + value);
        } else {
          monthRevenue.set(day, value);
        }
      });

      // 將結果轉成Array
      this.monthX = Array.from(monthRevenue.keys()); // 日期
      this.monthY = Array.from(monthRevenue.values()); // 累加後的value
    },
    WeekOrder() {
      const weekRevenue = new Map();
      const currentDate = new Date(); // 今天日期 Tue Sep 24 2024 13:01:20 GMT+0800 (台北標準時間)

      // console.log(currentDate.getDate() - 7); // 17 = 24 - 7
      this.revenues.forEach((item) => {
        const date = new Date(item.date).getDate();

        //取得七天前資料 因為現在有未來的資料 所以不讀取未來資料
        if (date < currentDate.getDate() - 7 || date > currentDate.getDate()) {
          // 白癡Js 在foreach return == continue;
          return;
        }

        const value = item.value;

        if (weekRevenue.has(date)) {
          weekRevenue.set(date, weekRevenue.get(date) + value);
        } else {
          weekRevenue.set(date, value);
        }
      });

      this.weekX = Array.from(weekRevenue.keys());
      this.weekY = Array.from(weekRevenue.values());
      // console.log(this.weekX);
      // console.log(this.weekY);
    },
  },
};
</script>
