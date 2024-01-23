import logo from './logo.svg';
import './App.css';
import Calendar1 from './components/Calendar1';
import Calendar2 from './components/Calendar2';

function App() {
  return (
    <div className='bg-cyan-500 h-full w-full'>
      <Calendar1/>
      <Calendar2/>
    </div>
  );
}

export default App;
