
import './App.css';
import { useState, useCallback, useEffect, useRef } from "react"

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  //// useRecf hook
  const passwrodRef = useRef(null);

const copyPasswordToClickboard = useCallback(()=> {
  passwrodRef.current?.select()
  passwrodRef.current?.setSelectionRange(0,3)
  window.navigator.clipboard.writeText(password)
}, [password])

  const passwordGenrator = useCallback(() => { ///this hook use for the optimistion of code 
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*(){}[]~`";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]) // given depandancy call back hock remember  old properties 


  useEffect(() => { /////this hock your for function call form depandances like if in any state change so useEffect hock work by defuilts
    passwordGenrator()
  }, [length, numberAllowed, charAllowed, passwordGenrator])


  return (
    <div className="App">
      <header className="App-header">
        <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
          <h1 className='text-white-500 mb-3' >PasswordGenrator</h1>
          <div className='flex shadow rounded-lg overflow-hidden mb-4'>

            <input type='text'
              value={password}
              className='outline-none w-full py-1 px-3'
              placeholder='password'
              ref={passwrodRef}
              readOnly
            />
            <button
              className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
              onClick={copyPasswordToClickboard}
            >
              Copy
            </button>
          </div>
          <div className='flex text-sm gap-x-2'>
            <div className='flex items-center gap-x-1 mb-3'>
              <input type='range'
                min={6}
                max={50}
                value={length}
                className='cursor-pointer'
                onChange={(e) => { setLength(e.target.value) }}
              />
              <label >Length : {length} </label>
            </div>
            <div className='flex items-center gap-x-1 mb-3 px-2' >
              <input type='checkbox'
                defaultValue={numberAllowed}
                id='numberInput'
                onChange={() => {
                  setNumberAllowed((prev) => !prev);
                }}
              />
              <label htmlFor='numberInput'>Numbers</label>
            </div>
            <div className='flex items-center gap-x-1 mb-3' >
              <input type='checkbox'
                defaultValue={charAllowed}
                id='characterInput'
                onChange={() => {
                  setCharAllowed((prev) => !prev);
                }}
              />
              <label htmlFor='characterInpur'> Character</label>
            </div>

          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
