import React from 'react';
import Main_Header from '../main_page_header/main_page_header';
import MainContent from './main_page_main/main_page_main';
import Main_page_news from './main_page_news/main_page_news';
import Header_buttons from './features/main_page_features';
import Footer_Content from './footer/footer/footer';

const Main_Page = () => {
  return (
    <>
      <Main_Header />
      <MainContent />
      <Main_page_news />
      <Header_buttons />
      <Footer_Content />
    </>
  );
};

export default Main_Page;
