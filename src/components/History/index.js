import React from "react";
import "./styles.css";
function History({ history, clearHistory }) {
  return (
    <div className="history_container">
      <div className="history_title">History</div>
      {history.length === 0 ? (
        <p className="history_text">There's no history yet</p>
      ) : (
        <div className="history_list">
          <ul>
            {history.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
      <div onClick={clearHistory} className="history_clearBtn">
        Clear History
      </div>
    </div>
  );
}

export default History;
