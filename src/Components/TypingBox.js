import { generate } from "random-words";
import { createRef, useEffect, useMemo, useRef, useState } from "react";
import UpperMenu from "./UpperMenu";
import { useGlobalContext } from "./GlobalContextFolder/myContext";
import Status from "./Status";
const TypingBox = () => {
  const { testTime } = useGlobalContext();

  const [countDown, setCountDown] = useState(testTime);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [intervalID, setIntervalID] = useState(null);
  const [testStarted, setTestStarted] = useState(false);
  const [testEnd, setTestEnded] = useState(false);
  const [correctChars, setCorrectChars] = useState(0);
  const [IncorrectChars, setIncorrectChars] = useState(0);
  const [missedChars, setMissedChars] = useState(0);
  const [extraChars, setExtraChars] = useState(0);
  const [correctWords, setCorrectWords] = useState(0);
  const [graphData, setGraphData] = useState([]);

  const inputRef = useRef(null);

  const [randomWordArr, setRandomWordArr] = useState(() => {
    return generate(60);
  });

  useEffect(() => {
    resetAll();
  }, [testTime]);

  function wordsSpanArraysRefsClearAClass() {
    wordsSpanArraysRefs.map((wordRef) => {
      let children = wordRef?.current?.children;
      if (children) {
        Array.from(children).map((charEle) => {
          charEle.className = "";
        });
      }
    });
  }

  function resetAll() {
    clearInterval(intervalID);
    setCountDown(testTime);
    setTestStarted(false);
    setTestEnded(false);
    setWordIndex(0);
    setCharIndex(0);
    wordsSpanArraysRefsClearAClass();
    setRandomWordArr(() => {
      return generate(60);
    });
    focustInputElement();

    if (wordsSpanArraysRefs && wordsSpanArraysRefs[0].current) {
      wordsSpanArraysRefs[0].current.children[0].className = "blinkerChar";
    }
  }

  const startTimer = () => {
    const intervalId = setInterval(Timer, 1000);

    setIntervalID(intervalId);
    function Timer() {
      setCountDown((previousValue) => {
        setCorrectChars((correctChars) => {
          setGraphData((graphData) => {
            return [
              ...graphData,
              [
                testTime - previousValue + 1,

                correctChars / 5 / ((testTime - previousValue + 1) / 60),
              ],
            ];
          });
          return correctChars;
        });

        if (previousValue == 1) {
          setTestEnded(true);
          clearInterval(intervalId);
          return 0;
        }

        return previousValue - 1;
      });
    }
  };

  const wordsSpanArraysRefs = useMemo(() => {
    const arr = Array(randomWordArr.length).fill(0);
    const newArr = arr.map(() => {
      return createRef(null);
    });

    return newArr;
  }, [randomWordArr]);

  useEffect(() => {
    inputRef.current.focus();
    wordsSpanArraysRefs[wordIndex].current.children[charIndex].className =
      "blinkerChar";
  }, []);

  function handleUser(event) {
    const word = wordsSpanArraysRefs[wordIndex].current.children;

    if (!testStarted) {
      startTimer();
      setTestStarted(true);
    }

    if (event.keyCode === 32) {
      const wordTypedCorrectly = wordsSpanArraysRefs[
        wordIndex
      ].current.querySelectorAll(".correct");
      if (wordTypedCorrectly.length === word.length) {
        setCorrectWords(correctWords + 1);
      }

      if (word.length <= charIndex) {
        //logic for the space key
        // clicked space key at last of word
        word[charIndex - 1].classList.remove("blinkerChar-right");
      } else {
        // clicked space key between word
        word[charIndex].classList.remove("blinkerChar");
        setMissedChars(missedChars + (word.length - charIndex));
      }
      wordsSpanArraysRefs[wordIndex + 1].current.children[0].className =
        "blinkerChar";

      setWordIndex(wordIndex + 1);
      setCharIndex(0);
      return;
    }

    if (event.keyCode === 8 && charIndex !== 0) {
      //Clicked on back space button
      if (word.length == charIndex) {
        if (word[charIndex - 1].className.includes("extra")) {
          word[charIndex - 1].remove();
          word[charIndex - 2].className += " blinkerChar-right";
        } else {
          word[charIndex - 1].className = "blinkerChar";
        }
        setCharIndex(charIndex - 1);
        return;
      }

      word[charIndex].className = "";
      word[charIndex - 1].className = "blinkerChar";
      setCharIndex(charIndex - 1);
      return;
    }

    if (word.length == charIndex) {
      const newSpanChild = document.createElement("span");

      newSpanChild.innerText = event.key;

      newSpanChild.className = "blinkerChar-right Incorrect extra";
      word[charIndex - 1].classList.remove("blinkerChar-right");
      wordsSpanArraysRefs[wordIndex].current.append(newSpanChild);

      setCharIndex(charIndex + 1);
      setExtraChars(extraChars + 1);
      return;
    }

    if (event.key === word[charIndex].innerText) {
      word[charIndex].className = "correct";
      setCorrectChars(correctChars + 1);
    } else {
      word[charIndex].className = "Incorrect";
      setIncorrectChars(IncorrectChars + 1);
    }

    if (charIndex + 1 == word.length) {
      word[charIndex].className += ` blinkerChar-right`;
    } else {
      word[charIndex + 1].className = "blinkerChar";
    }

    setCharIndex(charIndex + 1);
  }

  function calculateWPM() {
    return Math.round(correctChars / 5 / (testTime / 60));
  }
  function calculateAccuracy() {
    return Math.round((correctWords / wordIndex) * 100);
  }
  function focustInputElement() {
    setTimeout(() => {
    inputRef?.current?.focus();
  
    }, 1000);
  }

  return (
    <div className="outer-typing-box">
      <UpperMenu countDown={countDown} />
      {!testEnd && randomWordArr.length > 0 ? (
        <div className="type-box" onClick={focustInputElement}>
          <div className="words">
            {randomWordArr.map((word, index) => {
              return (
                <span className="word" ref={wordsSpanArraysRefs[index]}>
                  {word.split("").map((char) => {
                    return <span className="eachchar">{char}</span>;
                  })}
                </span>
              );
            })}
          </div>
          <input
            type="text"
            ref={inputRef}
            onKeyDown={handleUser}
            className="input-box"
          />
        </div>
      ) : (
        <Status
          WPM={calculateWPM()}
          accuracy={calculateAccuracy()}
          correctChars={correctChars}
          IncorrectChars={IncorrectChars}
          missedChars={missedChars}
          correctWords={correctWords}
          graphData={graphData}
        />
      )}
    </div>
  );
};
export default TypingBox;
