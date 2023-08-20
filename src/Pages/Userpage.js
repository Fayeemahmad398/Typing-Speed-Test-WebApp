import { useEffect, useState } from "react";
import { database } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { CircularProgress } from "@mui/material";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router";
import ShowDataTable from "../Components/ShowDataTable";
import Graph from "../Components/Graph";
import UserInfo from "../Components/UserInfo";
import { UseThemes } from "../Components/GlobalContextFolder/MyThemeContext";

const Userpage = () => {
  const [data, setData] = useState([]);
  const navigator = useNavigate();
  const [graphData, setGraphData] = useState([]);
  const [user, loading] = useAuthState(auth);
  const { theme } = UseThemes();

  let graphData1 = [];
  const fetchData = () => {
    const { uid } = auth.currentUser;
    const tempData = [];
    const resultRef = database.collection("result");
    console.log(resultRef, uid);
    resultRef
      .where("UserId", "==", uid)
      .orderBy("timeStamp", "desc")
      .get()
      .then((snapshot) => {
        console.log(snapshot);
        snapshot.forEach((doc) => {
          tempData.push({ ...doc.data() });
          graphData1.push([
            doc.data().timeStamp.toDate().toLocaleDateString(),
            doc.data().WPM,
          ]);
        });
        setData(tempData);
        setGraphData(graphData1);
      });
  };
  console.log(graphData);
  useEffect(() => {
    if (!loading) {
      fetchData();
    }
    if (!loading && !user) {
      navigator("/");
    }
  }, [loading]);
  if (loading) {
    return (
      <div className="center-loader">
        <CircularProgress size={80} color="inherit" />
      </div>
    );
  }
  console.log(data);
  console.log(graphData);
  return (

    
    <div className="canvas">
      <UserInfo data={data} />
      <div>
        <h1>Typing Speed Analysis</h1>
        <h2>WPM vs Date</h2>
        <Graph graphData={graphData} />
      </div>
      <ShowDataTable data={data} />
    </div>
  );
};
export default Userpage;
