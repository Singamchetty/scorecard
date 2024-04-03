import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from "./pages/home";
import Dashboard from './pages/dashboard';
import Layout from './pages/layout';
import Viewreportee from './pages/viewReportee';
import './App.css';
import PageNotFound from './pages/pagenotfound/PageNotFound';
import Exporttable from './pages/reportexport'
import AdminProfile from './pages/adminProfile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path="/dashboard" element={<Layout><Dashboard/></Layout>}/>
        <Route path="/viewreportee" element={<Layout><Viewreportee/></Layout>}/>
        <Route path="/reportees" element={<Layout><Exporttable/></Layout>}/>
        <Route path="/adminProfile" element={<Layout><AdminProfile/></Layout>}/>

        <Route path="/*" element={<PageNotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
