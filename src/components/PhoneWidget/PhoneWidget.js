import React, { useState } from "react";
import { BsMicMute } from "react-icons/bs";
import { IoIosKeypad } from "react-icons/io";
import { PiSpeakerSimpleNoneThin } from "react-icons/pi";
import { LuUserCircle2 } from "react-icons/lu";
import { ImPhoneHangUp } from "react-icons/im";
import "./PhoneWidget.css";

const PhoneWidget = ({ isVisible }) => {
  const [keypadVisible, setKeypadVisible] = useState(false);

  return (
    <div className={`phone-widget ${isVisible ? "visible" : ""}`}>
      <div className="phone-widget-header">
        <span>Phone Widget</span>
      </div>
      <div className="phone-widget-content">
        <div className="user-icon">
          <LuUserCircle2 size={48} />
          <span className="call-timer">00:33</span>
        </div>
        <div className="control-buttons">
          <button className="control-button">
            <BsMicMute size={24} />
          </button>
          <button
            className={`control-button ${keypadVisible ? "keypad-active" : ""}`}
            onClick={() => setKeypadVisible(!keypadVisible)}
          >
            <IoIosKeypad size={24} />
          </button>
          <button className="control-button">
            <PiSpeakerSimpleNoneThin size={24} />
          </button>
        </div>
        {keypadVisible && (
          <div className="keypad">
            {[
              { number: "1", letters: "" },
              { number: "2", letters: "ABC" },
              { number: "3", letters: "DEF" },
              { number: "4", letters: "GHI" },
              { number: "5", letters: "JKL" },
              { number: "6", letters: "MNO" },
              { number: "7", letters: "PQRS" },
              { number: "8", letters: "TUV" },
              { number: "9", letters: "WXYZ" },
              { number: "*", letters: "" },
              { number: "0", letters: "" },
              { number: "#", letters: "" },
            ].map((key) => (
              <button key={key.number} className="keypad-button">
                <div className="keypad-number">{key.number}</div>
                <div className="keypad-letters">{key.letters}</div>
              </button>
            ))}
          </div>
        )}
        <div className="call-buttons">
          <button className="call-button hang-up">
            <ImPhoneHangUp size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhoneWidget;
