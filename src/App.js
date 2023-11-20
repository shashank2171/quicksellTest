import './Dropdown'
import './App.css';
import {FloatingDropdown, Board} from './Dropdown';


function App() {

  return (
    <div>

      <div className="nav">
        <FloatingDropdown/>
      </div>

      <div className="panel">
        <Board/>
      </div>

    </div>
  );
}

export default App;
