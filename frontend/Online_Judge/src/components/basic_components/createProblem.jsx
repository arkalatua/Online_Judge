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
                const response = await problemUpload({ ...formData,
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
                <div className="bg-gray-200 min-h-screen flex items-center">
                    <div className="w-full">
                        <div className="bg-white p-10 rounded-lg shadow md:w-3/4 mx-auto lg:w-1/3">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-5">
                                    <img src={logo} alt='logo' className='w-40 h-30 mx-auto mb-5' />
                                    <div className="font-roboto text-center text-2xl font-bold mb-5 text-gray-700">ADD NEW PROBLEM!!!</div>
                                    <label htmlFor="firstName" className="font-roboto block mb-2 font-bold text-gray-600">Name for the Problem</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Put in your name"
                                        className={`border ${errors.name ? 'border-red-300' : 'border-gray-300'} shadow p-3 w-full rounded mb-`}
                                    />
                                    {errors.name && <p className="text-sm text-red-400 mt-2">{errors.name}</p>}
                                </div>

                                <div className="mb-5">
                                    <label htmlFor="difficulty" className="font-roboto block mb-2 font-bold text-gray-600">
                                        Difficulty
                                    </label>
                                    <select
                                        id="difficulty"
                                        name="difficulty"
                                        value={formData.difficulty}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={`border ${errors.difficulty ? 'border-red-300' : 'border-gray-300'} shadow p-3 w-full rounded mb-`}
                                    >
                                        <option value="">Select difficulty</option>
                                        <option value="Easy">Easy</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Hard">Hard</option>
                                    </select>
                                    {errors.difficulty && <p className="text-sm text-red-400 mt-2">{errors.difficulty}</p>}
                                </div>

                                <div className="mb-5">
                                    <label htmlFor="statement" className="font-roboto block mb-2 font-bold text-gray-600">Problem Statement:</label>
                                    <input
                                        type="text"
                                        id="statement"
                                        name="statement"
                                        value={formData.statement}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Put in your statement."
                                        className={`border ${errors.statement ? 'border-red-300' : 'border-gray-300'} shadow p-3 w-full rounded mb-`}
                                    />
                                    {errors.statement && <p className="text-sm text-red-400 mt-2">{errors.statement}</p>}
                                </div>

                                <div className="mb-5">
                                    <label htmlFor="constraint" className="font-roboto block mb-2 font-bold text-gray-600">Constraints:</label>
                                    <input
                                        type="text"
                                        id="constraint"
                                        name="constraint"
                                        value={formData.constraint}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Put a constraint."
                                        className={`border ${errors.constraint ? 'border-red-300' : 'border-gray-300'} shadow p-3 w-full rounded mb-`}
                                    />
                                    {errors.constraint && <p className="text-sm text-red-400 mt-2">{errors.constraint}</p>}
                                </div>

                                {/* Sample Test Cases Section */}
                                <div className="mb-5">
                                    <label className="font-roboto block mb-2 font-bold text-gray-600">
                                        Sample Test Cases
                                    </label>
                                    {formData.sampleTestCases.map((testCase, index) => (
                                        <div key={`sample-${index}`} className="mb-4 p-3 border rounded">
                                            <div className="mb-3">
                                                <div className='flex justify-between items-center mb-2'>
                                                    <label className="block text-sm text-gray-600 mb-1">Test Case {index + 1}</label>
                                                </div>
                                                <input
                                                    type="text"
                                                    value={testCase.test_case}
                                                    onChange={(e) => handleTestCaseChange('sample', index, 'test_case', e.target.value)}
                                                    className="border border-gray-300 shadow p-2 w-full rounded"
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label className="block text-sm text-gray-600 mb-1">Expected Output</label>
                                                <input
                                                    type="text"
                                                    value={testCase.output}
                                                    onChange={(e) => handleTestCaseChange('sample', index, 'output', e.target.value)}
                                                    className="border border-gray-300 shadow p-2 w-full rounded"
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label className="block text-sm text-gray-600 mb-1">Explanation (Optional)</label>
                                                <input
                                                    type="text"
                                                    value={testCase.explanation}
                                                    onChange={(e) => handleTestCaseChange('sample', index, 'explanation', e.target.value)}
                                                    className="border border-gray-300 shadow p-2 w-full rounded"
                                                />
                                            </div>
                                            {index > 0 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeTestCase('sample', index)}
                                                    className="text-red-500 text-sm"
                                                >
                                                    Remove
                                                </button>
                                            )}
                                        </div>

                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => addTestCase('sample')}
                                        className="flex items-center text-blue-500 text-sm"
                                    >
                                        <span className="mr-1">+</span> Add Sample Test Case
                                    </button>
                                    <div className="text-red-500 text-sm">
                                        {errors.sampleTestCases && errors.sampleTestCases.map((error, index) => (
                                            <div key={index}>{error}</div>
                                        ))}
                                    </div>
                                </div>

                                {/* Hidden Test Cases Section */}
                                <div className="mb-5">
                                    <label className="font-roboto block mb-2 font-bold text-gray-600">
                                        Hidden Test Cases
                                    </label>
                                    {formData.hiddenTestCases.map((testCase, index) => (
                                        <div key={`hidden-${index}`} className="mb-4 p-3 border rounded">
                                            <div className="mb-3">
                                                <div className='flex justify-between items-center mb-2'>
                                                    <label className="block text-sm text-gray-600 mb-1">Test Case {index + 1}</label>
                                                </div>
                                                <label className="block text-sm text-gray-600 mb-1">Test Case</label>
                                                <input
                                                    type="text"
                                                    value={testCase.test_case}
                                                    onChange={(e) => handleTestCaseChange('hidden', index, 'test_case', e.target.value)}
                                                    className="border border-gray-300 shadow p-2 w-full rounded"
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label className="block text-sm text-gray-600 mb-1">Expected Output</label>
                                                <input
                                                    type="text"
                                                    value={testCase.output}
                                                    onChange={(e) => handleTestCaseChange('hidden', index, 'output', e.target.value)}
                                                    className="border border-gray-300 shadow p-2 w-full rounded"
                                                />
                                            </div>
                                            {index > 0 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeTestCase('hidden', index)}
                                                    className="text-red-500 text-sm"
                                                >
                                                    Remove
                                                </button>
                                            )}

                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => addTestCase('hidden')}
                                        className="flex items-center text-blue-500 text-sm"
                                    >
                                        <span className="mr-1">+</span> Add Hidden Test Case
                                    </button>
                                    <div className="text-red-500 text-sm">
                                        {errors.hiddenTestCases && errors.hiddenTestCases.map((error, index) => (
                                            <div key={index}>{error}</div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    {errMessage && <p className="font-roboto text-1xl text-center text-red-400 mt-1 mb-2">{errMessage}</p>}
                                </div>
                                <button type="submit" className="font-roboto block w-full bg-blue-500 text-white font-bold p-4 rounded-lg hover:bg-blue-600 transition">Add</button>
                                {user ? (
                                    <>
                                    </>
                                ) : (
                                    <>
                                        <p className="font-roboto text-1xl text-center text-red-500 mt-2">Please login to add a problem.</p>
                                    </>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center h-20 bg-gray-200">
            </div>
        </>
    );
}

export default ProblemsList;




