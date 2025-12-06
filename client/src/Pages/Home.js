import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/home.css";
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    const [blogs, setBlogs] = useState([]);
    const userId = localStorage.getItem("userId"); // stored at login

    useEffect(() => {
        fetchBlogs();
    }, []);

    // Fetch all blogs
    const fetchBlogs = async () => {
        try {
            const res = await axios.get("http://localhost:9000/api/v1/get/allblogs", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            setBlogs(res.data.fetchAllBlogs || []);
        } catch (error) {
            console.error("Error fetching blogs:", error);
        }
    };

    // LIKE/UNLIKE FUNCTION
    const handleLike = async (id) => {
        try {
            const res = await axios.post(
                `http://localhost:9000/api/v1/like/${id}`,
                {},
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                }
            );

            // Update UI immediately without reloading
            setBlogs((prevBlogs) =>
                prevBlogs.map((blog) =>
                    blog._id === id
                        ? { ...blog, likes: res.data.likes } // update likes array
                        : blog
                )
            );
        } catch (err) {
            console.error("Error liking/unliking post:", err.response?.data || err.message);
        }
    };

    return (
        <>
            <main className="my-5">
                <div className="container shadow-lg p-4">
                    <section className="text-center">
                        <h2 className="mb-5 my-3 fw-bold text-white bg-primary">Latest Posts</h2>

                        <div className="row g-4">
                            {blogs.length > 0 ? (
                                blogs.map((item) => {
                                    const isLiked = item.likes?.includes(userId);

                                    return (
                                        <div className="col-lg-4 col-md-6 d-flex align-items-stretch" key={item._id}>
                                            <div className="card h-100 shadow-sm">
                                                <img
                                                    src={`http://localhost:9000/${item.thumbnail}`}
                                                    alt={item.title}
                                                    className="card-img-top"
                                                />

                                                <div className="card-body d-flex flex-column">
                                                    <h5 className="card-title">{item.title}</h5>
                                                    <p className="card-text flex-grow-1">
                                                        {item.description.length > 100
                                                            ? item.description.substring(0, 100) + "..."
                                                            : item.description}
                                                    </p>

                                                    {/* LIKE BUTTON */}
                                                    <button
                                                        onClick={() => handleLike(item._id)}
                                                        className={`btn fw-bold ${isLiked ? "btn-danger" : "btn-outline-danger"}`}
                                                    >
                                                        {isLiked ? "Liked" : "Like"} ({item.likes?.length || 0})
                                                    </button>

                                                    <Link to={`/blog/${item._id}`} className="btn btn-primary mt-3">
                                                        Read More
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <h2>Loading...</h2>
                            )}
                        </div>
                    </section>
                </div>
            </main>

            <footer className="bg-primary text-lg-start">
                <div className="text-center p-3 text-white fw-bold" style={{ background: "rgba(0, 0, 0, 0.2)" }}>
                    © {new Date().getFullYear()} CodeWithPrabhat
                </div>
            </footer>
        </>
    );
};

export default Home;
