import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addBlog, updateBlog, deleteBlog, fetchBlogs } from '../../features/blog/blogSlice'; // Adjust the import path as needed

interface PopUpModalProps {
    setOpen: Function;
    selectedBlog?: any;
    modalMode?: 'add' | 'edit' | 'delete' | 'view';
    onDelete?: (id: string) => void; 
    isAdding?:boolean
}

const PopUpModal: React.FC<PopUpModalProps> = ({ setOpen, selectedBlog, modalMode }: any) => {
    const dispatch = useDispatch();

    const formik: any = useFormik({
        initialValues: {
            title: selectedBlog?.title || '',
            content: selectedBlog?.content || '',
        },
        validationSchema: Yup.object({
            title: Yup.string()
                .max(100, 'Must be 100 characters or less')
                .required('Title is required'),
            content: Yup.string()
                .required('Content is required'),
        }),
        onSubmit: async (values) => {
            try {
                if (modalMode === 'edit') {
                    await dispatch(updateBlog({ ...values, id: selectedBlog!._id })).unwrap();
                } else if (modalMode === 'add') {
                    await dispatch(addBlog(values)).unwrap();
                }
                setOpen(false); 
                dispatch(fetchBlogs());
            } catch (error) {
                console.error(`Failed to ${modalMode} blog:`, error);
                setOpen(false); // Close
            }
        },
    });

    const handleDelete = async () => {
        if (selectedBlog) {
            try {
                await dispatch(deleteBlog(selectedBlog._id)).unwrap(); // Dispatch delete action
                setOpen(false); // Close modal after deletion
                dispatch(fetchBlogs());
            } catch (error) {
                console.error(`Failed to delete blog:`, error);
            }
        }
    };

    return (
        <div
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-[80] pointer-events-auto"
            role="dialog"
            aria-labelledby="hs-basic-modal-label"
            aria-modal="true"
        >
            <div className="sm:max-w-lg sm:w-full m-3">
                <div className="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
                    <div className="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
                        <h3 id="hs-basic-modal-label" className="font-bold text-gray-800 dark:text-white">
                            {modalMode === 'edit' ? "Edit Blog" : modalMode === 'delete' ? "Confirm Delete" : "Add Blog"}
                        </h3>
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none dark:bg-neutral-700 dark:hover:bg-neutral-600"
                            aria-label="Close"
                        >
                            <span className="sr-only">Close</span>
                            <svg
                                className="shrink-0 size-4"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M18 6L6 18"></path>
                                <path d="M6 6L18 18"></path>
                            </svg>
                        </button>
                    </div>
                    <div className="p-4 overflow-y-auto">
                        {modalMode === 'delete' ? (
                            <div className="text-center">
                                <p>Are you sure you want to delete this blog?</p>
                                <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-neutral-700">
                                    <button
                                        type="button"
                                        onClick={() => setOpen(false)}
                                        className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 text-white bg-gradient-to-br from-red-400 to-red-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-200 dark:focus:ring-red-800"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleDelete} // Dispatch delete action
                                        className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={formik.handleSubmit}>
                                <div>
                                    <label className="text-left block text-gray-700">Title</label>
                                    <input
                                        type="text"
                                        className={`border rounded w-full p-2 ${formik.touched.title && formik.errors.title ? 'border-red-500' : ''}`}
                                        {...formik.getFieldProps('title')}
                                        disabled={modalMode === 'view'}
                                    />
                                    {formik.touched.title && formik.errors.title ? (
                                        <div className="text-red-500 text-sm">{formik.errors.title}</div>
                                    ) : null}
                                </div>
                                <div className="mt-2">
                                    <label className="text-left block text-gray-700">Content</label>
                                    <textarea
                                        className={`border rounded w-full p-2 ${formik.touched.content && formik.errors.content ? 'border-red-500' : ''}`}
                                        rows={4}
                                        {...formik.getFieldProps('content')}
                                        disabled={modalMode === 'view'}
                                    ></textarea>
                                    {formik.touched.content && formik.errors.content ? (
                                        <div className="text-red-500 text-sm">{formik.errors.content}</div>
                                    ) : null}
                                </div>
                                <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-neutral-700">
                                    <button
                                        type="button"
                                        onClick={() => setOpen(false)}
                                        className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
                                    >
                                        Close
                                    </button>
                                    {modalMode !== 'view' && (
                                        <button
                                            type="submit"
                                            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                                        >
                                            {modalMode === 'edit' ? "Save changes" : "Add Blog"}
                                        </button>
                                    )}
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopUpModal;
