import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Title from 'antd/es/typography/Title';
import './main.scss';
import { useNavigate } from 'react-router-dom';
import photo1 from '../../images/main_content/main2.png';
import photo2 from '../../images/main_content/main1.png';
import { Button } from 'antd';
const MainContent = () => {
    const navigate = useNavigate();
    return (_jsxs("div", Object.assign({ className: "main" }, { children: [_jsxs(Title, Object.assign({ className: "main-title" }, { children: ["Your Step-by-Step Guide to ", _jsx("br", {}), " Support Your Special Child."] })), _jsx(Button, Object.assign({ className: "get-started-btn", onClick: () => navigate('/register') }, { children: "Get Started" })), _jsxs("div", Object.assign({ className: "images-container" }, { children: [_jsx("img", { src: photo1, alt: "Photo1", className: "content-image" }), _jsx("img", { src: photo2, alt: "Photo2", className: "content-image" })] }))] })));
};
export default MainContent;
//# sourceMappingURL=main.js.map