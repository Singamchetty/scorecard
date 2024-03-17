import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from "./pages/home";
import Dashboard from './pages/dashboard';
import Layout from './pages/layout';
import Reports from './pages/reports';
import './App.css';
import PageNotFound from './pages/pagenotfound/PageNotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path="/dashboard" element={<Layout><Dashboard/></Layout>}/>
        <Route path="/viewreportee/:id" element={<Layout><Reports/></Layout>}/>
        <Route path="/*" element={<Layout><PageNotFound/></Layout>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
