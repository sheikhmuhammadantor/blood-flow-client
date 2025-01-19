import { Link } from "react-router-dom";

const BlogPage = () => {
  const blogs = [
    {
      id: 1,
      title: "The Importance of Blood Donation",
      description:
        "Learn how donating blood can save lives and support your community. It's more than just a donation; it's a gift of life.",
      image: "https://via.placeholder.com/400",
      link: "/blogs/blood-donation-importance",
    },
    {
      id: 2,
      title: "Who Can Donate Blood?",
      description:
        "Discover the eligibility criteria for blood donation and how you can prepare for your first donation experience.",
      image: "https://via.placeholder.com/400",
      link: "/blogs/who-can-donate",
    },
    {
      id: 3,
      title: "How BloodFlow Simplifies Blood Donations",
      description:
        "Explore how BloodFlow connects donors with recipients and makes the donation process easier for everyone.",
      image: "https://via.placeholder.com/400",
      link: "how-bloodflow-works",
    },
  ];

  return (
    <div className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-red-600 mb-4">
          Our Blog
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Stay informed and learn more about the importance of blood donation.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              {blog.image && (
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-40 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="text-xl font-semibold text-red-600">
                  {blog.title}
                </h3>
                <p className="text-gray-600 mt-2">{blog.description}</p>
                <Link
                  to={blog.link}
                  className="inline-block mt-4 text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
