import React from "react";
import { UseThemes } from "../GlobalContextFolder/MyThemeContext";
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

function LineBarPieChart({ currentUserData, otherPersonData }) {
  const { theme } = UseThemes();

  // data for Doughnut graph
  let totalTestsOfCurrentUser = currentUserData.length; //
  let otherPersonTotalTests = otherPersonData.length;

  // data for other chart
  currentUserData =
    currentUserData.length > 10
      ? currentUserData.slice(0, 10)
      : [...currentUserData];

  otherPersonData =
    otherPersonData.length > 10
      ? otherPersonData.slice(0, 10)
      : [...otherPersonData];

  // console.log(currentUserData, otherPersonData);

  let currentUserPercent =
    (totalTestsOfCurrentUser /
      (totalTestsOfCurrentUser + otherPersonTotalTests)) *
    100;

  let otherPersonTestPercent =
    (otherPersonTotalTests /
      (totalTestsOfCurrentUser + otherPersonTotalTests)) *
    100;

  function findAvgWpm(data) {
    let sum = 0;
    data.forEach((obj) => {
      sum += obj.WPM;
    });
    return sum / (data.length == 10 ? 10 : data.length);
  }

  function findAvgAccuracy(data) {
    let sum = 0;
    data.forEach((obj) => {
      sum += obj.accuracy;
    });
    return sum / (data.length == 10 ? 10 : data.length);
  }

  // console.log(
  //   otherPersonData.map((obj) => obj.timeStamp.toDate().toLocaleTimeString())
  // );
  // console.log(
  //   currentUserData.map((obj) => obj.timeStamp.toDate().toLocaleTimeString())
  // );

  return (
    currentUserData.length > 0 &&
    otherPersonData.length > 0 && (
      <div
        style={{
          width: "90%",
          margin: "auto",
          marginTop: "30px",
        }}
      >
        <div
          style={{
            height: "400px",
            width: "100%",
            border: "2px solid",
            borderRadius: "20px",
          }}
        >
          {otherPersonData[0].Email == currentUserData[0].Email &&
            otherPersonData[0].page == "Topper" && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    position: "relative",
                  }}
                >
                  <EmojiEventsIcon
                    style={{
                      fontSize: "40px",
                      position: "absolute",
                      left: "40%",
                      top: "80%",
                    }}
                  />
                  <h1>You are the Topper</h1>
                </div>
              </div>
            )}
          {otherPersonData[0].Email == currentUserData[0].Email &&
            otherPersonData[0].page !== "Topper" && (
              <div>
                <h2>You are comparing with yourself</h2>
              </div>
            )}

          <Line
            data={{
              labels: [
                "1st",
                "2nd",
                "3rd",
                "4th",
                "5th",
                "6th",
                "7th",
                "8th",
                "9th",
                "10th",
              ],
              datasets: [
                {
                  label: `You Vs`,
                  data: [...currentUserData].reverse().map((obj) => {
                    return obj.WPM;
                  }),
                },
                {
                  label:
                    otherPersonData[0].page == "Topper" ? "Topper" : "Friend",
                  data: [...otherPersonData].reverse().map((obj) => {
                    return obj.WPM;
                  }),
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
                    text: "Nth Test--->",
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
                    color: `${theme.color}`,
                    font: {
                      size: 20,
                    },
                    text: "WPM--->",
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
                    size: 25,
                  },
                  display: true,
                  color: theme.color,
                },

                legend: {
                  display: true, // Show the legend
                  position: "top", // You can change the legend's position (options: 'top', 'bottom', 'left', 'right')

                  labels: {
                    font: {
                      size: 23, // Adjust the font size for legend labels
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
        </div>
        <div
          style={{
            height: "400px",
            marginTop: "35px",
            width: "100%",
            border: "2px solid",
            borderRadius: "20px",
          }}
        >
          <Bar
            data={{
              labels: [
                "You",
                `${otherPersonData[0].page == `Topper` ? `Topper` : `Friend`}`,
              ],
              datasets: [
                {
                  label: `WPM`,
                  data: [
                    findAvgWpm(currentUserData),
                    findAvgWpm(otherPersonData),
                  ],
                },
                {
                  label: `Accuracy`,
                  data: [
                    findAvgAccuracy(currentUserData),
                    findAvgAccuracy(otherPersonData),
                  ],
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
                    color: `${theme.color}`,
                    font: {
                      size: 20,
                    },
                    text: "Avg WPM and Accuracy(%)",
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
                    size: 25,
                  },
                  display: true,
                  color: theme.color,
                },

                legend: {
                  display: true, // Show the legend
                  position: "top", // You can change the legend's position (options: 'top', 'bottom', 'left', 'right')
                  labels: {
                    font: {
                      size: 23, // Adjust the font size for legend labels
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
        </div>
        <div
          style={{
            height: "400px",
            marginTop: "35px",
            border: "2px solid",
            borderRadius: "20px",
          }}
        >
          <Doughnut
            data={{
              labels: [
                "You",
                otherPersonData[0].page == "Topper" ? `Topper` : `Friend`,
              ],
              datasets: [
                {
                  data: [`${currentUserPercent}`, `${otherPersonTestPercent}`],
                },
              ],
            }}
            options={{
              plugins: {
                title: {
                  font: {
                    size: 25,
                  },
                  display: true,
                  text: `Given tests percentage given by you and ${
                    otherPersonData[0].page == `Topper` ? `Topper` : `Friend`
                  }`,
                  color: theme.color,
                },

                legend: {
                  display: true, // Show the legend
                  position: "top", // You can change the legend's position (options: 'top', 'bottom', 'left', 'right')
                  labels: {
                    font: {
                      size: 23, // Adjust the font size for legend labels
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
            }}
          />
        </div>
      </div>
    )
  );
}

export default LineBarPieChart;
