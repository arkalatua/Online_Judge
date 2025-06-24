import { useState } from 'react';
import { registerUpload } from '../../service/api';

const RegisterForm = ({ onSuccessfulSubmit }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

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
                const response = await registerUpload(formData);
                onSuccessfulSubmit(response.data);
            } catch (error) {
                console.error("Registration failed:", error);
            }
        }
    };

    return (
        <div className="register-form">
            <div className="bg-slate-40 min-h-screen flex items-center">
                <div className="w-full">
                    <h2 className="text-center text-blue-400 font-bold text-2xl uppercase mb-10">Fill out our form</h2>
                    <div className="bg-white p-10 rounded-lg shadow md:w-3/4 mx-auto lg:w-1/2">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-5">
                                <label htmlFor="firstName" className="block mb-2 font-bold text-gray-600">First Name</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Put in your first name"
                                    className={`border ${errors.firstName ? 'border-red-300' : 'border-gray-300'} shadow p-3 w-full rounded mb-`}
                                />
                                {errors.firstName && <p className="text-sm text-red-400 mt-2">{errors.firstName}</p>}
                            </div>

                            <div className="mb-5">
                                <label htmlFor="lastName" className="block mb-2 font-bold text-gray-600">Last Name</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Put in your last name"
                                    className={`border ${errors.lastName ? 'border-red-300' : 'border-gray-300'} shadow p-3 w-full rounded mb-`}
                                />
                                {errors.lastName && <p className="text-sm text-red-400 mt-2">{errors.lastName}</p>}
                            </div>

                            <div className="mb-5">
                                <label htmlFor="email" className="block mb-2 font-bold text-gray-600">Email Address:</label>
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
                                <label htmlFor="password" className="block mb-2 font-bold text-gray-600">Password:</label>
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

                            <button type="submit" className="block w-full bg-blue-500 text-white font-bold p-4 rounded-lg hover:bg-blue-600 transition">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;