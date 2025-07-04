import { FaCheckDouble } from 'react-icons/fa';

const ProblemAdded = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white border border-gray-300 rounded-2xl shadow-lg p-10 w-full max-w-xl text-center">
                <FaCheckDouble
                    size={96}
                    className="text-green-500 mx-auto mb-6 animate-bounce"
                />

                <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
                    Problem Submitted Successfully!
                </h1>

                <p className="text-lg text-gray-600 mb-2">
                    Your problem has been added and will be reviewed by the admin.
                </p>
                <p className="text-lg text-gray-600">
                    Thank you for contributing to the platform.
                </p>
            </div>
        </div>
    );
};

export default ProblemAdded;
