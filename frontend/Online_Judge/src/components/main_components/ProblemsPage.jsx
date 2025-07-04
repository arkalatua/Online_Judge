import Navbar from "../basic_components/navbar";
import Footer from "../basic_components/footer";
import AllProblems from "../basic_components/allProblems";

const ProblemsPage = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-grow">
                <AllProblems />
            </main>

            <Footer />
        </div>
    );
};

export default ProblemsPage;
