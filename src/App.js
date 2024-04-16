import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from "./pages/home";
import Dashboard from './pages/dashboard';
import Layout from './pages/layout';
import Viewreportee from './pages/viewReportee';
import './App.css';
import PageNotFound from './pages/pagenotfound/PageNotFound';
import Exporttable from './pages/reportexport'
import AdminProfile from './pages/adminProfile';
import Adminreports from './pages/adminreports';
import  Admin  from './pages/admin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        {/* profile  page */}
        <Route path="/dashboard" element={<Layout><AdminProfile/></Layout>}/>
         {/* reportees  page */}
         <Route path="/myreportees" element={<Layout><Dashboard/></Layout>}/>
          {/*adding activities*/}
        <Route path="/viewreportee" element={<Layout><Viewreportee/></Layout>}/>
         {/* fetch reports */}
        <Route path="/reportees" element={<Layout><Exporttable/></Layout>}/>
        <Route path="/adminreportees" element={<Layout><Adminreports/></Layout>}/>
        <Route path="/Admin" element={<Layout><Admin/></Layout>}/>

        <Route path="/*" element={<PageNotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
