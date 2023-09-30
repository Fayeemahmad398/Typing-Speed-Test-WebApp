import React from "react";
import { useGlobalContext } from "../GlobalContextFolder/myContext";
import { Bar, Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
function ComparePage() {
  const { dataForCompare } = useGlobalContext();
  console.log(dataForCompare);

  const currentUser = dataForCompare[0];
  const friendData = dataForCompare[1];
  return (
    <div style={{ width: "80%" }}>
      <Line
        data={{
          labels: ["1st", "2nd", "3rd", "4th", "5th"],
          datasets: [
            {
              label: "User1",
              data: currentUser.map((obj) => {
                return obj.WPM;
              }),
              borderColor: "red",
            },
            {
              label: "User2",
              data: friendData.map((obj) => {
                return obj.WPM;
              }),
              borderColor: "skyblue",
            },
          ],
        }}
        options={{}}
      />

      <Bar
        data={{
          labels: ["1st", "2nd", "3rd", "4th", "5th"],
          datasets: [
            {
              label: "User1",
              data: currentUser.map((obj) => {
                return obj.accuracy;
              }),
              borderColor: "red",
            },
            {
              label: "User2",
              data: friendData.map((obj) => {
                return obj.accuracy;
              }),
              borderColor: "skyblue",
            },
          ],
        }}
        options={{}}
      />
    </div>
  );
}

export default ComparePage;
