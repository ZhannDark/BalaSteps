import React from 'react';
import './styles.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './auth/register/register/register';
import Login from './auth/login/login';
import ForgotPassword from './auth/forget_password/forget_password';
import SymptomTracker from './main_panel/symptom_tracker/symptom_tracker';
import UserProfile from './main_panel/profile/profile';
import VerifyOTP from './auth/register/otp/sendOTP';
import InformationHub from './main_panel/info_hub/information_hub';
import DiscussionForum from './main_panel/discussion_forum/discussion_forum/discussion_forum';
import Discussion_details from './main_panel/discussion_forum/discussion_forum_details/discussion_details';
import NewsDetails from './main_panel/info_hub/info-hub-news/news_details';
import SpecialistDetails from './main_panel/info_hub/info-hub-specialist/specialist_details';
import TherapyCenterDetails from './main_panel/info_hub/info-hub-centers/therapy_centers_details';
import Marketplace from './main_panel/marketplace/marketplace';
import MarketplaceDetails from './main_panel/marketplace/marketplace_details';
import IkomekAssistant from './main_panel/ikomek_ai_assistant/ikomek_assistant';
import Main_Page from './main_page/main_content/main_page';

import GlobalFonts from './styles/globalFonts';
import {
  Contact,
  PrivacyPolicy,
  Services,
  Support,
} from './main_page/main_content/footer/footer_links/links';

const App = () => {
  return (
    <Router>
      <GlobalFonts />
      <Routes>
        <Route path="/" element={<Main_Page />} />
        <Route path="/services" element={<Services />} />
        <Route path="/support" element={<Support />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/contact-us" element={<Contact />} />
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
        <Route
          path="/marketplace/public-items/:id"
          element={<MarketplaceDetails />}
        />
        <Route
          path="/marketplace/my-items/:id"
          element={<MarketplaceDetails />}
        />
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
      </Routes>
    </Router>
  );
};

export default App;
