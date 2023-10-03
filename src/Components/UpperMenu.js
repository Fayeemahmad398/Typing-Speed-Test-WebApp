import Select from "react-select";
import { useGlobalContext } from "../GlobalContextFolder/myContext";
import { useEffect, useState } from "react";
import { UseThemes } from "../GlobalContextFolder/MyThemeContext";

let OptionsArr = [
  { label: "Easy", value: "Easy" },
  { label: "Medium", value: "Medium" },
  { label: "Hard", value: "Hard" },
];

const UpperMenu = (props) => {
  const { setTestTime } = useGlobalContext();
  const [isHurry, setHurry] = useState(false);
  const { theme } = UseThemes();

  const [valueClicked, setClickedvalue] = useState(OptionsArr[0]);

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
    setClickedvalue(OptionsArr[0]);
  };

  const HandleLevelChange = (e) => {
    props.resetAll();
    if (e.value == "Easy") {
      props.GenerateEasyWords();
      setClickedvalue(OptionsArr[0]);
    } else if (e.value == "Medium") {
      props.GenerateMediumWords();
      setClickedvalue(OptionsArr[1]);
    } else if (e.value == "Hard") {
      props.GenerateHardWords();
      setClickedvalue(OptionsArr[2]);
    }
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

      <Select
        value={valueClicked}
        onChange={HandleLevelChange}
        options={OptionsArr}
        menuPlacement="top"
        placeholder="Difficulty level"
        styles={{
          control: (baseStyle) => {
            return {
              ...baseStyle,
              background: theme.background,
              color: theme.color,
              borderColor: theme.color,
              width: "128px",
            };
          },
          placeholder: (baseStyle) => {
            return {
              ...baseStyle,
              color: theme.color,
              fontSize: "20px",
            };
          },
          menu: (baseStyle) => {
            return {
              ...baseStyle,
              background: theme.background,
              border: `${"1px solid" + theme.color}`,
            };
          },
          option: (baseStyle, state) => {
            return {
              ...baseStyle,
              background: !state.isFocused ? theme.background : theme.color,
              color: state.isFocused ? theme.background : theme.color,
              fontSize: "20px",
            };
          },
          singleValue: (baseStyle) => {
            return {
              ...baseStyle,
              color: theme.color,
              fontSize: "20px",
            };
          },
        }}
      />

      <div className="test-options">
        {props.testEnd && (
          <h3
            className="repeatTyping"
            onClick={() => {
              props.resetAll();
            }}
          >
            Click to start again
          </h3>
        )}
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
