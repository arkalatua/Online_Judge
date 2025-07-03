import { useState } from 'react';
import { loginUpload } from '../../service/api';
import logo from '../../assets/logo.png';
import { useDispatch } from "react-redux";
import { login } from '../../store/authSlice';

const LoginForm = ({ onSuccessfulSubmit}) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });

    const dispatch = useDispatch();

    const [errMessage, setErrMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
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
        const { name, value } = e.target;
        validateField(name, value);
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

        // Validate all fields
        Object.entries(formData).forEach(([name, value]) => {
            if (!validateField(name, value)) {
                isValid = false;
            }
        });

        if (isValid) {
            // Form submission logic here
            try {
                const response = await loginUpload(formData);
                dispatch(login({ user: formData.email }));
                onSuccessfulSubmit(response.data);
            } catch (error) {
                console.error("Login failed:", error);
                setErrMessage(error.response?.data?.message || 'Login failed. Please try again.');
            }
        }
    };
    return (
        <>
            <div className="flex justify-center items-center h-20   bg-gray-200">
            </div>
            <div className="login-form">
                <div className="bg-gray-200 min-h-screen flex items-center">
                    <div className="w-full">
                        <div className="bg-white p-10 rounded-lg shadow md:w-3/4 mx-auto lg:w-1/3">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-5">
                                    <img src={logo} alt='logo' className='w-40 h-30 mx-auto mb-5' />
                                </div>
                                <div className="mb-5">
                                    <label htmlFor="email" className="font-roboto block mb-2 font-bold text-gray-600">Email Address:</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Put in your email."
                                        className={`border ${errors.email ? 'border-red-300' : 'border-gray-300'} shadow p-3 w-full rounded mb-`}
                                    />
                                    {errors.email && <p className="text-sm text-red-400 mt-2">{errors.email}</p>}
                                </div>

                                <div className="mb-5">
                                    <label htmlFor="password" className="font-roboto block mb-2 font-bold text-gray-600">Password:</label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Put a password."
                                        className={`border ${errors.password ? 'border-red-300' : 'border-gray-300'} shadow p-3 w-full rounded mb-`}
                                    />
                                    {errors.password && <p className="text-sm text-red-400 mt-2">{errors.password}</p>}
                                </div>
                                <div className="text-right mb-5">
                                    <span className="font-roboto text-gray-600">Don't have an account?</span>
                                    <a href="/register" className="text-blue-500 hover:underline">Register here</a>
                                </div>
                                <div>
                                    {errMessage && <p className="font-roboto text-center text-sm text-red-400 mb-4">{errMessage}</p>}
                                </div>
                                <button type="submit" className="font-roboto block w-full bg-blue-500 text-white font-bold p-4 rounded-lg hover:bg-blue-600 transition">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center h-20 bg-gray-200">
            </div>
        </>

    );
}

export default LoginForm;