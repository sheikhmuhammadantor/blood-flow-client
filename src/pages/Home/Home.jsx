import { Helmet } from 'react-helmet-async'
import AboutUs from './AboutUs'
import Banner from './Banner'
import BlogNewsSection from './BlogNews'
import ContactUs from './ContactUs'
import FAQSection from './FAQ'
import FeaturedSection from './FeaturedSection'
// import DonationProcess from './DonationProcess'
// import EligibilityCriteria from './EligibilityCriteria'
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
        {/* <DonationProcess /> */}
        {/* <EligibilityCriteria /> */}
        <BlogNewsSection />
        <JoinAsVolunteer />
        <FAQSection />
        <ContactUs />
      </div>
    </>
  )
}

export default Home
