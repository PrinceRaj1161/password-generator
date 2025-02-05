import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setlength] = useState(8);
  const [isnumber, setisnumber] = useState(false);
  const [ischarcter, setischarcter] = useState(false);
  const [Password, setPassword] = useState("");

  const inputfocus = useRef(null);

  const createPassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (isnumber) {
      str += "0123456789";
    }
    if (ischarcter) {
      str += "`~!@#$%^&*()_+-={[}:,./;'[]";
    }

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str[char];
    }

    setPassword(pass);
  }, [length, isnumber, ischarcter]);

  useEffect(() => {
    createPassword();
  }, [length, isnumber, ischarcter]);

  const copypassword = useCallback(() =>
  {
    inputfocus.current.select();

    window.navigator.clipboard.writeText(Password);
  }, [Password]);



  return (
    <>
      <div className="container">
        <div className="work">
          <h1>Password Generator</h1>
          <div className="inputs">
            <div className="content">
              <input type="text" readOnly value={Password} ref={inputfocus} />
              <button onClick={copypassword}>Copy</button>
            </div>
            <div className="content">
              <input
                type="range"
                min={8}
                max={100}
                value={length}
                onChange={(e) => setlength(Number(e.target.value))}
              />
              <label htmlFor="length">Length: {length}</label>
            </div>
            <div className="content">
              <input
                type="checkbox"
                name="number"
                id="number"
                onChange={() => setisnumber((prev) => !prev)}
                checked={isnumber}
              />
              <label htmlFor="number">Number</label>
            </div>

            <div className="content">
              <input
                type="checkbox"
                name="character"
                id="character"
                onChange={() => setischarcter((prev) => !prev)}
                checked={ischarcter}
              />
              <label htmlFor="character">Character</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
