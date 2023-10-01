"use client"
import React, { useEffect, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

const MouseSpeedChart = () => {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: "line",
      zoomType: "x",
    },
    title: {
      text: "Mouse Speed Over Time",
    },
    xAxis: {
      type: "datetime", // Set x-axis type to datetime
      title: {
        text: "Time",
      },
    },
    yAxis: {
      title: {
        text: "Speed (pixels/second)",
      },
      labels: {
        formatter: function () {
          return this.value.toFixed(2); // Format y-axis labels to two decimal places
        },
      },
    },
    series: [
      {
        name: "Mouse Speed (X)",
        data: [],
      },
      {
        name: "Mouse Speed (Y)",
        data: [],
      },
    ],
    time: {
      timezoneOffset: new Date().getTimezoneOffset(), // Set timezoneOffset to your local timezone
    },
  });

  useEffect(() => {
    const maxDataPoints = 100; // Maximum number of data points to keep
    const timeWindow = 10000; // 10 seconds time window

    const handleMouseMove = (e) => {
      const currentTime = new Date().getTime();

      // Filter out data points older than the time window
      const filteredDataX = chartOptions.series[0].data.filter(
        (point) => currentTime - point[0] <= timeWindow
      );
      const filteredDataY = chartOptions.series[1].data.filter(
        (point) => currentTime - point[0] <= timeWindow
      );

      const deltaX = e.clientX - chartOptions.series[0].data[0]?.[0];
      const deltaY = e.clientY - chartOptions.series[1].data[0]?.[0];

      // Calculate the speed in pixels per second
      const speedX = Math.abs(deltaX / timeWindow);
      const speedY = Math.abs(deltaY / timeWindow);

      // Update the chart series data with the filtered data
      setChartOptions((prevOptions) => ({
        ...prevOptions,
        series: [
          {
            ...prevOptions.series[0],
            data: [...filteredDataX, [currentTime, speedX]].slice(-maxDataPoints),
          },
          {
            ...prevOptions.series[1],
            data: [...filteredDataY, [currentTime, speedY]].slice(-maxDataPoints),
          },
        ],
      }));
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [chartOptions.series]);

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default MouseSpeedChart;
