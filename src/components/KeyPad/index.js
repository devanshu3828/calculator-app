import React from "react";
import { keys, symbols } from "../../constant";
import "./styles.css";

const KeyPad = ({ handleKeyPress }) => {
  return (
    <div className="keypad">
      <div className="keypad_keys">
        {keys.map((item) => (
          <p
            onClick={() => handleKeyPress(item.keyCode, item.label)}
            key={item.id}
          >
            {item.label}
          </p>
        ))}
      </div>
      <div className="keypad_symbols">
        {symbols.map((item) => (
          <p
            onClick={() => handleKeyPress(item.keyCode, item.value)}
            key={item.id}
          >
            {item.label}
          </p>
        ))}
      </div>
    </div>
  );
};

export default KeyPad;
