import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
//import { readRecord, postNewCount } from "./firebase";

const measure = 80;

const randomCoordinates = () => {
  const left = Math.floor(Math.random() * (window.innerWidth - measure));
  const top = Math.floor(Math.random() * (window.innerHeight - measure));
  return { left, top };
};

function App() {
  const initialTime = 10000;
  const initialRandom = {
    left: randomCoordinates().left,
    top: randomCoordinates().top,
  };

  const [randoms, setRandom] = useState(initialRandom);
  const [renderedDiv, setRenderedDiv] = useState([initialRandom]);
  const [time, setTime] = useState(initialTime);
  const [gameOver, setGameOver] = useState(false);
  const [count, setCount] = useState(null);
  // const [record, setRecord] = useState(null);

  let timer = useRef(null);

  /*  useEffect(() => {
    const getRecord = async () => {
      const record = await readRecord();
      setRecord(record);
    };
    getRecord();
  }, []); */

  useEffect(() => {
    timer.current = setTimeout(() => {
      setGameOver(true);
      //postNewCount(count);
    }, time);

    return () => {
      clearTimeout(timer.current);
    };
  }, [time, count]);

  const handleOnMouseEnter = useCallback(() => {
    clearTimeout(timer.current);
    const left = randomCoordinates().left;
    const top = randomCoordinates().top;
    setRandom({ left, top });
    setTime((prevTime) => prevTime - 1000);
    setRenderedDiv([...renderedDiv, { left, top }]);
    setCount(count + 1);
  }, [renderedDiv, count]);

  const randomClass = {
    border: "2px solid red",
    position: "absolute",
    padding: "10px",
    display: "flex",
    width: `${measure}px`,
    height: `${measure}px`,
    top: `${randoms.top}px`,
    left: `${randoms.left}px`,
  };

  return (
    <>
      {gameOver ? (
        <div className=" w-full h-screen flex flex-col justify-center items-center bg-slate-500">
          <div>Game Over</div>
          <div className=" text-lg">Current game: {count}</div>
        </div>
      ) : (
        <div className="relative w-full h-screen overflow-hidden">
          {renderedDiv.map((d) => (
            <div
              key={d.top}
              style={{
                border: "1px solid pink",
                position: "absolute",
                width: `${measure}px`,
                height: `${measure}px`,
                top: `${d.top}px`,
                left: `${d.left}px`,
              }}
            ></div>
          ))}
          <div style={randomClass}>
            <div onMouseEnter={handleOnMouseEnter}>{time}</div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
