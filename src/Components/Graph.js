import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { UseThemes } from "../GlobalContextFolder/MyThemeContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Graph = ({ graphData }) => {
  const { theme } = UseThemes();

  return (
    <>
      {graphData.length > 0 && (
        <Line
          className="line-component"
          data={{
            labels:
              typeof graphData[0][0] === "string"
                ? [...graphData].reverse().map((arr) => {
                    return arr[0]; //date x-axes  [1,3,43,4,45]
                  })
                : graphData.map((arr) => {
                    return arr[0]; //secs time
                  }),
            datasets: [
              //putting the sets of data array on y axis
              {
                data: [...graphData].reverse().map((arr) => {
                  return arr[1]; //wpm
                }),
                label:
                  typeof graphData[0][0] === "string"
                    ? "WPM vs Date"
                    : "WPM vs Time(sec) -->",
                fill: true,
                backgroundColor: `${theme.shadowoColor}`,
                borderColor: `${theme.color}`,
                color: `${theme.color}`,
              },
            ],
          }}
          options={{
            scales: {
              x: {
                ticks: {
                  font: {
                    size: 20,
                  },
                  color: `${theme.color}`,
                },
                title: {
                  display: true,
                  text:
                    typeof graphData[0][0] === "string"
                      ? "Date >"
                      : "Time(sec) >",
                  color: `${theme.color}`,
                  font: {
                    size: 20,
                  },
                },
                grid: {
                  color: `${theme.color}`,
                },
              },
              y: {
                title: {
                  display: true,
                  text: "WPM >",
                  color: `${theme.color}`,
                  font: {
                    size: 20,
                  },
                },
                ticks: {
                  font: {
                    size: 20,
                  },
                  color: `${theme.color}`,
                },
                grid: {
                  color: `${theme.color}`,
                },
              },
            },
            plugins: {
              title: {
                font: {
                  size: 30,
                },
                display: true,
                // text:
                //   typeof graphData[0][0] === "string"
                //     ? "WPM Vs Date"
                //     : "WPM Vs Time (sec)",
                color: theme.color,
              },

              legend: {
                display: true, // Show the legend
                position: "top", // You can change the legend's position (options: 'top', 'bottom', 'left', 'right')
                labels: {
                  font: {
                    size: 28, // Adjust the font size for legend labels
                  },
                  color: theme.shadowoColor, // Change the color of legend labels
                },
              },
              tooltip: {
                enabled: true, // Enable tooltips on hover
                backgroundColor: theme.background, // Set tooltip background color
                titleFont: {
                  size: 20, // Customize the title font size in the tooltip
                  color: theme.shadowColor,
                },
                titleColor: theme.shadowoColor,
                caretSize: 44,

                bodyFont: {
                  borderColor: theme.color,
                  size: 16, // Customize the body font size in the tooltip
                },
                borderColor: theme.color, // Set the border color
                borderWidth: 2, // Set the border width
                cornerRadius: 8, // S
              },
            },
            responsive: true,

            
            maintainAspectRatio: false,
            animations: {
              tension: {
                duration: 1000,
                easing: "linear",
                from: 1,
                to: 0,
                loop: true,
              },
            },
          }}
        />
      )}
    </>
  );
};
export default Graph;
