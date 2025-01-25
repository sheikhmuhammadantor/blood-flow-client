import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import JoditEditor from "jodit-react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useRole from "../../../hooks/useRole";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [content, setContent] = useState("");
  const [filter, setFilter] = useState("");
  const axiosPublic = useAxiosPublic();
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

  const createBlogMutation = useMutation({
    mutationFn: async (blogData) => {
      console.log("Sending blog data:", blogData);
      const response = await axiosSecure.post(`/blogs`, blogData);
      console.log("Response from server:", response.data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Blog created successfully!");
      refetch();
      setTitle("");
      setThumbnail(null);
      setContent("");
    },
    onError: (err) => {
      console.error("Error details:", err);
      toast.error(err?.response?.data?.message || "Failed to create blog.");
    },
  });



  const handleThumbnailUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const { data } = await axiosPublic.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOSTING_KEY}`,
        formData
      );
      setThumbnail(data.data.url);
      toast.success("Thumbnail uploaded successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to upload thumbnail.");
    }
  };

  const handleCreateBlog = (e) => {
    e.preventDefault();
    if (!title || !content) {
      return toast.error("Please fill out all fields.");
    }
    createBlogMutation.mutate({ title, thumbnail, content });
  };

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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Add Blog</h1>

      <form className="mb-8" onSubmit={handleCreateBlog}>
        <div className="form-control mb-4">
          <label className="label font-medium">Title</label>
          <input
            type="text"
            placeholder="Enter blog title"
            className="input input-bordered"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-control mb-4">
          <label className="label font-medium">Thumbnail Image</label>
          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered"
            onChange={handleThumbnailUpload}
          />
        </div>

        <div className="form-control mb-4">
          <label className="label font-medium">Content</label>
          <JoditEditor value={content} onChange={setContent} />
        </div>

        <button type="submit" className="btn bg-blood text-white">
          Create Blog
        </button>
      </form>

      <div className="divider before:bg-blood after:bg-blood text-xl font-bold my-12">All Blogs</div>

      {(role === 'admin' || role === 'volunteer') &&
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
                <img src={blog.thumbnail} alt={blog.title} className="w-full h-40 object-cover mb-4" />
                <h3 className="text-lg font-bold mb-2">{blog.title}</h3>
                <p className="mb-4 text-sm">{blog.content.substring(0, 100)}...</p>
                <div className="flex justify-between items-center flex-wrap gap-3">
                  <span className="badge badge-info capitalize">{blog.status}</span>
                  <div className="flex gap-2 flex-wrap">
                    {(blog.status === "draft" && role === 'admin') && (
                      <button
                        onClick={() => handleStatusChange(blog._id, "published")}
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
                    {
                      role === 'admin' && (
                        <button
                          onClick={() => handleDeleteBlog(blog._id)}
                          className="btn btn-sm btn-error text-white"
                        >
                          Delete
                        </button>
                      )
                    }
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      }
    </div>
  );
};

export default AddBlog;
