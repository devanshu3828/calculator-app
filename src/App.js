import { useState, useEffect } from "react";
import { evaluate } from "mathjs";
import Header from "./components/Header";
import KeyPad from "./components/KeyPad";
import History from "./components/History";
import { usedKeyCodes, numbers, operators } from "./constant";
import "./App.css";

function App() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("calculator-app-history")) || []
  );
  const [isHistoryPanelVisible, setHistoryPanelVisible] = useState(false);

  const toggleHistoryPanel = () => {
    setHistoryPanelVisible((prevVisibility) => !prevVisibility);
  };

  const handleKeyPress = (keyCode, key) => {
    if (!keyCode) return;
    if (!usedKeyCodes.includes(keyCode)) return;

    if (numbers.includes(key)) {
      if (key === "0") {
        if (expression.length === 0) return;
      }
      calculateResult(expression + key);
      setExpression(expression + key);
    } else if (operators.includes(key)) {
      if (!expression) return;

      const lastChar = expression.slice(-1);
      if (operators.includes(lastChar)) return;
      if (lastChar === ".") return;

      setExpression(expression + key);
    } else if (key === ".") {
      if (!expression) return;
      const lastChar = expression.slice(-1);
      if (!numbers.includes(lastChar)) return;

      setExpression(expression + key);
    } else if (keyCode === 8) {
      if (!expression) return;
      calculateResult(expression.slice(0, -1));
      setExpression(expression.slice(0, -1));
    } else if (key === "CE") {
      const lastOperatorIndex = expression.search(/[-+*/]([^*-+\\/]*)$/);
      if (lastOperatorIndex !== -1) {
        setExpression(expression.substring(0, lastOperatorIndex + 1));
      }
    } else if (key === "C") {
      setExpression("");
      setResult("");
    } else if (keyCode === 13) {
      if (!expression) return;
      calculateResult(expression);

      let tempHistory = [...history];
      if (tempHistory.length > 20) tempHistory = tempHistory.splice(0, 1);
      tempHistory.push(`${expression} = ${result}`);
      setHistory(tempHistory);
    }
  };

  const calculateResult = (exp) => {
    if (!exp) {
      setResult("");
      return;
    }
    const lastChar = exp.slice(-1);
    if (!numbers.includes(lastChar)) exp = exp.slice(0, -1);
    try {
      const answer = evaluate(exp).toFixed(2) + "";
      setResult(answer);
    } catch (error) {
      console.error("Error:", error);
      setResult("Invalid expression");
    }
  };

  const clearHistory = () => {
    localStorage.clear();
    setHistory([]);
  };
  useEffect(() => {
    localStorage.setItem("calculator-app-history", JSON.stringify(history));
  }, [history]);

  return (
    <div
      className="app"
      tabIndex="0"
      onKeyDown={(event) => handleKeyPress(event.keyCode, event.key)}
    >
      <div className="app_calculator">
        <Header
          expression={expression}
          result={result}
          history={history}
          toggleHistoryPanel={toggleHistoryPanel}
        />
        <KeyPad handleKeyPress={handleKeyPress} />
      </div>
      {isHistoryPanelVisible && (
        <History history={history} clearHistory={clearHistory} />
      )}
    </div>
  );
}

export default App;
