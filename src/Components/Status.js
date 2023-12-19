import { useEffect, useState } from "react";
import { database, auth } from "../firebaseConfig";
import Graph from "./Graph";
import { toast } from "react-toastify";
import { addDoc, collection } from "firebase/firestore";
import { useGlobalContext } from "../GlobalContextFolder/myContext";

const Status = ({
  WPM,
  accuracy,
  correctChars,
  IncorrectChars,
  missedChars,
  correctWords,
  graphData,
}) => {
  const { setTotalTests } = useGlobalContext();

  const SaveDataToDB = () => {
    if (isNaN(accuracy)) {
      toast.warn("invalid test,Type atleast a word!", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        style: {
          color: "yellow",
        },
      });
      return;
    }

    const user = auth.currentUser;

    let uid = user.uid;
    console.log(user);

    addDoc(collection(database, "result"), {
      timeStamp: new Date(),
      WPM: WPM,
      accuracy: accuracy,
      correctChars: correctChars,
      missedChars: missedChars,
      correctWords: correctWords,
      IncorrectChars: IncorrectChars,
      UserId: uid,
      Email: user.email,
    })
      .then((res) => {
        toast.success("Successfully saved user Details!", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          style: {
            color: "green",
          },
        });
        setTotalTests((prev) => {
          return prev + 1;
        });
      })
      .catch((error) => {
        toast.error(
          `Not able  to save user details error is : ${error.message}`,
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
              color: "red",
            },
          }
        );
      });
  };

  useEffect(() => {
    if (auth.currentUser) {
      SaveDataToDB();
    } else {
      toast.warn("Please Loggin to save result", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        style: {
          color: "yellow",
        },
      });
    }
  }, []);

  const newSet = new Set();

  const UpdatedGraphData = graphData.filter((arr) => {
    if (!newSet.has(arr[0])) {
      newSet.add(arr[0]);
      return arr;
    }
  });

  return (
    <div className="status-box">
      <div className="result">
        <div>
          <span>WPM:</span> <strong>{WPM}</strong>
        </div>

        <div>
          <span>Accuracy:</span>
          <strong>
            {accuracy}
            {!isNaN(accuracy) ? "%" : ""}
          </strong>
        </div>
        <div>
          <div>
            Characters:
            <strong>{correctChars}</strong>/<strong>{IncorrectChars}</strong>/
            <strong>{missedChars}</strong>
          </div>
        </div>
      </div>
      <div className="graph-homepage">
        <Graph graphData={UpdatedGraphData} />
      </div>
    </div>
  );
};
export default Status;
