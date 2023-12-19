import React, { useEffect, useState } from "react";
import LineBarPieChart from "../Components/LineBarPieChart";
import { useGlobalContext } from "../GlobalContextFolder/myContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, database } from "../firebaseConfig";
import firebaseAuthErrorMessages from "../Utils/errorMapping";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router";

function FriendCompare() {
  const { currentUserData } = useGlobalContext();
  const [TestsOfFriend, setTestsOfFriend] = useState([]);
  let Email = JSON.parse(localStorage.getItem("Email"));
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  function FetchFriendData() {
    const q = query(
      collection(database, "result"),
      where("Email", "==", Email),
      orderBy("timeStamp", "desc")
    );

    let temp = [];

    console.log(q);
    getDocs(q)
      .then((alldocs) => {
        console.log(alldocs);

        alldocs.docs.map((doc) => {
          temp.push(doc.data());
        });

        if (temp.length == 0) {
          toast.warning("User with this email does not exist ", {
            style: {
              background: "black",
              color: "yellow",
            },
          });

          setTimeout(() => {
            navigate("/");
          }, 1500);
          localStorage.removeItem("Email");
          return;
        }
        if (temp.length < 2) {
          toast.warning(
            "Your friend need to give atleast two tests to compare !",
            {
              style: {
                background: "black",
                color: "yellow",
              },
            }
          );
          setTimeout(() => {
            navigate("/userpage");
          }, 1500);
        }
        setTestsOfFriend(temp);
      })
      .catch((error) => {
        console.log(error);
        toast.error(firebaseAuthErrorMessages[error?.code], {
          style: {
            background: "white",
            color: "red",
          },
        });

        setTimeout(() => {
          navigate("/");
        }, 1500);
      });
  }

  useEffect(() => {
    if (localStorage.getItem("Email")) {
      FetchFriendData();
    } else {
      navigate("/");
    }
  }, []);

  if (currentUserData.length == 0 || TestsOfFriend.length == 0) {
    return (
      <div className="center-loader">
        <CircularProgress size={80} color="inherit" />
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginTop: "30px" }}>
        {TestsOfFriend.length > 0 && (
          <>
            <h1>Graph on the basis of recently 10 scores</h1>
            <LineBarPieChart
              currentUserData={currentUserData}
              otherPersonData={TestsOfFriend}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default FriendCompare;
