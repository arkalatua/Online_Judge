const express = require('express');
const dotenv = require('dotenv');
const generateFile = require('./generateFile');
const executeCpp = require('./executeCpp');

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/run', async (req, res) => {
    const { code, language } = req.body;

    if (!code || !language) {
        return res.status(400).json({ error: 'Code and language are required' });
    }

    try {
        const filePath = await generateFile(code, language);
        const output = await executeCpp(filePath);

        return res.json({ success: true, output });
    } catch (error) {
        console.error('Execution error:', error);
        return res.status(500).json({ 
            error: error.stage === 'compilation' 
                ? 'Compilation failed' 
                : 'Execution failed',
            details: error.stderr || error.message
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});