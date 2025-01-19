import { Link } from 'react-router-dom'
import banner from '../../assets/images/hero.png'

function Banner() {
    return (
        <div
            className="hero min-h-[70vh] bg-cover bg-center bg-no-repeat bg-gray-950/75 bg-blend-overlay rounded-xl"
            style={{
                backgroundImage: `url(${banner})`,
            }}>

            <div className="hero-content text-neutral-content text-center">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold text-blood">BloodFlow</h1>
                    <p className="mb-8">
                        {/* Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi. */}
                    </p>
                    <Link to='/' className="btn btn-ghost outline outline-2 text-lg text-green-400 sm:mr-4 mb-4 sm:mb-0">Join As a Donor</Link>
                    <Link to='/' className="btn btn-ghost outline outline-2 text-lg text-blood">Search Donors</Link>
                </div>
            </div>
        </div>
    )
}

export default Banner
