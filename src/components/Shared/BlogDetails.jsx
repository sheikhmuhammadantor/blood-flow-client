import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";

function BlogDetails() {

    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    const [blog, setBlog] = useState({});
    console.log(id);

    useEffect(() => {
        const fetchingBlogData = async () => {
            try {
                const res = await axiosPublic(`/blogs/${id}`);
                setBlog(res.data);
            } catch (error) {
                console.error("Error fetching blog data:", error);
            }
        }
        fetchingBlogData();
    }, []);

    return (
        <div className="container mx-auto px-4 my-8">
            <div className="bg-white shadow-md rounded-lg overflow-hidden mx-auto w-full max-w-[800px]">
                {blog.thumbnail && (
                    <img
                        src={blog.thumbnail}
                        alt={blog.title}
                        className="w-full h-96 object-cover"
                    />
                )}
                <div className="p-4">
                    <h3 className="text-3xl font-semibold text-red-600">
                        {blog.title}
                    </h3>
                    <div dangerouslySetInnerHTML={{ __html: blog.content }} className="text-gray-600 mt-2"></div>
                </div>
            </div>
        </div>
    )
}

export default BlogDetails;
