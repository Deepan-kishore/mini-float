import React, { createContext, useContext, useRef } from 'react';
import { Link, Outlet } from 'react-router-dom';
import NavbarComponent from './Navbar';

import 'bootstrap-icons/font/bootstrap-icons.css';
import dayjs from 'dayjs';
import { SchedulerData } from '@/types/global';

// import './Layout.css'; // Assuming you have some CSS for styling
const e1 = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12.5203 18.542L19.2499 18.542" stroke="#242C39" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" vector-effect="" style={{ stroke: 'var(--svg-icon-color, #242C39)' }}></path><path d="M4.75 5.5L11.4014 5.5" stroke="#242C39" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" vector-effect="" style={{ stroke: 'var(--svg-icon-color, #242C39)' }}></path><path d="M4.75 12.021L19.2266 12.021" stroke="#242C39" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" vector-effect="" style={{ stroke: 'var(--svg-icon-color, #242C39)' }}></path></svg>
const e2 = <svg xmlns="http://www.w3.org/2000/svg" fill="none" height="24" viewBox="0 0 24 24" width="24"><path stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5.782 19.25h7.436c.565 0 1.009-.468.896-1.021C13.804 16.7 12.79 14 9.5 14s-4.304 2.701-4.615 4.229c-.112.553.332 1.021.897 1.021ZM15.75 14c2.079 0 2.93 2.148 3.274 3.696.185.836-.49 1.554-1.347 1.554h-.927M12.25 7.5a2.75 2.75 0 1 1-5.5 0 2.75 2.75 0 0 1 5.5 0Zm2.5 2.75c1.519 0 2.5-1.231 2.5-2.75s-.981-2.75-2.5-2.75" vector-effect="" style={{ stroke: 'var(--svg-icon-color, #000)' }}></path></svg>;
const e3 = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.25 17.25v-7.5a2 2 0 0 0-2-2H4.75v9.5a2 2 0 0 0 2 2h10.5a2 2 0 0 0 2-2Z" vector-effect="" style={{ stroke: 'var(--svg-icon-color, #000)' }}></path><path stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m13.5 7.5-.931-1.708a2 2 0 0 0-1.756-1.042H6.75a2 2 0 0 0-2 2V11" vector-effect="" style={{ stroke: 'var(--svg-icon-color, #000)' }}></path></svg>



// src/context/AppContext.tsx
// import React, { createContext, useContext, useRef } from 'react';



export const mockedSchedulerData = [{
    "id": "ec16e066-c562-4618-a417-102a87c48049",
    "label": {
        "icon": "https://picsum.photos/24",
        "title": "beyond Luxurious",
        "subtitle": "Kroon"
    },
    "data": [
       
      {
        id: "8b71a8a5-33dd-4fc8-9caa-b4a584ba3762",
        startDate: new Date("2024-09-13T15:31:24.272Z"),
        endDate: new Date("2024-09-28T10:28:22.649Z"),
        occupancy: 3600,
        title: "Project A",
        subtitle: "Subtitle A",
        description: "array indexing Salad West Account",
        bgColor: "rgb(254,165,177)"
      },
        
        
    ]
  }];
  

  
const Layout: React.FC = () => {

    const TopBarFunctions = useRef<null |  {
        topBarHandlers:{
            data: SchedulerData | undefined,
            config: any,
            handleGoNext: any,
            handleGoPrev: any,
            handleGoToday: any,
            zoomIn: any,
            zoomOut: any,
            isNextZoom: any,
            isPrevZoom: any,
            handleFilterData: any,
            onClearFilterData: any
        }
      } >(null)
    
    return (
                <div className="layout">
            <NavbarComponent/>
            <div className="layout-body">
                <aside className="layout-sidebar">
                    <nav className='sidebar' >
                    <Link to="/" className="icon-link">{e1}</Link>
                    <Link to="/teams" className="icon-link">{e2}</Link>
                    <Link to="/Project" className="icon-link">{e3}</Link>
                          
                    </nav>
                </aside>
                <main className="layout-main">
                    <Outlet />
                </main>
            </div>
            
        </div>
    );
};

export default Layout;