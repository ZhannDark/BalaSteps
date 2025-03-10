import React from 'react';
import './styles.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main_Header from './main/header/header';
import MainContent from './main/main_content/main';
import News from './main/main_content/news';
import Header_buttons from './main/main_content/header_buttons';
import Footer_Content from './main/main_content/footer';
import Register from './register/register';
import Login from './login/login';
import ForgotPassword from './forget_password/forget_password';
import Header from './main_panel/main_header/Main_header';
import SymptomTracker from './main_panel/symptom_tracker/symptom_tracker';
import InfoHub from './main_panel/info_hub/information_hub';
import SendOTP from './register/sendOTP';
import InformationHub from './main_panel/info_hub/information_hub';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              {/*<Main_Header />*/}
              {/*<MainContent />*/}
              {/*<News />*/}
              {/*<Header_buttons />*/}
              <SymptomTracker />
            </>
          }
        />
        {/*<Route path="/register" element={<Register />} />*/}
        {/*<Route path="/login" element={<Login />} />*/}
        {/*<Route path="/forgot-password" element={<ForgotPassword />} />*/}
        {/*<Route path="/main_header" element={<Header />} />*/}
        <Route path="/symptom-tracker" element={<SymptomTracker />} />
        <Route path="/information-hub" element={<InfoHub />} />
        <Route path="/information-hub" element={<InformationHub />} />
        {/*<Route path="/send-otp" element={<SendOTP />} />*/}
      </Routes>
      {/*<Footer_Content />*/}
    </Router>
  );
};

export default App;
