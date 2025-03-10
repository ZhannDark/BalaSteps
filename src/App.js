import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import './styles.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SymptomTracker from './main_panel/symptom_tracker/symptom_tracker';
import InfoHub from './main_panel/info_hub/information_hub';
const App = () => {
    return (_jsx(Router, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(_Fragment, { children: _jsx(SymptomTracker, {}) }) }), _jsx(Route, { path: "/symptom-tracker", element: _jsx(SymptomTracker, {}) }), _jsx(Route, { path: "/information-hub", element: _jsx(InfoHub, {}) })] }) }));
};
export default App;
//# sourceMappingURL=App.js.map