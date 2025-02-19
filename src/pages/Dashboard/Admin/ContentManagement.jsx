import { Link } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useRole from "../../../hooks/useRole";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

function ContentManagement() {
  const [filter, setFilter] = useState("");
  const axiosSecure = useAxiosSecure();
  const { role } = useRole();

  const { data: blogs = [], refetch } = useQuery({
    queryKey: ["blogs", filter],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/blogs`, {
        params: { status: filter },
      });
      return data;
    },
  });

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axiosSecure.patch(`/blogs/${id}`, { status: newStatus });
      toast.success(`Blog status updated to ${newStatus}`);
      refetch();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update blog status.");
    }
  };

  const handleDeleteBlog = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/blog/${id}`);
          toast.success("Blog deleted successfully!");
          refetch();
        } catch (error) {
          console.log(error);
          toast.error("Failed to delete blog.");
        }
      }
    });
  };

  return (
    <div>
      <div className="flex justify-end mt-8 px-4">
        <Link to="add-blog" className="btn bg-blood text-white text-2xl btn-lg">
          Add Blog
        </Link>
      </div>
      <div>
        {(role === "admin" || role === "volunteer") && (
          <>
            <div className="mb-4 flex items-center gap-4">
              <label htmlFor="filter" className="font-medium">
                Filter by Status:
              </label>
              <select
                id="filter"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="select select-bordered"
              >
                <option value="">All</option>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {blogs.map((blog) => (
                <div key={blog._id} className="card shadow-lg p-4">
                  <img
                    src={blog.thumbnail}
                    alt={blog.title}
                    className="w-full h-40 object-cover mb-4"
                  />
                  <h3 className="text-lg font-bold mb-2">{blog.title}</h3>
                  <p className="mb-4 text-sm">
                    {blog.content.substring(0, 100)}...
                  </p>
                  <div className="flex justify-between items-center flex-wrap gap-3">
                    <span className="badge badge-info capitalize">
                      {blog.status}
                    </span>
                    <div className="flex gap-2 flex-wrap">
                      {blog.status === "draft" && role === "admin" && (
                        <button
                          onClick={() =>
                            handleStatusChange(blog._id, "published")
                          }
                          className="btn btn-sm bg-lightGreen text-white"
                        >
                          Publish
                        </button>
                      )}
                      {blog.status === "published" && (
                        <button
                          onClick={() => handleStatusChange(blog._id, "draft")}
                          className="btn btn-sm btn-warning text-white"
                        >
                          Unpublish
                        </button>
                      )}
                      {role === "admin" && (
                        <button
                          onClick={() => handleDeleteBlog(blog._id)}
                          className="btn btn-sm btn-error text-white"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ContentManagement;
