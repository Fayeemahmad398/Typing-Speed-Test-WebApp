import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { auth, database } from "../firebaseConfig";
import { toast } from "react-toastify";
import firebaseAuthErrorMessages from "../Utils/errorMapping";

export function updateCurrentUserData(setCurrentUserData, setTotalTests) {
  const { uid } = auth.currentUser;

  const q = query(
    collection(database, "result"),
    where("UserId", "==", uid),
    orderBy("timeStamp", "desc")
  );

  const tempData = [];

  getDocs(q)
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        tempData.push(doc.data());
      });
      console.log(
        tempData.map((obj) => {
          return obj.timeStamp.toDate().toLocaleString();
        })
      );
      setCurrentUserData(tempData);
      setTotalTests(tempData.length);
    })
    .catch((error) => {
      console.log(error);
      toast.error(
        firebaseAuthErrorMessages[error?.code] ||
        "Your connection was interrupted",
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
            background: "white",
            border: `5px solid red}`,
          },
        }
      );
    });
}
