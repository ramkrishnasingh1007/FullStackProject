import logo from './logo.svg';
import './App.css';
import Calendar1 from './components/Calendar1';
import Calendar2 from './components/Calendar2';
import { useState } from 'react';

function App() {
  const [showComponent1, setShowComponent1] = useState(true);

  const handleButtonClick = () => {
    // Toggle between components
    setShowComponent1(!showComponent1);
  };
  return (
    <div className='bg-cyan-500 h-full w-full'>

<div
  className="bg-cyan-500 h-full flex justify-center items-center"
>
  <button
    onClick={handleButtonClick}
    className="bg-red-500 text-white rounded-md py-2 px-4 border-2 border-orange-500 cursor-pointer     mt-8"
    style={{ display: 'block', margin: 'auto' }}
  >
    Switch To {showComponent1 ? "Calendar1" : "Calendar2"}
  </button>
</div>
{showComponent1 ? <Calendar1/> : <Calendar2/>}
 
</div>

  );
}

export default App;
