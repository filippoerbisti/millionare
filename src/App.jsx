import { useEffect, useMemo, useState } from "react";
import "./app.css";
import Trivia from "./components/Trivia";
import Timer from "./components/Timer";
import Start from "./components/Start";
import questions from "./store/questions";
import pyramid from "./store/pyramid";

function App() {
  const [username, setUsername] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [stop, setStop] = useState(false);
  const [earned, setEarned] = useState("$ 0");

  const data = questions;
  
  const moneyPyramid = useMemo(() => 
    pyramid,
  []); 

  useEffect(() => {
    questionNumber > 1 && setEarned(moneyPyramid.find((m) => m.id === questionNumber - 1).amount);
  }, [moneyPyramid, questionNumber]);

  return (
    <div className="app">

      {username ? (
        <>
          <div className="main">
            {stop ? (
              <h1 className="endText">You earned: {earned}</h1>
            ) : (
              <>
                <div className="top">
                  <div className="timer">
                    <Timer 
                      setStop={setStop} 
                      questionNumber={questionNumber} 
                    />
                  </div>
                </div>
                <div className="bottom">
                  <Trivia 
                    data={data} 
                    setStop={setStop} 
                    questionNumber={questionNumber}
                    setQuestionNumber={setQuestionNumber} 
                  />
                </div>
              </>
            )}
          </div>

          <div className="pyramid">
              <ul className="moneyList">
                <h1>Ciao, {username}!</h1>
                <br />
                {moneyPyramid.map(m => (
                  <li 
                    key={m.id}
                    className={
                      questionNumber === m.id 
                      ? "moneyListItem active" 
                      : "moneyListItem"
                    }
                  >
                    <span className="moneyListItemNumber">{m.id}</span>
                    <span className="moneyListItemAmount">{m.amount}</span>
                  </li>
                ))}
              </ul>
          </div>
        </>
      ) : (
        <Start setUsername={setUsername} />
      )}
    </div>
  );
}

export default App;
