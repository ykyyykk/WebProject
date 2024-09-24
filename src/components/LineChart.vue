<template>
  <div ref="lineChart"></div>
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
  mounted() {
    this.initEcharts();
  },
  methods: {
    initEcharts() {
      const option = {
        tooltip: {
          trigger: "item",
        },
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
        this.lineChart = echarts.init(this.$refs.lineChart);
      }
      this.lineChart.setOption(option);
      window.addEventListener("resize", () => {
        this.lineChart.resize();
      });
    },
  },
};
</script>
