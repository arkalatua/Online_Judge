import { initFlowbite } from 'flowbite';
import { useEffect, useState } from 'react';
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { login, logout } from '../../store/authSlice';
import { useDispatch, useSelector } from 'react-redux';

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const [name, setName] = useState('');

    const fetchName = async () => {
        const email = localStorage.getItem("authToken");
        if (!email) return;

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/getName`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email.trim() })
            });

            const data = await response.json();

            if (response.ok) {
                setName(data.name);
            } else {
                console.error("Failed to fetch name:", data.message);
            }
        } catch (err) {
            console.error("Error fetching name:", err);
        }
    };

    useEffect(() => {
        initFlowbite();
        const email = localStorage.getItem("authToken");
        if (email) {
            dispatch(login({ user: email }));
            fetchName();
        }
    }, []);

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem("authToken");
        setName('');
        navigate('/login');
    };

    return (
        <nav className="bg-white border-gray-200">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto pt-0.5 pb-0.5 pl-4 pr-4">
                <a href="/home" className="flex items-center">
                    <img src={logo} className="w-20 px h-15 px" alt="Logo" />
                </a>
                <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-100 dark:focus:ring-gray-500" aria-controls="navbar-default" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
                        <li>
                            <a href="/home" className="block py-2 px-3 text-gray-900 hover:text-blue-700">Home</a>
                        </li>
                        <li>
                            <a href="/problems" className="block py-2 px-3 text-gray-900 hover:text-blue-700">Problems</a>
                        </li>
                        <li>
                            <a href="/contest" className="block py-2 px-3 text-gray-900 hover:text-blue-700">Contest</a>
                        </li>
                        <li>
                            <a href="/discuss" className="block py-2 px-3 text-gray-900 hover:text-blue-700">Discuss</a>
                        </li>

                        {user ? (
                            <>
                                <li>
                                    <a
                                        onClick={() => navigate('/profile')}
                                        className="cursor-pointer block py-2 px-3 text-blue-600 hover:underline hover:text-blue-800"
                                    >
                                        {name}
                                    </a>
                                </li>
                                <li>
                                    <a
                                        onClick={handleLogout}
                                        className="cursor-pointer block py-2 px-3 text-red-500 hover:underline hover:text-red-700"
                                    >
                                        Logout
                                    </a>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <a
                                        onClick={() => navigate('/login')}
                                        className="cursor-pointer block py-2 px-3 text-blue-600 hover:underline hover:text-blue-800"
                                    >
                                        Sign In
                                    </a>
                                </li>
                                <li>
                                    <a
                                        onClick={() => navigate('/register')}
                                        className="cursor-pointer block py-2 px-3 text-blue-600 hover:underline hover:text-blue-800"
                                    >
                                        Register
                                    </a>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;