<template>
  <div ref="lineChart" class="w-100" style="height: 400px"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  props: {
    xData: { type: Array, required: true },
    yData: { type: Array, required: true },
  },
  data() {
    return {
      lineChart: undefined,
    };
  },
  mounted() {
    this.initEcharts();
  },
  watch: {
    // 因為LineChart比RevenueChart還快 所以這樣做
    xData(newVal) {
      if (newVal.length) {
        this.initEcharts();
      }
    },
    yData(newVal) {
      if (newVal.length) {
        this.initEcharts();
      }
    },
  },
  methods: {
    initEcharts() {
      const option = {
        xAxis: {
          data: this.xData,
        },
        yAxis: {},
        series: [
          {
            data: this.yData,
            type: "line", //類型為折線圖
          },
        ],
      };

      if (!this.lineChart) {
        // Vue推薦用$refs取代document.getElementById
        this.lineChart = echarts.init(this.$refs.lineChart); // 使用 $refs 获取元素
      }
      this.lineChart.setOption(option);
      window.addEventListener("resize", () => {
        this.lineChart.resize();
      });
    },
  },
};
</script>
