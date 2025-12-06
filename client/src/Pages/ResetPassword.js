import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
    const { id, token } = useParams(); // both id and token come from URL
    const navigate = useNavigate();
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                `https://my-blog-project-c7xq.onrender.com/api/v1/reset-password/${id}/${token}`,
                { password }
            );

            alert(res.data.message || "Password updated successfully ");
            navigate("/login");
        } catch (error) {
            console.error("Reset password error:", error);
            alert(error.response?.data?.message || "Something went wrong ");
        }
    };

    return (
        <div className="login-page d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow p-4" style={{ width: "400px" }}>
                <h2 className="text-center mb-4 fw-bold text-primary">
                    Reset Password
                </h2>
                <form onSubmit={handleSubmit}>
                    {/* Password Input */}
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            New Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Enter new password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="btn btn-primary w-100">
                        Update Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
