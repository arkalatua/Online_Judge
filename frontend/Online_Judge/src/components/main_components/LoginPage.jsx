import Navbar from "../basic_components/navbar";
import Footer from "../basic_components/footer";
import LoginForm from "../basic_components/loginform";
import { useNavigate } from 'react-router-dom';
import React from 'react';

const LoginPage = () => {
    const navigate = useNavigate();
    const handleSuccessfulSubmit = () => {
        navigate('/home');
    }
    return (
        <>
            <div className="nav-bar">
                <Navbar />
            </div>
            <div className="login-form">
                <LoginForm onSuccessfulSubmit={handleSuccessfulSubmit} />
            </div>
            <div className="footer">
                <Footer />
            </div>
        </>
    );
}

export default LoginPage;