import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const BlogPage = () => {

  const [blogs, setBlogs] = useState([]);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchingBlogData = async () => {
      try {
        const res = await axiosPublic("/blogs-published");
        setBlogs(res.data);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };
    fetchingBlogData();
  }, []);

  return (
    <div className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-red-600 mb-4">
          Our Blog
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Stay informed and learn more about the importance of blood donation.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow mx-auto w-full max-w-[400px]"
            >
              {blog.thumbnail && (
                <img
                  src={blog.thumbnail}
                  alt={blog.title}
                  className="w-full h-52 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="text-2xl font-semibold text-red-600">
                  {blog.title}
                </h3>
                <div dangerouslySetInnerHTML={{ __html: blog.content.substring(0, 100) + "..." }} className="text-gray-600 mt-2"></div>
                <Link
                  to={blog?._id}
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
