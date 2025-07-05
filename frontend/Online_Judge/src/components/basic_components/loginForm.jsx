import { useState } from 'react';
import { loginUpload } from '../../service/api';
import logo from '../../assets/logo.png';
import { useDispatch } from "react-redux";
import { login } from '../../store/authSlice';

const LoginForm = ({ onSuccessfulSubmit }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const [errMessage, setErrMessage] = useState('');
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateField = (name, value) => {
        if (!value.trim()) {
            setErrors(prev => ({
                ...prev,
                [name]: `${name.charAt(0).toUpperCase() + name.slice(1)} is required`
            }));
            return false;
        }
        return true;
    };

    const handleBlur = (e) => {
        validateField(e.target.name, e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            validateField(e.target.name, e.target.value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let isValid = true;

        Object.entries(formData).forEach(([name, value]) => {
            if (!validateField(name, value)) {
                isValid = false;
            }
        });

        if (isValid) {
            try {
                const response = await loginUpload(formData);
                dispatch(login({ user: formData.email }));
                localStorage.setItem("authToken", formData.email);
                onSuccessfulSubmit(response.data);
            } catch (error) {
                console.error("Login failed:", error);
                setErrMessage(error.response?.data?.message || 'Login failed. Please try again.');
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-md space-y-6">
                <div className="text-center">
                    <img src={logo} alt="logo" className="mx-auto w-28 h-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-800">Login</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onKeyDown={handleKeyDown}
                            placeholder="Enter your email"
                            className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                                errors.email ? 'border-red-400' : 'border-gray-300'
                            }`}
                        />
                        {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onKeyDown={handleKeyDown}
                            placeholder="Enter your password"
                            className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                                errors.password ? 'border-red-400' : 'border-gray-300'
                            }`}
                        />
                        {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
                    </div>

                    {errMessage && <p className="text-center text-red-500 text-sm">{errMessage}</p>}

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
                    >
                        Submit
                    </button>
                </form>

                <div className="text-center text-sm">
                    <span className="text-gray-600">Don't have an account? </span>
                    <a href="/register" className="text-blue-500 hover:underline">Register here</a>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
