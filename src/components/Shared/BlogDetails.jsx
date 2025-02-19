import { useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";

function BlogDetails() {

    const { id } = useParams();
    const axiosPublic = useAxiosPublic();

    const { data: blog, error, isLoading } = useQuery({
        queryKey: ['blog', id],
        queryFn: async () => {
            const res = await axiosPublic(`/blogs/${id}`);
            return res.data;
        }
    });

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <ErrorMessage message="Error fetching blog data" />;
    }

    return (
        <div className="container mx-auto px-4 my-8">
            <div className="bg-base-300 shadow-md rounded-lg overflow-hidden mx-auto w-full max-w-[800px]">
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
                    <div dangerouslySetInnerHTML={{ __html: blog.content }} className="text-base-content mt-2"></div>
                </div>
            </div>
        </div>
    )
}

export default BlogDetails;
