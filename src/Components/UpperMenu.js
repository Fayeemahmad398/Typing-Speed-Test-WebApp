import { useGlobalContext } from "../GlobalContextFolder/myContext";
import { useEffect, useState } from "react";

const UpperMenu = (props) => {
  const { setTestTime } = useGlobalContext();
  const [isHurry, setHurry] = useState(false);

  const [is15Clicked, setClicked15] = useState(true);
  const [is30Clicked, setClicked30] = useState(false);
  const [is60Clicked, setClicked60] = useState(false);

  const handleTestTime = (event) => {
    setTestTime(Number(event.target.id));

    if (event.target.id == "15") {
      setClicked15(true);
      setClicked30(false);
      setClicked60(false);
    } else if (event.target.id == "30") {
      setClicked15(false);
      setClicked30(true);
      setClicked60(false);
    } else {
      setClicked15(false);
      setClicked30(false);
      setClicked60(true);
    }

    props.resetAll();
    setHurry(false);
  };

  useEffect(() => {
    if (props.countDown < 6) {
      setHurry(true);
    } else {
      setHurry(false);
    }
  }, [props.countDown]);

  return (
    <div className="upper-menu">
      <div className={`counter ${isHurry ? "hurry" : ""}`}>
        Test Time : {props.countDown}sec
      </div>
      <div className="test-options">
        <div
          className={`test-mode ${is15Clicked ? "activeTest" : ""}`}
          id="15"
          onClick={handleTestTime}
        >
          15sec
        </div>
        <div
          className={`test-mode ${is30Clicked ? "activeTest" : ""}`}
          id="30"
          onClick={handleTestTime}
        >
          30sec
        </div>
        <div
          className={`test-mode ${is60Clicked ? "activeTest" : ""}`}
          id="60"
          onClick={handleTestTime}
        >
          60sec
        </div>
      </div>
    </div>
  );
};
export default UpperMenu;
