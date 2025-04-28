import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import Main_Header from '../main_page_header/main_page_header';
import MainContent from './main_page_main/main_page_main';
import Main_page_news from './main_page_news/main_page_news';
import Header_buttons from './features/main_page_features';
import Footer_Content from './footer/footer/footer';
const Main_Page = () => {
    return (_jsxs(_Fragment, { children: [_jsx(Main_Header, {}), _jsx(MainContent, {}), _jsx(Main_page_news, {}), _jsx(Header_buttons, {}), _jsx(Footer_Content, {})] }));
};
export default Main_Page;
