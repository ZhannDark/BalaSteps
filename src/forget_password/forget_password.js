var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Form, Input, Button } from 'antd';
import 'antd/dist/reset.css';
import './forget-password.scss';
import AppHeader from '../main/header/header';
const ForgotPassword = () => {
    const [loading, setLoading] = useState(false);
    const onFinish = () => __awaiter(void 0, void 0, void 0, function* () {
        setLoading(true);
    });
    return (_jsxs(_Fragment, { children: [_jsx(AppHeader, {}), _jsx("div", Object.assign({ className: "forgot-password-container" }, { children: _jsxs("div", Object.assign({ className: "forgot-password-form-container" }, { children: [_jsx("h2", Object.assign({ className: "forgot-password-title" }, { children: "Forgot password" })), _jsx("p", Object.assign({ className: "forgot-password-text" }, { children: "Lost your password? Please enter your email address. You will receive a link to create a new password via email." })), _jsxs(Form, Object.assign({ layout: "vertical", className: "forgot-password-form", onFinish: onFinish }, { children: [_jsx(Form.Item, Object.assign({ label: "Phone number:", name: "phone_number", rules: [
                                        {
                                            required: true,
                                            type: 'number',
                                            message: 'Please enter a valid phone number',
                                        },
                                    ] }, { children: _jsx(Input, { className: "forgot-password-input", type: "email", placeholder: "Enter phone number" }) })), _jsx(Form.Item, { children: _jsx(Button, Object.assign({ type: "primary", htmlType: "submit", loading: loading, className: "forgot-password-button" }, { children: "Reset password" })) })] }))] })) }))] }));
};
export default ForgotPassword;
//# sourceMappingURL=forget_password.js.map