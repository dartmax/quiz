import React, {
  FC,
  ChangeEvent,
  useState,
} from 'react'
import fuelLogo from '../assets/fuel.svg'

const  Footer: FC = () => {
  const [status, setStatus] = useState("New Questionnaire")
  const [logged, setLogged] = useState(false)
  let [editMode, setEditMode] = useState(false);

  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.currentTarget.value);
  };

  return (
    <div className="footer-container">
      <div className="logo">
        <img src={fuelLogo} alt="Fuel logo"/>
      </div>
      <div>
        {!editMode &&
          <div>
            <span className="questionary" onClick={() => setEditMode(true)}>{status || "New Questionnaire"}</span>
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
        <button className="log-in">LOG IN</button>
      </div>
    </div>
  )
}

export default Footer
