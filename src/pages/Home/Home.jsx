import { Helmet } from 'react-helmet-async'
import Banner from './Banner'
import FeaturedSection from './FeaturedSection'
import ContactUs from './ContactUs'
import AboutUs from './AboutUs'
import FAQSection from './FAQ'
import BlogNewsSection from './BlogNews'
import DonationProcess from './DonationProcess'
import EligibilityCriteria from './EligibilityCriteria'
import JoinAsVolunteer from './JoniAsVolunteer'

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
        <DonationProcess />
        <EligibilityCriteria />
        <BlogNewsSection />
        <JoinAsVolunteer />
        <FAQSection />
        <ContactUs />
      </div>
    </>
  )
}

export default Home
