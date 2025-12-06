import React, { useState, useEffect } from 'react';
import '../styles/addblog.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddBlog = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState({
        title: "",
        description: "",
        category: ""
    });
    const [file, setFile] = useState(null);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchAllCategories = async () => {
            try {
                const res = await axios.get(
                    "https://localhost:9000/api/v1/get/categories",
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );
                setCategories(res.data);
            } catch (err) {
                console.error("Error fetching categories:", err);
            }
        };
        fetchAllCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formdata = new FormData();
        formdata.append("title", input.title);
        formdata.append("category", input.category);
        formdata.append("description", input.description);
        if (file) formdata.append("thumbnail", file);

        try {
            const res = await axios.post(
                "https://localhost:9000/api/v1/add/blog",
                formdata,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            alert(res.data.message);
            navigate("/");
        } catch (error) {
            console.error("Axios Error:", error.response?.data || error.message);
            alert(error.response?.data?.message || "Something went wrong!");
        }
    };

    return (
        <div className="add-blog-page">
            <form onSubmit={handleSubmit}>
                <h2>Add Blog</h2>

                <div className="input-container">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={input.title}
                        onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                        placeholder="Enter blog title"
                        required
                    />
                </div>

                <div className="input-container">
                    <label htmlFor="category">Category</label>
                    <select
                        className='form-control'
                        name="category"
                        id='category'
                        value={input.category}
                        onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                        required
                    >
                        <option value="" disabled>Select category</option>
                        {categories.map((item) => (
                            <option key={item._id} value={item._id}>
                                {item.title}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="input-container">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={input.description}
                        onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                        placeholder="Enter blog description"
                        required
                    ></textarea>
                </div>

                <div className="input-container">
                    <label htmlFor="thumbnail">Thumbnail:</label>
                    <input
                        type="file"
                        id="thumbnail"
                        name="thumbnail"
                        onChange={(e) => setFile(e.target.files[0])}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary">Add Blog</button>
            </form>
        </div>
    );
};

export default AddBlog;
