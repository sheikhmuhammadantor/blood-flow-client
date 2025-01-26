import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

function ErrorPage() {
    return (
        <div className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
            <Helmet>
                <title>Oops | Error Happen</title>
            </Helmet>
            <h1 className="text-9xl font-extrabold text-[#ff0000] tracking-widest">404</h1>
            <div className="bg-[#16ac16] px-2 text-sm rounded rotate-12 absolute text-white">
                Page Not Found
            </div>
            <button className="mt-5">
                <Link to="/" className="relative inline-block text-sm font-medium text-[#ff0000] group active:text-[#ff0000] focus:outline-none focus:ring">
                    <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#ff0000] group-hover:translate-y-0 group-hover:translate-x-0"></span>
                    <span className="relative block px-8 py-3 bg-[#1A2238] border border-current">
                        <p>Go Home</p>
                    </span>
                </Link>
            </button>
        </div>
    )
}

export default ErrorPage
