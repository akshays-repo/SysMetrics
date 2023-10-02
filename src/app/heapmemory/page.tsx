"use client"
import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import HighchartsExporting from 'highcharts/modules/exporting'

if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts)

}



const formatMemorySize = (bytes: number): number => {
    return (bytes / (1024 ** 2))
};


const HeapMemory = () => {

    const [chartOptions, setChartOptions] = useState<any>({
        title: { text: 'Memory Usage Over Time' },
        xAxis: { type: 'datetime' },
        yAxis: { title: { text: 'Memory (MB)' } },
        series: [
            {
                name: 'Total JS Heap Size',
                data: [],
            },
            {
                name: 'Used JS Heap Size',
                data: [],
            },
        ],
        time: {
            timezoneOffset: new Date().getTimezoneOffset(), // Set timezoneOffset to your local timezone
        },
    });

    useEffect(() => {
        const fetchData = () => {
            if ('memory' in window.performance) {
                const memoryInfo:any = window.performance.memory;
                // Update the chart series with the new data.
                setChartOptions((prevOptions: any) => {
                    const maxDataLength = 50; // Maximum data length you want to maintain
                    // Copy the previous options
                    const newOptions = { ...prevOptions };
                    // Update series[0] (totalJSHeapSize)
                    const totalJSHeapSizeData = [...prevOptions.series[0].data, [Date.now(), formatMemorySize(memoryInfo.totalJSHeapSize)]];
                    if (totalJSHeapSizeData.length > maxDataLength) {
                        totalJSHeapSizeData.shift(); // Remove the oldest data point
                    }
                    newOptions.series[0].data = totalJSHeapSizeData;
                    // Update series[1] (usedJSHeapSize)
                    const usedJSHeapSizeData = [...prevOptions.series[1].data, [Date.now(), formatMemorySize(memoryInfo.usedJSHeapSize)]];
                    if (usedJSHeapSizeData.length > maxDataLength) {
                        usedJSHeapSizeData.shift(); // Remove the oldest data point
                    }
                    newOptions.series[1].data = usedJSHeapSizeData;
                    // You can do a similar update for series[2] if it exists
                    return newOptions;
                });
            }

        };

        // Fetch memory info every 10 seconds.
        const intervalId = setInterval(fetchData, 500);

        // Clean up interval on component unmount.
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className='bg-white'>
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </div>
    );
};

export default HeapMemory;
