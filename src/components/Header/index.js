import React from "react";

import "./styles.css";

function Header({ toggleHistoryPanel, expression, result }) {
  return (
    <div className="header">
      <div onClick={toggleHistoryPanel} className="hamburger-button">
        ☰
      </div>
      <div className="header_expression">
        <p>{expression ? expression : 0}</p>
      </div>
      <p className="header_result">{result}</p>
    </div>
  );
}

export default Header;
