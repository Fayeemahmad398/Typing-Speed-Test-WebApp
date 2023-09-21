import { useEffect, useState } from "react";
import { database } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { CircularProgress } from "@mui/material";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router";
import ShowDataTable from "../Components/ShowDataTable";
import Graph from "../Components/Graph";
import UserInfo from "../Components/UserInfo";
import { UseThemes } from "../GlobalContextFolder/MyThemeContext";
import { toast } from "react-toastify";
import firebaseAuthErrorMessages from "../Utils/errorMapping";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

const Userpage = () => {
  const [data, setData] = useState([]);
  const navigator = useNavigate();
  const [graphData, setGraphData] = useState([]);
  const [user, loading] = useAuthState(auth);
  const { theme } = UseThemes();

  let graphData1 = [];
  const fetchData = () => {
    const { uid } = auth.currentUser;

    console.log(auth);
    const tempData = [];
    // const resultRef = database.collection("result");

    // console.log(resultRef, uid);

    const q = query(
      collection(database, "result"),
      where("UserId", "==", uid),
      orderBy("timeStamp", "desc")
    );

    getDocs(q)
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          tempData.push({ ...doc.data() });
          graphData1.push([
            doc.data().timeStamp.toDate().toLocaleDateString(),
            doc.data().WPM,
          ]);
        });
        console.log(graphData1);
        setData(tempData);
        setGraphData(graphData1);
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          firebaseAuthErrorMessages[error?.code] ||
            "firestore limit exceed Or Your connection was interrupted",
          {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            style: {
              color: theme.background,
              background: theme.color,
              border: `5px solid ${theme.background}`,
            },
          }
        );
      });
  };
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
  return (
    <div className="canvas">
      <UserInfo data={data} />
      <div className="graph-width">
        <h1>Typing Speed Analysis</h1>
        <h2>WPM vs Date</h2>
        <Graph graphData={graphData} />
      </div>
      <ShowDataTable data={data} />
    </div>
  );
};
export default Userpage;
