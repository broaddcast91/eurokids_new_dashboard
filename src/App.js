import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Topbar from './scenes/global/Topbar';
import Sidebar from './scenes/global/Sidebar';
import Popup from './scenes/popup';
// import Corporates from './scenes/Corporates';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from './theme';
// import OnRoadPrice from './scenes/onroadprice';
// import Finance from './scenes/finance';
// import Insurance from './scenes/insurance';
// import BookAService from './scenes/bookaservice';
// import DrvingSchool from './scenes/DrvingSchool/DrvingSchool';
import Logout from './components/Logout/Logout';
import AllData from './scenes/AllData';
import Login from './components/Login/Login';
import Enquiries from './scenes/Enquiries';
// import SabooGroups from './scenes/SabooGroups'
// import Generals from './scenes/Generals';
// import ContactUs from './scenes/ContactUs';
// import Accessories from './scenes/Accessories/Accessories';
function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const location = useLocation();

  const [dataRefreshCounter, setDataRefreshCounter] = useState(0); // Add this state variable

  // Check if the current location is the login page or the root path
  const isLoginPage = location.pathname === '/login' || location.pathname === '/';

  const refreshData = () => {
    // You can implement your data refresh logic here
    // You might want to fetch new data or update state as needed
    // Increment the dataRefreshCounter to trigger a re-render
    setDataRefreshCounter(dataRefreshCounter + 1);
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className='app'>
          {/* Conditionally render the Sidebar and pass the refreshData callback */}
          {isLoginPage ? null : (
            <Sidebar isSidebar={isSidebar} refreshData={refreshData} />
          )}
          <main className='content'>
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/popup' element={<Popup />} />
              <Route path='/enquiries' element={<Enquiries />} />
              {/* <Route path='/onroadprice' element={<OnRoadPrice />} />
              <Route path='/corporates' element={<Corporates />} />
              <Route path='/finance' element={<Finance />} />
              <Route path='/insurance' element={<Insurance />} /> */}
              <Route path='/alldata' element={<AllData />} />
              {/* <Route path='/bookaservice' element={<BookAService />} />
              <Route path='/drvingschool' element={<DrvingSchool />} />
              <Route path='/contactus' element={<ContactUs />} />
              <Route path='/general' element={<Generals />} />
              <Route path='/accessories' element={<Accessories />} />
              <Route path='/saboogroups' element={<SabooGroups />} /> */}
              <Route path='/logout' element={<Logout />} />
              <Route path='/login' element={<Login />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

