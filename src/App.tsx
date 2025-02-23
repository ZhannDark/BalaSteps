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

const App = () => {
  return (
    <Router>
      <Main_Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <MainContent />
              <News />
              <Header_buttons />
            </>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
      <Footer_Content />
    </Router>
  );
};

export default App;
