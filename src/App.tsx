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
import SymptomTracker from './main_panel/symptom_tracker/symptom_tracker';
import Menu from './menu/menu';
import UserProfile from './main_panel/profile/profile';
import Panel_header from './main/header/panel_header';
import VerifyOTP from './register/sendOTP';
import InformationHub from './main_panel/info_hub/information_hub';
import DiscussionForum from './main_panel/discussion_forum/discussion_forum';
import Discussion_details from './main_panel/discussion_forum/discussion_details';
import NewsDetails from './main_panel/info_hub/news_details';
import SpecialistDetails from './main_panel/info_hub/specialist_details';
import TherapyCenterDetails from './main_panel/info_hub/therapy_centers_details';
import Marketplace from './main_panel/marketplace/marketplace';
import MarketplaceDetails from './main_panel/marketplace/marketplace_details';
import IkomekAssistant from './main_panel/ikomek_ai_assistant/ikomek_assistant';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Main_Header />
              <MainContent />
              <News />
              <Header_buttons />
            </>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/send-otp" element={<VerifyOTP />} />
        <Route path="/symptom-tracker" element={<SymptomTracker />} />
        <Route path="/discussion-forum" element={<DiscussionForum />} />
        <Route path="/discussion-forum/:id" element={<Discussion_details />} />
        <Route path="/info_hub" element={<InformationHub />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/marketplace/:id" element={<MarketplaceDetails />} />
        <Route path="/info_hub/news/:id" element={<NewsDetails />} />
        <Route path="/ikomek_assistant" element={<IkomekAssistant />} />
        <Route
          path="/info_hub/specialist/:id"
          element={<SpecialistDetails />}
        />
        <Route
          path="/info_hub/therapy-center/:id"
          element={<TherapyCenterDetails />}
        />
        <Route path="/menu" element={<Menu />} />
        <Route path="/panel-header" element={<Panel_header />} />
      </Routes>
      <Footer_Content />
    </Router>
  );
};

export default App;
