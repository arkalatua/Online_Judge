import logo from '../../assets/logo.png';

const Footer = () => {
    return (
        <footer className="mt-auto w-full bg-white border-t border-gray-200 shadow">
            <div className="w-full max-w-screen-xl mx-auto p-6 md:py-8">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <a href="/home" className="flex items-center space-x-3 mb-4 md:mb-0">
                        <img src={logo} className="h-10 w-auto" alt="Query Codice Logo" />
                        <span className="text-xl font-semibold text-gray-700">Query Codice</span>
                    </a>
                    <ul className="flex flex-wrap items-center gap-4 text-sm font-medium text-gray-500">
                        <li>
                            <a href="/about" className="hover:text-blue-600 transition">About</a>
                        </li>
                        <li>
                            <a href="/policy" className="hover:text-blue-600 transition">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="/contact" className="hover:text-blue-600 transition">Contact</a>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-200" />
                <p className="text-center text-sm text-gray-500">
                    © 2025 <a href="/home" className="hover:underline font-medium text-gray-700">Query Codice</a>. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
