import Footer from "../basic_components/footer";
import Navbar from "../basic_components/navbar";
import UserMadeProblems from "../basic_components/userProblems";

const UserProblems = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-grow">
                <UserMadeProblems />
            </main>

            <Footer />
        </div>
    );
};

export default UserProblems;
