// Import React, useRef, useEffect from the react library
import React, { useRef, useEffect } from 'react';
// Import Line component from react-chartjs-2 library
import { Line } from 'react-chartjs-2';
// Import Chart and CategoryScale from chart.js library
import { Chart } from 'chart.js';
import { CategoryScale } from 'chart.js';

// Register CategoryScale with Chart
Chart.register(CategoryScale);

// Define a functional component called Graph that takes in data and currentPosition props
const Graph = ({ data, currentPosition }) => {
  // Define two references using the useRef hook
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  // Use the useEffect hook to perform side effects after the component has rendered
  useEffect(() => {
    // Get the canvas element from the canvasRef reference
    const canvas = canvasRef.current;
    // Get the 2D rendering context for the canvas
    const ctx = canvas.getContext('2d');

    // If the chart has already been created
    if (chartRef.current) {
      // Clear out the data in the existing datasets
      if (chartRef.current.data.datasets.length > 0) {
        chartRef.current.data.datasets.forEach((dataset) => {
          dataset.data = [];
        });
        // Update the chart with the new data
        chartRef.current.update();
      }
      // Destroy the existing chart
      chartRef.current.destroy();
    }

    // Create a new chart using the Chart constructor and store it in the chartRef reference
    chartRef.current = new Chart(ctx, {
      // Specify the chart type as a line chart
      type: 'line',
      // Specify the chart data as an object with labels and datasets properties
      data: {
        // Use the map method to generate an array of labels from the data array indices
        labels: data.map((_, index) => index),
        // Define a single dataset with a label, data, and styling options
        datasets: [
          {
            label: 'Distance',
            // Use the map method to generate an array of data points that are the absolute difference between each data point and the currentPosition prop
            data: data.map(item => Math.abs(item - currentPosition)),
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: 'rgba(75,192,192,1)',
            pointBorderColor: 'rgba(245, 143, 194, 1)',
            // Add these properties to set the colors of the line
            borderCapStyle: 'round',
            borderJoinStyle: 'round',
            borderWidth: 5,
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(245, 143, 194, 1)',
          },
        ],
      },
      // Specify chart options, including scales, plugins, and responsive settings
      options: {
        scales: {
          x: {
            grid: {
              display: false,
            },
            title: {
              display: true,
              text: 'Data',
            },
          },
          y: {
            grid: {
              borderDash: [8, 4],
              drawBorder: false,
            },
            title: {
              display: true,
              text: 'Distance',
            },
            ticks: {
              beginAtZero: true,
              padding: 10,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }, [data, currentPosition]);

  return (
    <div className="graph">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default Graph;
