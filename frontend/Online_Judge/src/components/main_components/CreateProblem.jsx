import Footer from "../basic_components/footer";
import Navbar from "../basic_components/navbar";
import ProblemsList from "../basic_components/createProblem";
import { useNavigate } from 'react-router-dom';

const ProblemPage = () => {
    const navigate = useNavigate();
    const handleSuccessfulSubmit = () => {
        navigate('/home');
    }
    return (
        <>
            <div className="nav-bar">
                <Navbar />
            </div>
            <div className="problem-form">
                <ProblemsList onSuccessfulSubmit={handleSuccessfulSubmit}/>
            </div>
            <div className="footer">
                <Footer />
            </div>
        </>

    );
}

export default ProblemPage;