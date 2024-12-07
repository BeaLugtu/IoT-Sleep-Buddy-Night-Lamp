import { Outlet } from 'react-router-dom';
import Header from './components/Header'

const DashboardLayout = () => {

    return (
        <div className="main-container h-screen">
            <Header />
            <div className="content-area">
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;
