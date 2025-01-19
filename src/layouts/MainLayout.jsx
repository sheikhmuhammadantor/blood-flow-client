import { Outlet } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <div className='pt-24 min-h-[calc(100vh-68px)] max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4'>
        <Outlet />
      </div>
      {/* <Footer /> */}
    </div>
  )
}

export default MainLayout
