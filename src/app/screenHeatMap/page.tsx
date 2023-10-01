"use client"
import React, { useEffect, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import heatmap from "highcharts/modules/heatmap";

heatmap(Highcharts);

const Heatmap = () => {
  const [heatmapData, setHeatmapData] = useState([]);

  useEffect(() => {
    const handleMouseClick = (e) => {
      const { clientX, clientY } = e;
      setHeatmapData((prevData) => [...prevData, { x: clientX, y: clientY, value: 5 }]); // Adjust the 'value' to control dot size and intensity
    };

    document.addEventListener("click", handleMouseClick);

    return () => {
      document.removeEventListener("click", handleMouseClick);
    };
  }, []);

  const heatmapOptions = {
    chart: {
      type: "heatmap",
      height: "500px",
    },
    title: {
      text: "User Interaction Heatmap",
    },
    xAxis: {
      title: {
        text: "X-Axis",
      },
    },
    yAxis: {
      title: {
        text: "Y-Axis",
      },
    },
    colorAxis: {
      min: 0,
      minColor: "#FFFFFF",
      maxColor: Highcharts.getOptions().colors[0],
    },
    plotOptions: {
      heatmap: {
        pointPadding: 0,
        borderWidth: 1,
        marker: {
          radius: 10, // Adjust the radius to make dots larger
        },
      },
    },
    series: [
      {
        name: "Clicks",
        data: heatmapData,
      },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={heatmapOptions} />
    </div>
  );
};

export default Heatmap;
