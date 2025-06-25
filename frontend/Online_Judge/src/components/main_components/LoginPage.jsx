import Navbar from "../basic_components/navbar";
import Footer from "../basic_components/footer";
import LoginForm from "../basic_components/loginform";

const LoginPage = () => {
    return (
        <>
            <div className="nav-bar">
                <Navbar />
            </div>
            <div className="login-form">
                <LoginForm />
            </div>
            <div className="footer">
                <Footer />
            </div>
        </>
    );
}

export default LoginPage;