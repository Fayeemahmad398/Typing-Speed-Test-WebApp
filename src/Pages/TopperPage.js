import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, database } from "../firebaseConfig";
import LineBarPieChart from "../Components/LineBarPieChart";
import { useGlobalContext } from "../GlobalContextFolder/myContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

function TopperPage() {
  const [topperData, setTopperData] = useState([]);
  let { currentUserData } = useGlobalContext();
  const [user, loading] = useAuthState(auth);

  const navigate = useNavigate();

  async function getTopperData(UserId) {
    const q = query(
      collection(database, "result"),
      where("UserId", "==", UserId),
      orderBy("timeStamp", "desc")
    );

    const allDocs = await getDocs(q);
    let data = [];
    allDocs.docs.map((doc) => {
      data.push(doc.data());
    });
    if (currentUserData.length < 2) {
      toast.warning("Please give atleast 2 tests to compare with topper", {
        style: {
          color: "yellow",
          background: "black",
        },
      });

      setTimeout(() => {
        navigate("/userpage");
      }, 1500);
      return;
    }

    data[0].page = "Topper";
    setTopperData(data);
  }

  async function getUserId() {
    const q = query(
      collection(database, "result"),
      orderBy("WPM", "desc"),
      limit(1)
    );
    const alldocs = await getDocs(q);
    getTopperData(alldocs.docs[0].data().UserId);
  }

  useEffect(() => {
    if (currentUserData.length > 0) getUserId();//avoiding unnecesory toastify
  }, [currentUserData.length]);

  if (currentUserData.length < 1 || topperData.length == 0) {
    return (
      <div className="center-loader">
        <CircularProgress size={80} color="inherit" />
      </div>
    );
  }

  return (
    <div>
      {currentUserData.length > 0 && (
        <>
          <h1>Graph on the basis of recently 10 scores</h1>
          <div style={{ marginTop: "30px" }}>
            <LineBarPieChart
              currentUserData={currentUserData}
              otherPersonData={topperData}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default TopperPage;
