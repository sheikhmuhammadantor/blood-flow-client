import { Link } from "react-router-dom"

function ContentManagement() {
    return (
        <div>
            <div className="flex justify-end mt-8 px-4">
                <Link to="add-blog" className="btn bg-blood text-white text-2xl btn-lg">Add Blog</Link>
            </div>
            
        </div>
    )
}

export default ContentManagement
