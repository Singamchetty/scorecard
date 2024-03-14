import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from "./pages/home";
import Dashboard from './pages/dashboard';
import Layout from './pages/layout';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path=":id/dashboard" element={<Layout><Dashboard/></Layout>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
