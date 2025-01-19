import { Helmet } from 'react-helmet-async'
// import Plants from '../../components/Home/Plants'
import logo from '../../assets/images/logo.png'

const Home = () => {
  return (
    <div className='bg-black'>
      <Helmet>
        <title> PlantNet | Buy Your Desired Plant</title>
      </Helmet>
      {/* <Plants /> */}
      <div>
        <img src={logo} alt="" />
      </div>
    </div>
  )
}

export default Home
