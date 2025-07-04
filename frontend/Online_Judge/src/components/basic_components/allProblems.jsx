import { useState, useEffect } from 'react';

const AllProblems = () => {
    const [problems, setProblems] = useState([]);

    const getUserName = async (userId) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/getUserName`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId })
            });

            const data = await response.json();

            if (response.ok) {
                return data.name;
            } else {
                console.error("Failed to fetch name:", data.message);
            }
        } catch (err) {
            console.error("Error fetching name:", err);
        }
    };

    const fetchProblems = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/problems/getProblems`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });

            const data = await response.json();

            if (response.ok) {
                // Get all usernames in parallel
                const problemsWithNames = await Promise.all(
                    data.problems.map(async (problem) => {
                        const name = await getUserName(problem.userId);
                        return { ...problem, userName: name };
                    })
                );

                setProblems(problemsWithNames);
            } else {
                console.error("Failed to fetch problems:", data.message);
            }
        } catch (err) {
            console.error("Error fetching problems:", err);
        }
    };

    useEffect(() => {
        fetchProblems();
    }, []);
    return (
        <>
            <section className="animate-fadeIn">


                <div className="relative overflow-x-auto shadow-lg rounded-2xl p-8 bg-white border border-gray-200 max-w-7xl mx-auto mt-8">
                    <h1 className="text-3xl font-extrabold text-blue-700 mb-6 text-center tracking-wide">
                        📘 All Coding Problems
                    </h1>

                    <table className="w-full text-sm text-left text-gray-700 border-collapse">
                        <thead className="text-xs font-bold uppercase bg-blue-100 text-blue-800 sticky top-0 shadow-sm">
                            <tr>
                                <th className="px-6 py-3 text-center">#</th>
                                <th className="px-6 py-3">Title</th>
                                <th className="px-6 py-3">Difficulty</th>
                                <th className="px-6 py-3">Author</th>
                            </tr>
                        </thead>

                        <tbody>
                            {problems.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="text-center py-8 text-gray-500">
                                        No problems found. 🚫
                                    </td>
                                </tr>
                            ) : (
                                problems.map((problem, index) => (
                                    <tr
                                        key={problem._id}
                                        className="odd:bg-white even:bg-gray-50 hover:bg-blue-50 transition-colors duration-200"
                                    >
                                        <td className="px-6 py-4 text-center font-medium text-gray-800">{index + 1}</td>
                                        <td className="px-6 py-4 font-semibold text-gray-900">{problem.name}</td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold
                ${problem.difficulty === 'Easy'
                                                        ? 'bg-green-100 text-green-700'
                                                        : problem.difficulty === 'Medium'
                                                            ? 'bg-yellow-100 text-yellow-800'
                                                            : 'bg-red-100 text-red-700'
                                                    }`}
                                            >
                                                {problem.difficulty}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-gray-900">
                                            {problem.userName || 'Unknown Author'}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

            </section>
        </>
    );
}

export default AllProblems;