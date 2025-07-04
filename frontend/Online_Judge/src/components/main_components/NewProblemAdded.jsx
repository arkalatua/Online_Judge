import Navbar from "../basic_components/navbar";
import Footer from "../basic_components/footer";
import ProblemAdded from "../basic_components/problemAdded";

const NewProblemAdded = () => {
    return (
        <>
            <div className="nav-bar">
                <Navbar />
            </div>
            <div className="thank-you-message">
                <ProblemAdded />
            </div>
            <div className="footer">
                <Footer />
            </div>
        </>
    );
}

export default NewProblemAdded;