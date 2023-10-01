"use client"
import React, { useState, useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const FPSChart = () => {
    const [chartOptions, setChartOptions] = useState({
        title: {
            text: 'FPS Chart',
        },
        xAxis: {
            type: 'datetime',
            title: {
                text: 'Time',
            },
        },
        yAxis: {
            title: {
                text: 'FPS',
            },
        },
        series: [
            {
                name: 'FPS',
                data: [],
            },
        ],
    });

    const lastTimestampRef = useRef(0);

    useEffect(() => {


        const fetchData = () => {
            // Start the animation loop
            const number = requestAnimationFrame((timeStamp) => {

                const deltaTime = timeStamp - lastTimestampRef.current;
                const fps = 1000 / deltaTime;

                // Create a new configuration object by cloning the existing one
                const newChartOptions = { ...chartOptions };

                // Push the new data point to the series
                newChartOptions.series[0].data.push([timeStamp, fps]);

                // Limit the chart to display a maximum of 30 data points
                if (newChartOptions.series[0].data.length > 30) {
                    newChartOptions.series[0].data.shift();
                }

                // Update the chart by setting the state with the new configuration object
                setChartOptions(newChartOptions);

                lastTimestampRef.current = timeStamp;
            });

            if ('storage' in navigator && 'estimate' in navigator.storage) {
                navigator.storage.estimate().then(function (estimate) {
                    // The estimate object contains the storage quota and usage information
                    const quota = estimate.quota; // Total storage quota in bytes
                    const usage = estimate.usage; // Current storage usage in bytes

                    // You can convert bytes to other units (e.g., megabytes or gigabytes) if needed
                    const quotaInMB = quota / (1024 * 1024);
                    const usageInMB = usage / (1024 * 1024);

                    console.log('Total storage quota:', quotaInMB, 'MB');
                    console.log('Current storage usage:', usageInMB, 'MB');
                }).catch(function (error) {
                    console.error('Error getting storage estimate:', error);
                });
            } else {
                console.error('Storage API not supported in this browser');
            }





        }

        // Fetch memory info every 10 seconds.
        const intervalId = setInterval(fetchData, 500);

        // Clean up interval on component unmount.
        return () => clearInterval(intervalId);


    }, []);

    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </div>
    );
};

export default FPSChart;
