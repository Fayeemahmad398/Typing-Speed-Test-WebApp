import { generate } from "random-words";
import { createRef, useEffect, useMemo, useRef, useState } from "react";
import UpperMenu from "./UpperMenu";
import { useGlobalContext } from "../GlobalContextFolder/myContext";
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

  const [TotalTimetaken, setTotalTimeTaken] = useState(1);

  const inputRef = useRef(null);
  // console.log(inputRef);

  const [randomWordArr, setRandomWordArr] = useState(() => {
    return generate(70);
  });

  const wordsSpanArraysRefs = useMemo(() => {
    const arr = Array(randomWordArr.length).fill(0);
    const newArr = arr.map(() => {
      return createRef(null);
    });

    console.log(newArr);
    return newArr;
  }, [randomWordArr]);

  useEffect(() => {
    resetAll();
  }, [testTime]);

  function wordsSpanArraysRefsClearAClass() {
    wordsSpanArraysRefs.map((wordRef) => {
      let children = wordRef?.current?.children;

      if (children)
        Array.from(children).map((charEle) => {
          charEle.className = "";
        });
    });
    console.log(wordsSpanArraysRefs);
    if (wordsSpanArraysRefs && wordsSpanArraysRefs[0].current) {
      wordsSpanArraysRefs[0].current.children[0].className = "blinkerChar";
    }
  }

  function resetAll() {
    setRandomWordArr(() => {
      return generate(70);
    });
    setCountDown(testTime);
    setWordIndex(0);
    setCorrectWords(0);
    setCharIndex(0);
    setTestStarted(false);
    setTestEnded(false);
    focustInputElement();
    clearInterval(intervalID);
    wordsSpanArraysRefsClearAClass();
    setCorrectChars(0);
    setIncorrectChars(0);
    setMissedChars(0);
    setExtraChars(0);
    setGraphData([]);
    setTotalTimeTaken(1);
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
        setTotalTimeTaken(testTime - previousValue); //tracking the time taken so far

        if (previousValue == 1) {
          //test time ended
          setTestEnded(true);
          clearInterval(intervalId);
          return 0;
        }

        return previousValue - 1;
      });
    }
  };

  useEffect(() => {
    inputRef.current.focus();
    wordsSpanArraysRefs[0].current.children[0].className = "blinkerChar";
  }, []);

  // Handling the typing of chars
  function handleUser(event) {
    const word = wordsSpanArraysRefs[wordIndex].current.children;

    if (!testStarted) {
      startTimer();
      setTestStarted(true);
    }

    //user clicking the space button
    if (event.keyCode === 32) {
      // counting the correct words
      const wordTypedCorrectly = wordsSpanArraysRefs[
        wordIndex
      ].current.querySelectorAll(".correct"); //correct typed chars

      if (wordTypedCorrectly.length === word.length) {
        setCorrectWords(correctWords + 1);
      }

      //logic for the space key
      if (charIndex >= word.length) {
        // clicked space key at last char of word
        word[charIndex - 1].classList.remove("blinkerChar-right");
      } else {
        word[charIndex].classList.remove("blinkerChar");
        setMissedChars(missedChars + (word.length - charIndex));
      }

      if (wordsSpanArraysRefs[wordIndex + 1]) {
        wordsSpanArraysRefs[wordIndex + 1].current.children[0].className =
          "blinkerChar";
        setWordIndex(wordIndex + 1);
        setCharIndex(0);
      } else {
        setTestEnded(true);
        clearInterval(intervalID);
      }
      return;
    }

    if (event.keyCode === 8 && charIndex !== 0) {
      //Clicked on back space button
      if (word.length == charIndex) {
        if (word[charIndex - 1].className.includes("extra")) {
          //handling extra characters typed
          word[charIndex - 1].remove();
          word[charIndex - 2].className += " blinkerChar-right";
        } else {
          word[charIndex - 1].className = "blinkerChar"; //over write the last char classes
        }
        setCharIndex(charIndex - 1);
        return;
      }
      //back space is clicked in middle of word
      word[charIndex].className = "";
      word[charIndex - 1].className = "blinkerChar";
      setCharIndex(charIndex - 1);
      return;
    }
    // -------------------------------------------------------
    //extra char added here
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
    // --------------------------------------------------------------

    // just declaring the correct or incorrect characters
    if (event.key === word[charIndex].innerText) {
      word[charIndex].className = "correct";
      setCorrectChars(correctChars + 1);
    } else {
      word[charIndex].className = "Incorrect";
      setIncorrectChars(IncorrectChars + 1);
    }

    //Applying the border here (seems working as a cursor)

    if (charIndex + 1 == word.length) {
      //this is last char of word
      word[charIndex].className += ` blinkerChar-right`;
    } else {
      word[charIndex + 1].className = "blinkerChar";
    }

    setCharIndex(charIndex + 1);
  }

  function calculateWPM() {
    return Math.round(correctChars / 5 / (TotalTimetaken / 60));
  }

  function calculateAccuracy() {
    console.log(correctWords, wordIndex);
    return Math.round((correctWords / wordIndex) * 100);
  }

  function focustInputElement() {
    inputRef?.current?.focus();
  }

  return (
    <div className="outer-typing-box">
      <UpperMenu countDown={countDown} resetAll={resetAll} />
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
