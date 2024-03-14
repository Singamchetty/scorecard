import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from "./pages/home";
import Dashboard from './pages/dashboard';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path=":id/dashboard" element={<Dashboard />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
