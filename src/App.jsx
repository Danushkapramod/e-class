import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import AppLayout from './pages/AppLayout';
import { ClassRoutes } from './routes/ClassRoutes';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { store } from './store';
import { Provider } from 'react-redux';
import { TeachersRoutes } from './routes/TeacherRoutes';
import { OptionRoutes } from './routes/OptionRoutes';
import AccountInformation from './user/AccountInformation';
import Dashbord from './dashboard/Dashbord';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './authentication/ProtectedRoute';
import SignupPage from './pages/SignupPage';
import RecoveryPasswordPage from './pages/RecoveryPasswordPage';
import { Toaster } from 'react-hot-toast';
import ResetPasswordPage from './pages/ResetPasswordPage';
import { queryClient } from './queryClient';
import VerifyAccount from './pages/VerifyAccount';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navigate to="app/dashbord" replace={true} />,
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'signup',
      element: <SignupPage />,
    },
    {
      path: 'verify-email',
      element: <VerifyAccount />,
    },
    {
      path: 'forgot-password',
      element: <RecoveryPasswordPage />,
    },
    {
      path: 'reset-password',
      element: <ResetPasswordPage />,
    },

    {
      path: '/app',
      element: (
        <ProtectedRoute>
          <AppLayout />
        </ProtectedRoute>
      ),
      children: [
        ClassRoutes,
        TeachersRoutes,
        OptionRoutes,
        {
          path: 'account/me',
          element: <AccountInformation />,
        },
        {
          path: 'dashbord',
          element: <Dashbord />,
        },
        {
          index: true,
          element: <Navigate to="dashbord" replace={true} />,
        },
      ],
    },
  ]);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-right" reverseOrder={false} />
        <ReactQueryDevtools initialIsOpen={false} />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
