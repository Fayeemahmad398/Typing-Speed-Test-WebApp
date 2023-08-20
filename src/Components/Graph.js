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
import { Line } from "react-chartjs-2";
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
            labels: graphData.map((arr) => {
              return arr[0];
            }),
            datasets: [
              {
                data: graphData.map((arr) => {
                  return arr[1];
                }),
                label: `${
                  typeof graphData[0][0] === "string"
                    ? "WPM vs Date"
                    : "WPM vs Time(sec) -->"
                }`,
                borderColor: `${theme.color}`,
              },
            ],
          }}
          options={{
            scales: {
              x: {
                ticks: {
                  font: {
                    // size: ,
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
                    // size: 17,
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
                    // size: 17,
                  },
                },
                ticks: {
                  font: {
                    // size: 17,
                  },
                  color: `${theme.color}`,
                },
                grid: {
                  color: `${theme.color}`,
                },
              },
            },
            // responsive: true,
            // maintainAspectRatio: false,
          }}
        />
      )}
    </>
  );
};
export default Graph;
