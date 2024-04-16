import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from "./pages/home";
import Dashboard from './pages/dashboard';
import WithLayout from './utils/withLayout/index'
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
        <Route path='/' element={<WithLayout/>}>
          {/* profile  page */}
          <Route path="/dashboard" element={<AdminProfile/>}/>
          {/* reportees  page */}
          <Route path="/myreportees" element={<Dashboard/>}/>
            {/*adding activities*/}
          <Route path="/viewreportee" element={<Viewreportee/>}/>
          {/* fetch reports */}
          <Route path="/reportees" element={<Exporttable/>}/>
          {/* Admin reports */}
          <Route path="/adminreportees" element={<Adminreports/>}/>
          {/* Activity List */}
          <Route path="/Admin" element={<Admin/>}/>
        </Route>
        <Route path="/*" element={<PageNotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
