import React from 'react';
import Main_Header from '../header/header';
import MainContent from './main';
import News from './news';
import Header_buttons from './header_buttons';
import Footer_Content from './footer/footer';

const Main_Page = () => {
  return (
    <>
      <Main_Header />
      <MainContent />
      <News />
      <Header_buttons />
      <Footer_Content />
    </>
  );
};

export default Main_Page;
