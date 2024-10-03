import { useEffect, useState } from "react";
import { MdModeEdit, MdOutlineRemoveRedEye, MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../../src/features/blog/blogSlice"; // Adjust the import path as needed
import PopUpModal from "./popup/popupModal";

const BlogGrid = () => {
    const dispatch = useDispatch();
    const { blogs, loading } = useSelector((state: any) => state.blogs); // Get blogs and loading state from Redux
    const [isOpen, setOpen] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState<any>(null);
    const [modalMode, setModalMode] = useState<'view' | 'edit' | 'delete'>('view');

    useEffect(() => {
        dispatch(fetchBlogs());
    }, [dispatch,isOpen]);

    const handleEdit = (blog: any) => {
        setSelectedBlog(blog);
        setModalMode('edit');
        setOpen(true);
    };

    const handleDelete = (blog: any) => {
        setSelectedBlog(blog);
        setModalMode('delete');
        setOpen(true);
    };

    const handleView = (blog: any) => {
        setSelectedBlog(blog);
        setModalMode('view');
        setOpen(true);
    };

    const onDelete = (id: string) => {
        console.log("Deleting blog with id:", id);
        setOpen(false);
    };


    return (
        <>
            <div>
                {loading ? (
                    <p>Loading...</p> 
                ) : (
                    blogs?.articles && blogs.articles.length > 0 ? (
                        blogs.articles.map((blog: any) => (
                            <a key={blog.id} href="#" className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                                <div className="flex flex-col justify-between p-4 leading-normal">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{blog.title}</h5>
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{blog.content}</p>
                                    <div className="flex justify-end">
                                        <MdModeEdit size={25} color="green" onClick={() => handleEdit(blog)} />
                                        <MdDelete size={25} color="red" onClick={() => handleDelete(blog)} />
                                        <MdOutlineRemoveRedEye color="skyblue" size={25} onClick={() => handleView(blog)} />
                                    </div>
                                </div>
                            </a>
                        ))
                    ) : (
                        <p>No blogs available</p>
                    )
                )}
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
