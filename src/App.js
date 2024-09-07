import Home from './home';
import Login from './login';
import { Routes, Route } from 'react-router-dom';
import 'App.css';
import './Login.scss';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
