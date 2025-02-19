import { Helmet } from 'react-helmet-async'
import Banner from './Banner'
import FeaturedSection from './FeaturedSection'
import ContactUs from './ContactUs'
import LandingPage from './LandingPage'
import AboutUs from './AboutUs'
import FAQSection from './FAQ'
import BlogNewsSection from './BlogNews'

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
        <BlogNewsSection />
        <LandingPage />
        <FAQSection />
        <ContactUs />
      </div>
    </>
  )
}

export default Home
