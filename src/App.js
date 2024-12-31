import './App.css';
import Navbar from './components/Navbar.tsx';
import Sidebar from './components/Sidebar.tsx';

function App() {
  return (
    <div className="App">
    <Navbar/>
    <div>
      <Sidebar/>
    </div>
    </div>
  );
}

export default App;
