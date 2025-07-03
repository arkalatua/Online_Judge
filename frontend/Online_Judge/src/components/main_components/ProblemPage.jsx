import ProblemsList from "../basic_components/problemsList";
import { useNavigate } from 'react-router-dom';

const ProblemPage = () => {
    const navigate = useNavigate();
    const handleSuccessfulSubmit = () => {
        navigate('/home');
    }
    return (
        <div>
            <ProblemsList onSuccessfulSubmit={handleSuccessfulSubmit} />
        </div>
    );
}

export default ProblemPage;