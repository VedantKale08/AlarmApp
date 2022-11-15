import { useEffect, useRef, useState } from 'react';
import audio from './ringtone.mp3'
import './App.css';

function App() {
  let time = new Date().toLocaleTimeString()

  const [currentTime, setCurrentTime] = useState(time);
  const [h, setH] = useState();
  const [m, setM] = useState();
  const [ampm, setAmPm] = useState();
  const [info, setInfo] = useState(false);

  var alarmTime = '';
  var checkTime;
  let htime;
  let mtime;
  let ampmtime;
  let ringtone = new Audio(audio)

  const Update = (event) => {
    time = new Date().toLocaleTimeString();
    setCurrentTime(time);

    htime = new Date().getHours() > 12 ? new Date().getHours() - 12 : new Date().getHours();
    htime = htime < 10 ? "0" + htime : htime;
    mtime = new Date().getMinutes() < 10 ? "0" + new Date().getMinutes() : new Date().getMinutes();
    ampmtime = new Date().getHours() >= 12 ? "PM" : "AM"

    checkTime = htime + ":" + mtime + " " + ampmtime;

    if (alarmTime === checkTime) {
      ringtone.play();
      ringtone.loop = true;
      let dis = document.querySelectorAll('.dropdown')
      dis.classList.remove('disable');
    }
  }
  setInterval(Update, 1000)

  const createHours = () => {
    const hours = [];
    for (let i = 12; i > 0; i--) {
      i = i < 10 ? "0" + i : i;
      hours.push(
        <option key={i} value={i}>{i}</option>
      )
    }
    return hours;
  }
  const createMinutes = () => {
    const minutes = [];
    for (let i = 60; i > 0; i--) {
      i = i < 10 ? "0" + i : i;
      minutes.push(
        <option key={i} value={i}>{i}</option>
      )
    }
    return minutes;
  }

  const setAlarm = (event) => {
    alarmTime = h + ":" + m + " " + ampm
    if (alarmTime.includes("undefined")) {
      return alert("Please select valid time")
    }
    else {
      alert("Alarm set for "+ ((h-(new Date().getHours() > 12 ? new Date().getHours() - 12 : new Date().getHours()))+" hours and "+
      (m-(new Date().getMinutes() < 10 ? "0" + new Date().getMinutes() : new Date().getMinutes()))+" minutes for now"))
      let dis = document.querySelectorAll('.dropdown')
      setInfo(true);
    }
  }

  const stopalarm = (event) => {
    ringtone.pause();
    ringtone.currentTime = 0;
  }

  return (
    <div className='App'>
      <div className="App-wrapper">

        <h1>{currentTime}</h1>

        <br />
        <div className="setAlarm">
          <div className="dropdown">
            <select onChange={(e) => setH(e.target.value)}>
              <option value="Hours" selected hidden>Hour</option>
              {createHours()}
            </select>
          </div>
          <p>&nbsp;</p>
          <div className="dropdown">
            <select onChange={(e) => setM(e.target.value)}>
              <option value="Minute">Minute</option>
              {createMinutes()}
            </select>
          </div>
          <p>&nbsp;</p>
          <div className="dropdown">
            <select onChange={(e) => setAmPm(e.target.value)}>
              <option value="AM/PM">AM/PM</option>
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
          <br />
        </div>
        <br />
        <div className="button">
          <button onClick={setAlarm}>Set Alarm</button>
          {/* <button className='stop' onClick={stopalarm}>Stop Audio</button> */}
        </div>
        {/* <p>{info ? "Alarm : " + h + ":" + m + " " + ampm : ""}</p> */}
        <p>{info ? 
                  "Alarm in "+(h-(new Date().getHours() > 12 ? new Date().getHours() - 12 : new Date().getHours()))+" hours "+
                  (m-(new Date().getMinutes() < 10 ? "0" + new Date().getMinutes() : new Date().getMinutes()))+" minutes"
                  : ""}
        </p>
      </div>
    </div>
  );
}

export default App;
