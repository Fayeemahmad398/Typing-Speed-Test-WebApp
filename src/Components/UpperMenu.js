import { useGlobalContext } from "./GlobalContextFolder/myContext";

const UpperMenu = (props) => {
  const { setTestTime } = useGlobalContext();
  const handleTestTime = (event) => {
    setTestTime(Number(event.target.id));
    
  };

  return (
    <div className="upper-menu">
      <div className="counter">Test Time : {props.countDown}sec</div>
      <div className="test-options">
        <div className="test-mode" id="15" onClick={handleTestTime}>
          15sec
        </div>
        <div className="test-mode" id="30" onClick={handleTestTime}>
          30sec
        </div>
        <div className="test-mode" id="60" onClick={handleTestTime}>
          60sec
        </div>
      </div>
    </div>
  );
};
export default UpperMenu;
