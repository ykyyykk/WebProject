<template>
  <div ref="pieChart"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  props: {
    data: { type: Object, required: true },
  },
  data() {
    return {
      pieChart: undefined,
    };
  },
  mounted() {
    this.initEcharts();
  },
  watch: {
    // 因為LineChart比RevenueChart還快 所以這樣做
    data(newVal) {
      if (newVal.length) {
        this.initEcharts();
      }
    },
  },
  methods: {
    initEcharts() {
      const option = {
        tooltip: {
          trigger: "item",
        },
        //   上方的類別顯示
        legend: {
          top: "5%",
          left: "center",
        },
        series: [
          {
            type: "pie",
            // 第一個參數室內圈大小 第二個參數是外圈大小
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            //原本有一個padAngle 是間隔 但好像被bootstarp覆蓋掉了
            itemStyle: {
              // 設定邊框寬度模擬間隔
              borderWidth: 1,
              borderColor: "black",
            },
            label: {
              //常駐顯示 只會顯示第一個
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                // label動畫最後顯示的大小
                fontSize: 20,
                // label字形
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: this.data,
          },
        ],
      };

      if (!this.pieChart) {
        // Vue推薦用$refs取代document.getElementById
        this.pieChart = echarts.init(this.$refs.pieChart);
      }
      this.pieChart.setOption(option);
      window.addEventListener("resize", () => {
        this.pieChart.resize();
      });
    },
  },
};
</script>
