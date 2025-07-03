import Navbar from "../basic_components/navbar";
import Footer from "../basic_components/footer";
import LoginForm from "../basic_components/loginform";
import { useNavigate } from 'react-router-dom';


const ProblemsPage = () => {
    
    return (
        <>
            <div className="nav-bar">
                <Navbar />
            </div>
            
            <div className="footer">
                <Footer />
            </div>
        </>
    );
}

export default ProblemsPage;