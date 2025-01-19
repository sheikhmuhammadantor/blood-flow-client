import { Helmet } from 'react-helmet-async'
// import Plants from '../../components/Home/Plants'
// import logo from '../../assets/images/logo.png'

const Home = () => {
  return (
    <div className=''>
      <Helmet>
        <title>BloodFlow | Every Drop Counts, Every Life Thrives</title>
      </Helmet>
      {/* <Plants /> */}
      <div>
        {/* <img src={logo} alt="" /> */}
       <p className='bg-blood'>this is home</p>
      </div>
    </div>
  )
}

export default Home
