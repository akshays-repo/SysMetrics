"use client"
import React, { useEffect, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

const MouseClickCountChart = () => {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: "column",
    },
    title: {
      text: "Mouse Click Count",
    },
    xAxis: {
      categories: ["Left Click", "Right Click"],
    },
    yAxis: {
      title: {
        text: "Click Count",
      },
    },
    series: [
      {
        name: "Clicks",
        data: [0, 0],
      },
    ],
  });

  useEffect(() => {
    const handleClick = (e) => {
      if (e.button === 0) {
        // Left Click
        setChartOptions((prevOptions) => ({
          ...prevOptions,
          series: [
            {
              ...prevOptions.series[0],
              data: [prevOptions.series[0].data[0] + 1, prevOptions.series[0].data[1]],
            },
          ],
        }));
      } else if (e.button === 2) {
        // Right Click
        setChartOptions((prevOptions) => ({
          ...prevOptions,
          series: [
            {
              ...prevOptions.series[0],
              data: [prevOptions.series[0].data[0], prevOptions.series[0].data[1] + 1],
            },
          ],
        }));
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default MouseClickCountChart;
