import ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NotificationContextProvider } from './NotificationContex';
import { UserContextProvider } from './UserContext';
import './index.css';
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
    <UserContextProvider>
        <NotificationContextProvider>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </NotificationContextProvider>
    </UserContextProvider>,
);
