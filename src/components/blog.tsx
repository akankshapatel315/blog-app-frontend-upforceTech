import { useSelector } from "react-redux";
import BlogGrid from "./blogGrid"
import Header from "./header"
import { RootState } from "../store";
import { useState } from "react";
import PopUpModal from "./popup/popupModal";



const Blog = () => {
    const user = useSelector((state: RootState) => state.user.user);
    const [selectedBlog, setSelectedBlog] = useState<any>(null);
    const [isAdding, setIsAdding] = useState(false); // State to determine if adding a blog
    const [isOpen, setOpen] = useState(false);

    const handleAddBlog = () => {
        setSelectedBlog(null); // Clear selected blog
        setIsAdding(true); // Set to add mode
        setOpen(true); // Open modal
    };
    return (
        <><Header />
            <div className="flex justify-start"> {/* Adjust this container */}
                <button
                 onClick={handleAddBlog} 
                    type="button"
                    className="text-left text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                    Add Blog
                </button>
            </div>

            <BlogGrid />
               {isOpen && <PopUpModal setOpen={setOpen} selectedBlog={selectedBlog} isAdding={isAdding} />} 
            </>
    )
}

export default Blog