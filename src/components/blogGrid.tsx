import { useState } from "react";
import { MdModeEdit, MdOutlineRemoveRedEye, MdDelete } from "react-icons/md";
import PopUpModal from "./popup/popupModal";

const BlogGrid = () => {
    const [isOpen, setOpen] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState<any>(null);
    const [modalMode, setModalMode] = useState<'view' | 'edit' | 'delete'>('view');

    const blogData = {
        title: "Noteworthy technology acquisitions 2021",
        content: "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order."
    };

    const handleEdit = () => {
        setSelectedBlog(blogData);
        setModalMode('edit');
        setOpen(true);
    };

    const handleDelete = () => {
        setSelectedBlog(blogData);
        setModalMode('delete');
        setOpen(true);
    };

    const handleView = () => {
        setSelectedBlog(blogData);
        setModalMode('view');
        setOpen(true);
    };

    const onDelete = () => {
        // Implement your delete logic here, e.g., call an API to delete the blog post
        console.log("Deleting blog:", selectedBlog);
        setOpen(false); // Close modal after delete
    };

    return (
        <>
            <div>
                <a href="#" className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <div className="flex flex-col justify-between p-4 leading-normal">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{blogData.title}</h5>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{blogData.content}</p>
                        <div className="flex justify-end">
                            <MdModeEdit size={25} color="green" onClick={handleEdit} />
                            <MdDelete size={25} color="red" onClick={handleDelete} />
                            <MdOutlineRemoveRedEye color="skyblue" size={25} onClick={handleView} />
                        </div>
                    </div>
                </a>
            </div>
            {isOpen && (
                <PopUpModal 
                    setOpen={setOpen} 
                    selectedBlog={selectedBlog} 
                    modalMode={modalMode} 
                    onDelete={onDelete} 
                />
            )}
        </>
    );
};

export default BlogGrid;
