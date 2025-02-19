import { Helmet } from 'react-helmet-async'
import Banner from './Banner'
import FeaturedSection from './FeaturedSection'
import ContactUs from './ContactUs'
import LandingPage from './LandingPage'
import AboutUs from './AboutUs'

const Home = () => {
  return (
    <>
      <Helmet>
        <title>BloodFlow | Every Drop Counts, Every Life Thrives</title>
      </Helmet>
      <div>
        <Banner />
        <FeaturedSection />
        <AboutUs />
        <br />
        <LandingPage />
        <ContactUs />
      </div>
    </>
  )
}

export default Home
