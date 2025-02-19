import { FaNewspaper } from "react-icons/fa";
import { Link } from "react-router-dom";

const BlogNewsSection = () => {
    const blogs = [
        {
            id: '6793735ed2a627b06c9796cc',
            title: "Stories of Lives Saved Through Blood Donations",
            date: "February 18, 2025",
            description: "Behind every blood donation lies a powerful story of hope, survival, and gratitude. Take, for example, the story of a young child undergoing... ",
        },
        {
            id: '67937348d2a627b06c9796cb',
            title: "How Regular Blood Donations Benefit Donors?",
            date: "February 10, 2025",
            description: "While donating blood is often associated with saving the lives of others, it offers surprising health benefits for the donor as well. Regular blood...",
        },
        {
            id: '679371ead2a627b06c9796c6',
            title: "The Science Behind Blood Donation",
            date: "February 5, 2025",
            description: "Blood donation is a fascinating and life-saving process that begins with the generous act of a donor rolling up their sleeve. But what happens after...",
        },
    ];

    return (
        <div className="bg-gray-100 flex flex-col items-center py-6 px-4 rounded-xl shadow-lg my-12">
            <div className="container mx-auto max-w-3xl">
                <div className="text-center">
                    <FaNewspaper className="text-blood text-5xl mb-4" />
                    <h2 className="text-3xl font-bold text-gray-800">Latest Blog & News</h2>
                    <p className="mt-2 text-lg text-gray-600">Stay updated with the latest news and insights on blood donation.</p>
                </div>
                <div className="mt-8 space-y-6">
                    {blogs.map((blog, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                            <h3 className="text-2xl font-semibold text-gray-800">{blog.title}</h3>
                            <p className="text-sm text-gray-500 mt-1">{blog.date}</p>
                            <p className="text-lg text-gray-600 mt-2">{blog.description}</p>
                            <Link to={`/blogs/${blog.id}`} className="btn bg-blood text-white mt-4">Read More</Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogNewsSection;
