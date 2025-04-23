import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Layout } from 'antd';
import { Link } from 'react-router-dom';
import '../../main.scss';
const { Footer } = Layout;
const Foot = () => {
    return (_jsxs(Footer, Object.assign({ className: "footer" }, { children: [_jsx(Link, Object.assign({ className: "footer-link", to: "/privacy-policy" }, { children: "Privacy Policy" })), _jsx(Link, Object.assign({ className: "footer-link", to: "/support" }, { children: "Support" })), _jsx(Link, Object.assign({ className: "footer-link", to: "/contact" }, { children: "Contact us" })), _jsx("span", Object.assign({ className: "footer-link" }, { children: "\u00A9 2025 BalaSteps" }))] })));
};
export default Foot;
//# sourceMappingURL=footer.js.map