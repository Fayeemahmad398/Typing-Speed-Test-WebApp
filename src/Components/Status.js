import { useEffect } from "react";
import { database, auth } from "../firebaseConfig";
import Graph from "./Graph";
import { toast } from "react-toastify";
import { addDoc, collection } from "firebase/firestore";

const Status = ({
  WPM,
  accuracy,
  correctChars,
  IncorrectChars,
  missedChars,
  correctWords,
  graphData,
}) => {
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

    // const resultRef = database.collection("result");
    const { uid } = auth.currentUser;

    addDoc(collection(database, "result"), {
      timeStamp: new Date(),
      WPM: WPM,
      accuracy: accuracy,
      correctChars: correctChars,
      missedChars: missedChars,
      correctWords: correctWords,
      IncorrectChars: IncorrectChars,
      UserId: uid,
    })
      .then((res) => {
        console.log(res);
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
      newSet.add(arr);
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
