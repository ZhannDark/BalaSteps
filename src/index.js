import { jsx as _jsx } from "react/jsx-runtime";
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.scss';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient();
root.render(_jsx(QueryClientProvider, { client: queryClient, children: _jsx(App, {}) }));
