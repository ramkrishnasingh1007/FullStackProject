import './App.css';
import CombinedCalendar from './components/CombinedCalendar';
import Footer from './components/Footer.jsx';
import Navbar from './components/Navbar.jsx';

function App() {
  return (
    <div className='bg-gray-100 h-full w-full'>
      
      <Navbar/>
      <CombinedCalendar/>
    <Footer/>
    </div>
  );
}

export default App;
