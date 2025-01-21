import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home/Home'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/auth/Login'
// import SignUp from '../pages/SignUp/SignUp'
import MainLayout from '../layouts/MainLayout'
import PrivateRoute from './PrivateRoute'
import DashboardLayout from '../layouts/DashboardLayout'
import ContactUs from '../pages/Home/ContactUs'
import FeaturedSection from '../pages/Home/FeaturedSection'
import BlogPage from '../pages/public/Blog'
import BlogDetails from '../components/Shared/BlogDetails'
import RegistrationForm from '../pages/auth/RegistrationForm'
import CreateDonationRequest from '../pages/Dashboard/Pages/CreateDonationRequest'
import ProfilePage from '../pages/Dashboard/Pages/Profile'
import DashboardHome from '../pages/Dashboard/Pages/DashboardHome'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/about-us',
        element: <FeaturedSection />,
      },
      {
        path: '/contact-us',
        element: <ContactUs />,
      },
      {
        path: '/blogs',
        element: <BlogPage />,
      },
      {
        path: '/blogs/:blogTheme',
        element: <BlogDetails />,
      }
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <RegistrationForm /> },
  // { path: '/signup', element: <SignUp /> },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <DashboardHome />
          </PrivateRoute>
        ),
      },
      {
        path: 'create-donation-request',
        element: (
          <PrivateRoute>
            <CreateDonationRequest />
          </PrivateRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        ),
      }
    ],
  },
])
