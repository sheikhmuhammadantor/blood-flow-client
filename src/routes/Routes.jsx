import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home/Home'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/auth/Login'
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
import DonationRequestDetails from '../pages/Dashboard/Pages/DonationDetaiols'
import DonationRequestEdit from '../pages/Dashboard/Pages/DonationRequestEdit'
import SearchPage from '../pages/public/SearchDonor'
import BloodDonationRequests from '../pages/public/DonationRequest'
import FundingPage from '../pages/Funding/Funding'
import MyDonationRequests from '../pages/Dashboard/Pages/MyAllDonationRequest'
import AllDonationRequests from '../pages/Dashboard/Pages/AllDonationRequest'
import AllUsers from '../pages/Dashboard/Admin/AllUser'
import AddBlog from '../pages/Dashboard/Admin/AddBlog'
import AdminRoute from './AdminRoute'
import VolunteerRoute from './VolunteerRoute'
import ContentManagement from '../pages/Dashboard/Admin/ContentManagement'

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
        path: '/blogs/:id',
        element: <BlogDetails />,
      },
      {
        path: '/search-donor',
        element: <SearchPage />,
      },
      {
        path: '/funding',
        element: <FundingPage />,
      },
      {
        path: '/donation-requests',
        element: <BloodDonationRequests />,
      },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <RegistrationForm /> },
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
        path: 'my-donation-requests',
        element: (
          <PrivateRoute>
            <MyDonationRequests />
          </PrivateRoute>
        ),
      },
      {
        path: 'all-blood-donation-request',
        element: (
          <PrivateRoute>
            <VolunteerRoute>
              <AllDonationRequests />
            </VolunteerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'donation-request/:id',
        element: (
          <PrivateRoute>
            <DonationRequestDetails />
          </PrivateRoute>
        ),
      },
      {
        path: 'edit-donation-request/:id',
        element: (
          <PrivateRoute>
            <DonationRequestEdit />
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
        path: 'content-management',
        element: (
          <PrivateRoute>
            <VolunteerRoute>
              <ContentManagement />
            </VolunteerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'content-management/add-blog',
        element: (
          <PrivateRoute>
            <VolunteerRoute>
              <AddBlog />
            </VolunteerRoute>
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
      },
      {
        path: 'all-users',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AllUsers />
            </AdminRoute>
          </PrivateRoute>
        ),
      }
    ],
  },
])
