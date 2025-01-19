import { Helmet } from 'react-helmet-async'
import Banner from './Banner'
import FeaturedSection from './FeaturedSection'

const Home = () => {
  return (
    <>
      <Helmet>
        <title>BloodFlow | Every Drop Counts, Every Life Thrives</title>
      </Helmet>
      <div>
        <Banner />
        <FeaturedSection />
      </div>
    </>
  )
}

export default Home
