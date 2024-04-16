import { Outlet } from 'react-router-dom';
import Layout from '../../pages/layout';

function WithLayout() {
        return <Layout><Outlet/></Layout> 
}

export default WithLayout;
