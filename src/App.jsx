import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
 import './App.css'
import { Form } from './components/Form'

function App() {
  const [count, setCount] = useState(0);
  const[valid,setValid]=useState('');
  const[pan,setPan]=useState('');
  const aadharValidate=(aadhar)=>{
if (aadhar === '') {
  setValid('');
}
    const exp=/^[2-9]{1}[0-9]{11}$/;
    return  exp.test(aadhar)?setValid('valid'):setValid('invalid');
  }
 const panValidate=(pan)=>{
  pan.toUpperCase();
  const regexp=/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return regexp.test(pan)?setPan('Valid Pan Number'):setPan('Invalid Pan Number');


 }
  return (
    <>
      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */
      }
      <Form validate={aadharValidate} msg={valid} panMessage={pan} validPan={panValidate}/>
    </>
  )
}

export default App
