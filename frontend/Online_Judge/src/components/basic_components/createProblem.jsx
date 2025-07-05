import React, { useState } from 'react';
import logo from '../../assets/logo.png';
import { problemUpload } from '../../service/api';
import { useSelector } from 'react-redux';

const ProblemsList = ({ onSuccessfulSubmit }) => {

    const [formData, setFormData] = useState({
        name: '',
        difficulty: '',
        statement: '',
        sampleTestCases: [{ test_case: '', output: '', explanation: '' }],
        constraint: '',
        hiddenTestCases: [{ test_case: '', output: '' }]
    });

    const [errors, setErrors] = useState({
        name: '',
        difficulty: '',
        statement: '',
        sampleTestCases: [],
        constraints: '',
        hiddenTestCases: []
    });

    const user = useSelector((state) => state.auth.user);

    const [errMessage, setErrMessage] = useState('');
    // Handle adding new test case fields
    const addTestCase = (type) => {
        const newCase = type === 'sample'
            ? { test_case: '', output: '', explanation: '' }
            : { test_case: '', output: '' };

        setFormData(prev => ({
            ...prev,
            [type + 'TestCases']: [...prev[type + 'TestCases'], newCase]
        }));
    };

    // Handle removing test case
    const removeTestCase = (type, index) => {
        setFormData(prev => ({
            ...prev,
            [type + 'TestCases']: prev[type + 'TestCases'].filter((_, i) => i !== index)
        }));
    };

    // Handle test case input changes
    const handleTestCaseChange = (type, index, field, value) => {
        const updatedTestCases = formData[type + 'TestCases'].map((testCase, i) =>
            i === index ? { ...testCase, [field]: value } : testCase
        );

        setFormData(prev => ({
            ...prev,
            [type + 'TestCases']: updatedTestCases
        }));
        // Clear error when user starts typing
        if (errors[type + 'TestCases'][index]) {
            setErrors(prev => ({
                ...prev,
                [type + 'TestCases']: prev[type + 'TestCases'].filter((_, i) => i !== index)
            }));
        }

        // Validate the field
        if (field === 'test_case' && !value.trim()) {
            setErrors(prev => ({
                ...prev,
                [type + 'TestCases']: [
                    ...prev[type + 'TestCases'],
                    `Test Case ${index + 1} is required`
                ]
            }));
        }
        if (field === 'output' && !value.trim()) {
            setErrors(prev => ({
                ...prev,
                [type + 'TestCases']: [
                    ...prev[type + 'TestCases'],
                    `Test Case ${index + 1} Output is required`
                ]
            }));
        }
    };



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateField = (name, value) => {
        if (typeof value === 'string' && !value.trim()) {
            setErrors(prev => ({
                ...prev,
                [name]: `${name.charAt(0).toUpperCase() + name.slice(1)} is required`
            }));
            return false;
        }
        return true;
    };


    const handleBlur = (e) => {
        const { name, value } = e.target;
        validateField(name, value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            validateField(e.target.name, e.target.value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let isValid = true;

        // Validate all fields
        Object.entries(formData).forEach(([name, value]) => {
            if (typeof value === 'string' && !value.trim()) {
                isValid = false;
            }
        });
        formData.sampleTestCases.forEach((testCase, index) => {
            if (!testCase.test_case.trim() || !testCase.output.trim()) {
                setErrors(prev => ({
                    ...prev,
                    sampleTestCases: [
                        ...prev.sampleTestCases,
                        `Sample Test Case ${index + 1} is required`
                    ]
                }));
                isValid = false;
            }
        });
        formData.hiddenTestCases.forEach((testCase, index) => {
            if (!testCase.test_case.trim() || !testCase.output.trim()) {
                setErrors(prev => ({
                    ...prev,
                    hiddenTestCases: [
                        ...prev.hiddenTestCases,
                        `Hidden Test Case ${index + 1} is required`
                    ]
                }));
                isValid = false;
            }
        });

        if (!formData.sampleTestCases.length || formData.sampleTestCases.length < 3) {
            setErrors(prev => ({
                ...prev,
                sampleTestCases: ['At least three Sample Test Cases are required']
            }));
            isValid = false;
        }
        if (!formData.hiddenTestCases.length || formData.hiddenTestCases.length < 2) {
            setErrors(prev => ({
                ...prev,
                hiddenTestCases: ['At least two Hidden Test Cases are required']
            }));
            isValid = false;
        }
        if (!user) {
            setErrMessage('Please login to add a problem.');
            isValid = false;
        }

        if (isValid) {
            // Form submission logic here
            try {
                console.log('Form Data:', formData);
                const response = await problemUpload({
                    ...formData,
                    email: user
                });
                onSuccessfulSubmit(response.data);
            } catch (error) {
                console.error("Couldn't add problem :( :", error);
                setErrMessage(error.response?.data?.message || 'Couldn\'t add problem. Please try again.');
            }
        }
    };

    return (
        <>
            <div className="flex justify-center items-center h-20   bg-gray-200">
            </div>
            <div className="register-form">
                <div className="bg-gray-100 min-h-screen py-10">
                    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
                        <div className="text-center mb-6">
                            <img src={logo} alt="logo" className="w-32 mx-auto mb-4" />
                            <h2 className="text-2xl font-semibold text-gray-800">Add a New Problem</h2>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Problem Name */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Problem Name</label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`mt-1 block w-full border ${errors.name ? 'border-red-400' : 'border-gray-300'} rounded-md shadow-sm p-2`}
                                />
                                {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
                            </div>

                            {/* Difficulty */}
                            <div>
                                <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">Difficulty</label>
                                <select
                                    id="difficulty"
                                    name="difficulty"
                                    value={formData.difficulty}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full border ${errors.difficulty ? 'border-red-400' : 'border-gray-300'} rounded-md shadow-sm p-2`}
                                >
                                    <option value="">Select Difficulty</option>
                                    <option value="Easy">Easy</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Hard">Hard</option>
                                </select>
                                {errors.difficulty && <p className="text-sm text-red-500 mt-1">{errors.difficulty}</p>}
                            </div>

                            {/* Statement */}
                            <div>
                                <label htmlFor="statement" className="block text-sm font-medium text-gray-700">Problem Statement</label>
                                <textarea
                                    id="statement"
                                    name="statement"
                                    rows="4"
                                    value={formData.statement}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full border ${errors.statement ? 'border-red-400' : 'border-gray-300'} rounded-md shadow-sm p-2`}
                                />
                                {errors.statement && <p className="text-sm text-red-500 mt-1">{errors.statement}</p>}
                            </div>

                            {/* Constraints */}
                            <div>
                                <label htmlFor="constraint" className="block text-sm font-medium text-gray-700">Constraints</label>
                                <textarea
                                    id="constraint"
                                    name="constraint"
                                    rows="3"
                                    value={formData.constraint}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full border ${errors.constraint ? 'border-red-400' : 'border-gray-300'} rounded-md shadow-sm p-2`}
                                />
                                {errors.constraint && <p className="text-sm text-red-500 mt-1">{errors.constraint}</p>}
                            </div>

                            {/* Sample Test Cases */}
                            <div>
                                <h3 className="text-lg font-semibold mb-2 text-gray-700">Sample Test Cases</h3>
                                {formData.sampleTestCases.map((testCase, index) => (
                                    <div key={index} className="border rounded p-4 mb-3 bg-gray-50">
                                        <div className="mb-2">
                                            <label className="block text-sm text-gray-600">Input</label>
                                            <input
                                                type="text"
                                                value={testCase.test_case}
                                                onChange={(e) => handleTestCaseChange('sample', index, 'test_case', e.target.value)}
                                                className="w-full border border-gray-300 rounded p-2"
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <label className="block text-sm text-gray-600">Expected Output</label>
                                            <input
                                                type="text"
                                                value={testCase.output}
                                                onChange={(e) => handleTestCaseChange('sample', index, 'output', e.target.value)}
                                                className="w-full border border-gray-300 rounded p-2"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-600">Explanation (Optional)</label>
                                            <input
                                                type="text"
                                                value={testCase.explanation}
                                                onChange={(e) => handleTestCaseChange('sample', index, 'explanation', e.target.value)}
                                                className="w-full border border-gray-300 rounded p-2"
                                            />
                                        </div>
                                        {index > 0 && (
                                            <button
                                                type="button"
                                                onClick={() => removeTestCase('sample', index)}
                                                className="text-sm text-red-500 mt-2"
                                            >
                                                Remove Test Case
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => addTestCase('sample')}
                                    className="text-blue-600 text-sm mt-1 hover:underline"
                                >
                                    + Add Sample Test Case
                                </button>
                                {errors.sampleTestCases?.length > 0 && (
                                    <p className="text-sm text-red-500 mt-1">{errors.sampleTestCases[0]}</p>
                                )}
                            </div>

                            {/* Hidden Test Cases */}
                            <div>
                                <h3 className="text-lg font-semibold mb-2 text-gray-700">Hidden Test Cases</h3>
                                {formData.hiddenTestCases.map((testCase, index) => (
                                    <div key={index} className="border rounded p-4 mb-3 bg-gray-50">
                                        <div className="mb-2">
                                            <label className="block text-sm text-gray-600">Input</label>
                                            <input
                                                type="text"
                                                value={testCase.test_case}
                                                onChange={(e) => handleTestCaseChange('hidden', index, 'test_case', e.target.value)}
                                                className="w-full border border-gray-300 rounded p-2"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-600">Expected Output</label>
                                            <input
                                                type="text"
                                                value={testCase.output}
                                                onChange={(e) => handleTestCaseChange('hidden', index, 'output', e.target.value)}
                                                className="w-full border border-gray-300 rounded p-2"
                                            />
                                        </div>
                                        {index > 0 && (
                                            <button
                                                type="button"
                                                onClick={() => removeTestCase('hidden', index)}
                                                className="text-sm text-red-500 mt-2"
                                            >
                                                Remove Hidden Test Case
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => addTestCase('hidden')}
                                    className="text-blue-600 text-sm mt-1 hover:underline"
                                >
                                    + Add Hidden Test Case
                                </button>
                                {errors.hiddenTestCases?.length > 0 && (
                                    <p className="text-sm text-red-500 mt-1">{errors.hiddenTestCases[0]}</p>
                                )}
                            </div>

                            {/* Error Message */}
                            {errMessage && (
                                <p className="text-center text-sm text-red-600">{errMessage}</p>
                            )}

                            {/* Submit Button */}
                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition"
                                >
                                    Submit Problem
                                </button>
                            </div>

                            {/* Login reminder */}
                            {!user && (
                                <p className="text-center text-sm text-red-500 mt-4">
                                    Please login to add a problem.
                                </p>
                            )}
                        </form>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center h-20 bg-gray-200">
            </div>
        </>
    );
}

export default ProblemsList;




