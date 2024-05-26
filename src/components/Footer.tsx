import React, { FC, ChangeEvent, useState } from 'react';
import fuelLogo from '../assets/fuel.svg';

const Footer: FC = () => {
  const [status, setStatus] = useState("New Questionnaire");
  const [logged, setLogged] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.currentTarget.value);
  };

  return (
    <footer className="footer-container" aria-labelledby="footer-title">
      <div className="logo">
        <img src={fuelLogo} alt="Fuel logo" />
      </div>
      <div>
        {!editMode &&
          <div>
            <button className="questionary" onClick={() => setEditMode(true)} aria-label="Edit questionnaire title">{status || "New Questionnaire"}</button>
          </div>
        }
        {editMode &&
          <div>
            <input type="title" onChange={onStatusChange} autoFocus={true} onBlur={() => setEditMode(false)}
                   value={status}/>
          </div>}
      </div>
      <div className="card">
        {logged && <span>tom@fueled.com</span>}
        <button className="log-in" onClick={() => setLogged(!logged)}>
          {logged ? "LOG OUT" : "LOG IN"}
        </button>
      </div>
    </footer>
  );
};

export default Footer;
