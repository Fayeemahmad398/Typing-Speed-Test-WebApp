import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { CircularProgress } from "@mui/material";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router";
import ShowDataTable from "../Components/ShowDataTable";
import Graph from "../Components/Graph";
import UserInfo from "../Components/UserInfo";
import Comparision from "../Components/Comparision";
import { useGlobalContext } from "../GlobalContextFolder/myContext";
import Chart from "chart.js/auto";

const Userpage = () => {
  const navigator = useNavigate();
  const [graphData, setGraphData] = useState([]);
  const [user, loading] = useAuthState(auth);
  const { currentUserData } = useGlobalContext();

  const fetchData = () => {
    console.log(user);
    let data = [];

    currentUserData.map((obj) => {
      data.push([obj.timeStamp.toDate().toLocaleDateString(), obj.WPM]);
    });

    setGraphData(data);
  };

  useEffect(() => {
    if (loading == false && !user) {
      //avoiding elligle acess
      navigator("/");
    } else {
      if (user) fetchData();
    }
  }, [user, currentUserData.length]);

  if (loading) {
    return (
      <div className="center-loader">
        <CircularProgress size={80} color="inherit" />
      </div>
    );
  }

  return (
    // currentUserData.length > 0 && (
    <div className="canvas">
      <h1>Compare yourself but with learning mindset (Positively)</h1>
      <Comparision />
      <UserInfo data={currentUserData} />
      <div className="graph-width">
        <h1>Typing Speed Analysis</h1>
        <Graph graphData={graphData} />
      </div>
      <ShowDataTable data={currentUserData} />
    </div>
    // )
  );
};
export default Userpage;
