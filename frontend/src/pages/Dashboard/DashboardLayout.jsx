import { Outlet } from 'react-router-dom';
import Header from './components/Header'

const DashboardLayout = () => {

    return (
        <div className="main-container h-screen bg-black">
            <Header />
            <div className="content-area bg-black">
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;
