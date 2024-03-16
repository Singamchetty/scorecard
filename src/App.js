import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from "./pages/home";
import Dashboard from './pages/dashboard';
import Layout from './pages/layout';
import Reports from './pages/reports';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path="/dashboard" element={<Layout><Dashboard/></Layout>}/>
        <Route path="/viewreportee/:id" element={<Layout><Reports/></Layout>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
